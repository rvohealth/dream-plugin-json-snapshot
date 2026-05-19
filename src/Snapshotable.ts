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
 * Mixin that adds `takeSnapshot()` to a Dream model, serializing the model and
 * its entire association tree into a plain JSON object.
 *
 * **Internal use only.** Designed for retention archiving, compliance storage,
 * and internal audit trails. Not appropriate for user-facing data subject access
 * requests (GDPR/CCPA). The output reflects the internal association graph, not
 * what a user would consider "their data."
 *
 * **Auto-inclusion is intentional.** For retention use cases, omission is the
 * real compliance risk. Snapshotable captures everything reachable as the schema
 * evolves without requiring manual updates.
 *
 * **What is traversed:** `HasMany` and `HasOne` associations, recursively.
 * Soft-deleted records are included (the soft-delete scope is removed).
 * Uses batched preload queries to avoid N+1 for trees up to 4 levels deep;
 * falls back to on-demand loading beyond that. Leverages the read replica if configured.
 *
 * **What is skipped:** `BelongsTo` associations (always — traversal cannot cross
 * ownership boundaries) and `through` associations (by default — use
 * `@SnapshotableFollowThrough()` to opt a specific one back in).
 *
 * **`@SnapshotableIgnore()`** excludes a column or association from the snapshot.
 * Associations with a `DreamConst.required` or `DreamConst.passthrough` `and`-clause
 * **must** be decorated with `@SnapshotableIgnore()` — `takeSnapshot()` throws
 * `SnapshotableCannotPreloadRequiredOrPassthroughAssociation` if it encounters one
 * that hasn't been excluded.
 *
 * **Data boundary safety:** The `BelongsTo` skip means traversal is bounded by
 * ownership. Many-to-many join models are safe by default — they have only
 * `BelongsTo` associations, so the traversal stops there. If you use
 * `@SnapshotableFollowThrough()` to reach a shared resource through a join model,
 * that resource's `hasMany` back to the join can pull in join records for other
 * owners (not their core records — still blocked by `BelongsTo`). Apply
 * `@SnapshotableIgnore()` to that association if the join model carries sensitive
 * metadata you don't want in the snapshot.
 *
 * @see {@link https://psychicframework.com/docs/plugins/snapshot/overview}
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
