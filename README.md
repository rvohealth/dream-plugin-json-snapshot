# dream-plugin-json-snapshot

A plugin to take snapshots of a record, traversing all sub-associations, and spitting the resulting data out as JSON

## Usage

```ts
import { Sortable } from '@rvoh/dream-plugin-json-snapshot'

class User extends Sortable(ApplicationModel) {
  ...
}

const user = await User.firstOrFail()
await user.takeSnapshot()
```

## Questions?

- **Ask them on [Stack Overflow](https://stackoverflow.com)**, using the `[dream]` tag.

## Contributing

Dream is an open source library, so we encourage you to actively contribute. Visit our [Contributing](https://github.com/rvohealth/dream-plugin-json-snapshot/CONTRIBUTING.md) guide to learn more about the processes we use for submitting pull requests or issues.

Are you trying to report a possible security vulnerability? Visit our [Security Policy](https://github.com/rvohealth/dream-plugin-json-snapshot/SECURITY.md) for guidelines about how to proceed.
