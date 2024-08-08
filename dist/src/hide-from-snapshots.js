"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HideFromSnapshotable;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HideFromSnapshotable() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (target, key) {
        const dreamClass = target.constructor;
        if (!Object.getOwnPropertyDescriptor(dreamClass, 'hideFromSnapshotable')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            ;
            dreamClass.hideFromSnapshotable = [];
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        ;
        dreamClass.hideFromSnapshotable.push(key);
    };
}
