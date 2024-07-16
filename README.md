# dream-plugin-json-snapshot

A plugin to take snapshots of a record, traversing all sub-associations, and spitting the resulting data out as JSON

## Usage

```ts
import { Sortable } from '@rvohealth/dream-plugin-json-snapshot'

class User extends Sortable(ApplicationModel) {
  ...
}

const user = await User.firstOrFail()
await user.takeSnapshot()
```
