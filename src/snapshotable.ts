import { Dream } from '@rvohealth/dream'

type SnapshotableConstructor = new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
  // eslint-disable-next-line @typescript-eslint/ban-types
) => {}

export default function Snapshotable<T extends SnapshotableConstructor>(Base: T) {
  return class Snapshotable extends Base {
    public async takeSnapshot() {
      const dream = this as unknown as Dream
      return await this._takeSnapshot(dream)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async _takeSnapshot(dream: Dream): Promise<Record<string, any>> {
      const dreamClass = dream.constructor as typeof Dream
      if (!dream.isDreamInstance) throw new Error('Cannot call takeSnapshot on a non-Dream')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      const hideFromSnapshotableFields = ((dreamClass as any)['hideFromSnapshotable'] || []) as string[]
      const attributes = dream.getAttributes()

      const allowedAttributes = Object.keys(attributes).reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (agg: Record<string, any>, columnName) => {
          if (!hideFromSnapshotableFields.includes(columnName)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            agg[columnName] = attributes[columnName]
          }
          return agg
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {} as Record<string, any>
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {
        ...allowedAttributes,
      }

      const associationMap = dreamClass['associationMetadataMap']()
      for (const associationName of Object.keys(associationMap)) {
        if (hideFromSnapshotableFields.includes(associationName)) continue

        const associationMetadata = associationMap[associationName]

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hasManyRecords: Record<string, any>[] = []

        switch (associationMetadata.type) {
          case 'HasMany':
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await dream.associationQuery(associationName as any).findEach(async record => {
              const associationSnapshot = await this._takeSnapshot(record as Dream)
              hasManyRecords.push(associationSnapshot)
            })

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            data[associationName] = hasManyRecords
            break

          case 'HasOne':
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-case-declarations, @typescript-eslint/no-unsafe-assignment
            const record = await dream.associationQuery(associationName as any).first()

            if (record) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              data[associationName] = await this._takeSnapshot(record as Dream)
            }
            break
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data as Record<string, any>
    }
  }
}
