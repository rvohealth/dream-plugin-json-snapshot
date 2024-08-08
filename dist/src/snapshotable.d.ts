import { Dream } from '@rvohealth/dream';
type SnapshotableConstructor = new (...args: any[]) => any;
export default function Snapshotable<T extends SnapshotableConstructor>(Base: T): {
    new (...args: any[]): {
        [x: string]: any;
        takeSnapshot(): Promise<Record<string, any>>;
        _takeSnapshot(dream: Dream): Promise<Record<string, any>>;
    };
} & T;
export {};
