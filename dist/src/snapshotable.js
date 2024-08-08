"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Snapshotable;
function Snapshotable(Base) {
    return class Snapshotable extends Base {
        async takeSnapshot() {
            const dream = this;
            return await this._takeSnapshot(dream);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async _takeSnapshot(dream) {
            const dreamClass = dream.constructor;
            if (!dream.isDreamInstance)
                throw new Error('Cannot call takeSnapshot on a non-Dream');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            const hideFromSnapshotableFields = (dreamClass['hideFromSnapshotable'] || []);
            const attributes = dream.getAttributes();
            const allowedAttributes = Object.keys(attributes).reduce(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (agg, columnName) => {
                if (!hideFromSnapshotableFields.includes(columnName)) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    agg[columnName] = attributes[columnName];
                }
                return agg;
            }, 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {});
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data = {
                ...allowedAttributes,
            };
            const associationMap = dreamClass['associationMetadataMap']();
            for (const associationName of Object.keys(associationMap)) {
                if (hideFromSnapshotableFields.includes(associationName))
                    continue;
                const associationMetadata = associationMap[associationName];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const hasManyRecords = [];
                switch (associationMetadata.type) {
                    case 'HasMany':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        await dream.associationQuery(associationName).findEach(async (record) => {
                            const associationSnapshot = await this._takeSnapshot(record);
                            hasManyRecords.push(associationSnapshot);
                        });
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        data[associationName] = hasManyRecords;
                        break;
                    case 'HasOne':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-case-declarations, @typescript-eslint/no-unsafe-assignment
                        const record = await dream.associationQuery(associationName).first();
                        if (record) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            data[associationName] = await this._takeSnapshot(record);
                        }
                        break;
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return data;
        }
    };
}
