/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dream, DreamConst } from '@rvoh/dream'
import { BelongsToStatement, HasManyStatement, HasOneStatement } from '@rvoh/dream/types'
import buildSnapshotPreloadPaths from './buildSnapshotPreloadPaths.js'
import SnapshotableCannotPreloadRequiredOrPassthroughAssociation from './errors/SnapshotableCannotPreloadRequiredOrPassthroughAssociation.js'

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
 * NOTE: Snapshotable builds a single object of the entire content tree, so the in-memory object may become quite large. As such, it may be advisable to leverage `@SnapshotableIgnore` to prevent full traversing the tree so that it can be split into chunks. It is recommended that Snapshotable is only used in a background job (see {@link https://psychicframework.com/docs/plugins/workers/overview}).
 *
 */
export default function Snapshotable<T extends SnapshotableConstructor>(Base: T) {
  return class Snapshotable extends Base {
    public async takeSnapshot() {
      const dream = this as unknown as Dream
      const loaded = await this._loadSnapshotTree(dream)
      return await this._buildSnapshotFromLoaded(loaded)
    }

    /**
     * @internal
     *
     * Loads all snapshot-eligible associations onto the dream instance
     * using batched preload queries, eliminating N+1 queries.
     */
    public async _loadSnapshotTree(dream: Dream): Promise<Dream> {
      const dreamClass = dream.constructor as typeof Dream
      const paths = buildSnapshotPreloadPaths(dreamClass)

      if (paths.length === 0) return dream

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      let loadBuilder = (dream as any)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        .load(...paths[0]!.map((tuple: any) => tuple[1]))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .removeDefaultScope('dream:SoftDelete')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .connection('replica')

      for (let i = 1; i < paths.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
        loadBuilder = loadBuilder.load(...paths[i]!.map((tuple: any) => tuple[1]))
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      return await loadBuilder.execute()
    }

    /**
     * @internal
     *
     * Builds a snapshot object from already-loaded associations.
     * When an association is not loaded (e.g. tree depth exceeds the
     * preload depth), loads it on-demand and continues.
     */
    public async _buildSnapshotFromLoaded(dream: Dream): Promise<Record<string, any>> {
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

        const associationMetadata = associationMap[associationName]!

        if ((associationMetadata as HasManyStatement<any, any, any, any>).through) {
          const ignoredThroughAssociation = !snapshotableFollowThroughFields.includes(associationName)
          if (ignoredThroughAssociation) continue
        }

        if ((associationMetadata as HasManyStatement<any, any, any, any>).and) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const requiredOrPassthroughClause = Object.values(
            (associationMetadata as HasManyStatement<any, any, any, any>).and!
          ).find(value => value === DreamConst.required || value === DreamConst.passthrough)
          if (requiredOrPassthroughClause) {
            throw new SnapshotableCannotPreloadRequiredOrPassthroughAssociation(
              dreamClass.sanitizedName,
              associationName
            )
          }
        }

        switch (associationMetadata.type) {
          case 'HasMany': {
            let records: Dream[]
            if (dream.loaded(associationName as any)) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              records = ((dream as any)[associationName] as Dream[]) ?? []
            } else {
              // Beyond preload depth — load more levels from this node
              const reloaded = await this._loadSnapshotTree(dream)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              records = ((reloaded as any)[associationName] as Dream[]) ?? []
            }
            const hasManyRecords: Record<string, any>[] = []
            for (const record of records) {
              hasManyRecords.push(await this._buildSnapshotFromLoaded(record))
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            data[associationName] = hasManyRecords
            break
          }

          case 'HasOne': {
            let record: Dream | null
            if (dream.loaded(associationName as any)) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              record = (dream as any)[associationName] as Dream | null
            } else {
              const reloaded = await this._loadSnapshotTree(dream)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              record = (reloaded as any)[associationName] as Dream | null
            }
            if (record) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              data[associationName] = await this._buildSnapshotFromLoaded(record)
            }
            break
          }
        }
      }

      return data as Record<string, any>
    }
  }
}
