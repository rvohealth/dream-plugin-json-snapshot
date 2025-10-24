import { Dream } from '@rvoh/dream'
import { DecoratorContext } from '@rvoh/dream/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SnapshotableFollowThrough(): any {
  // return function (target: any, key: string) {
  return function (_: undefined, context: DecoratorContext) {
    const key = context.name

    context.addInitializer(function () {
      const target = this as Dream
      const dreamClass = target.constructor as typeof Dream

      if (!dreamClass['globallyInitializingDecorators']) {
        /**
         * Modern Javascript applies implicit accessors to instance properties
         * that don't have an accessor explicitly defined in the class definition.
         * The instance accessors shadow prototype accessors.
         * `addInitializer` is called by Decorators after an instance has been fully
         * constructed. We leverage this opportunity to delete the instance accessors
         * so that the prototype accessors applied by this decorator can be reached.
         */
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        delete this[key]
        return
      }

      if (!Object.getOwnPropertyDescriptor(dreamClass, 'snapshotableFollowThrough')) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        ;(dreamClass as any).snapshotableFollowThrough = [] as string[]
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      ;(dreamClass as any).snapshotableFollowThrough.push(key)
      return
    })
  }
}
