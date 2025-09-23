/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dream, DreamConst } from '@rvoh/dream'
import { BelongsToStatement } from '@rvoh/dream/dist/types/src/types/associations/belongsTo'
import { HasManyStatement } from '@rvoh/dream/dist/types/src/types/associations/hasMany'
import { HasOneStatement } from '@rvoh/dream/dist/types/src/types/associations/hasOne'

type SnapshotableConstructor = new (...args: any[]) => object

type AssociationMetadataMap = Record<
  string,
  | BelongsToStatement<any, any, any, any>
  | HasManyStatement<any, any, any, any>
  | HasOneStatement<any, any, any, any>
>

/**
 * The `@Snapshotable()` class decorator adds the instance method `takeSnapshot` to the decorated Dream model. When called, `takeSnapshot` builds a simple object of all the database fields for the model. It also traverses the association tree rooted at the model, following `HasMany` and `HasOne` associations, recursively calling `takeSnapshot` on each. This is useful for converting an entire model tree to JSON to, for example, store a user's data in compliance with HIPAA retention requirements.
 *
 * Snapshotable automatically skips associations with `required` or `passthrough` `on` clauses.
 *
 * `BelongsTo` associations are intentionally skipped, as are `through` associations, so Snapshotable automatically avoids circuits (which would lead to an infinite loop). To explicitly include a `through` association, decorate it with the `@SnapshotableFollowThrough()` decorator.
 *
 * NOTE: Snapshotable is not optimized to eliminate the N+1 problem, but it will leverage the read replica, if configured. Snapshotable builds a single object of the entire content tree, so the in-memory object may become quite large. As such, it may be advisable to leverage `@SnapshotableIgnore` to prevent full traversing the tree so that it can be split into chunks. It is recommended that Snapshotable is only used in a background job (see {@link https://psychicframework.com/docs/plugins/workers/overview}).
 *
 */
export default function Snapshotable<T extends SnapshotableConstructor>(Base: T) {
  return class Snapshotable extends Base {
    public async takeSnapshot() {
      const dream = this as unknown as Dream
      return await this._takeSnapshot(dream)
    }

    public async _takeSnapshot(dream: Dream): Promise<Record<string, any>> {
      const dreamClass = dream.constructor as typeof Dream
      if (!(dream instanceof Dream)) throw new Error('Cannot call takeSnapshot on a non-Dream')

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const snapshotableIgnoreFields = ((dreamClass as any)['snapshotableIgnore'] || []) as string[]
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const snapshotableFollowThroughFields = ((dreamClass as any)['snapshotableFollowThrough'] ||
        []) as string[]
      const attributes = dream.getAttributes()

      const allowedAttributes = Object.keys(attributes).reduce(
        (agg: Record<string, any>, columnName) => {
          if (!snapshotableIgnoreFields.includes(columnName)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            agg[columnName] = attributes[columnName]
          }
          return agg
        },
        {} as Record<string, any>
      )

      const data: any = {
        ...allowedAttributes,
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const associationMap = dreamClass['associationMetadataMap']() as AssociationMetadataMap

      for (const associationName of Object.keys(associationMap)) {
        if (snapshotableIgnoreFields.includes(associationName)) continue

        const associationMetadata = associationMap[associationName]

        if ((associationMetadata as HasManyStatement<any, any, any, any>).through) {
          const ignoredThroughAssociation = !snapshotableFollowThroughFields.includes(associationName)
          if (ignoredThroughAssociation) continue
        }

        if ((associationMetadata as HasManyStatement<any, any, any, any>).and) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const requiredOrPassthroughClause = Object.values(
            (associationMetadata as HasManyStatement<any, any, any, any>).and!
          ).find(value => value === DreamConst.required || value === DreamConst.passthrough)
          if (requiredOrPassthroughClause) continue
        }

        const hasManyRecords: Record<string, any>[] = []

        switch (associationMetadata.type) {
          case 'HasMany':
            await dream
              .associationQuery(associationName as any)
              .connection('replica')
              .removeDefaultScope('dream:SoftDelete')
              .findEach(async record => {
                const associationSnapshot = await this._takeSnapshot(record as Dream)
                hasManyRecords.push(associationSnapshot)
              })

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            data[associationName] = hasManyRecords
            break

          case 'HasOne':
            // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unsafe-assignment
            const record = await dream
              .associationQuery(associationName as any)
              .removeDefaultScope('dream:SoftDelete')
              .connection('replica')
              .first()

            if (record) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              data[associationName] = await this._takeSnapshot(record as Dream)
            }
            break
        }
      }

      return data as Record<string, any>
    }
  }
}
