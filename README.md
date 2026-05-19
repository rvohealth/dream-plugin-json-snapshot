# dream-plugin-json-snapshot

Serializes a Dream model and its entire association tree into a plain JSON object. Designed for **internal** use cases — retention archiving, compliance storage, internal audit trails. Not appropriate for user-facing data subject access requests (GDPR/CCPA "give me all my data").

## Installation

```sh
pnpm add @rvoh/dream-plugin-json-snapshot
```

## Usage

Apply the `Snapshotable` mixin and call `takeSnapshot()` on any instance:

```ts
import { Snapshotable } from '@rvoh/dream-plugin-json-snapshot'

class User extends Snapshotable(ApplicationModel) {
  // ...
}

const user = await User.firstOrFail()
const data = await user.takeSnapshot()
// { id, email, posts: [{ id, body, comments: [...] }], ... }
```

`takeSnapshot()` includes all DB columns and recursively follows `HasMany` and `HasOne` associations. `BelongsTo` and `through` associations are skipped by default.

## Decorators

### `@SnapshotableIgnore()`

Excludes a column or association from the snapshot:

```ts
class User extends Snapshotable(ApplicationModel) {
  @SnapshotableIgnore()
  public passwordDigest: DreamColumn<User, 'passwordDigest'>

  @SnapshotableIgnore()
  @deco.HasMany('AuditLog')
  public auditLogs: AuditLog[]
}
```

Associations with a `DreamConst.required` or `DreamConst.passthrough` `and`-clause **must** be decorated with `@SnapshotableIgnore()` — `takeSnapshot()` throws at runtime if it encounters one that hasn't been excluded.

### `@SnapshotableFollowThrough()`

Opts a specific `through` association back in:

```ts
@SnapshotableFollowThrough()
@deco.HasMany('Place', { through: 'hostPlaces' })
public places: Place[]
```

## Data boundary safety

`BelongsTo` is always skipped, so traversal cannot cross ownership boundaries — starting from a `User`, you can only reach records that user owns. Many-to-many join models are safe by default: the traversal includes the join records but stops there since join models have only `BelongsTo` associations.

If you use `@SnapshotableFollowThrough()` to reach a shared resource (e.g. `Group`) through a join model, that resource's `hasMany` back to the join model will include join records for _all_ owners — not their core records (still blocked by `BelongsTo`), but the join records themselves. Apply `@SnapshotableIgnore()` on that association if the join model carries sensitive metadata you don't want in the snapshot.

Auto-inclusion is intentional: for retention use cases, omission is the real compliance risk. The tool captures everything reachable as the schema evolves.

## Performance

Uses batched preload queries to avoid N+1 for trees up to 4 levels deep; falls back to on-demand loading beyond that. Leverages the read replica if configured. Soft-deleted records are included (soft-delete scope is removed). Run in a background job — the result object can be large for deep association trees.

## Questions?

- **Ask them on [Stack Overflow](https://stackoverflow.com)**, using the `[dream]` tag.

## Contributing

Dream is an open source library, so we encourage you to actively contribute. Visit our [Contributing](https://github.com/rvohealth/dream-plugin-json-snapshot/CONTRIBUTING.md) guide to learn more about the processes we use for submitting pull requests or issues.

Are you trying to report a possible security vulnerability? Visit our [Security Policy](https://github.com/rvohealth/dream-plugin-json-snapshot/SECURITY.md) for guidelines about how to proceed.
