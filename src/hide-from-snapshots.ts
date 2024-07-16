import { Dream } from '@rvohealth/dream'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HideFromSnapshotable(): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, key: string) {
    const dreamClass: typeof Dream = (target as Dream).constructor as typeof Dream
    if (!Object.getOwnPropertyDescriptor(dreamClass, 'hideFromSnapshotable')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      ;(dreamClass as any).hideFromSnapshotable = [] as string[]
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    ;(dreamClass as any).hideFromSnapshotable.push(key)
  }
}
