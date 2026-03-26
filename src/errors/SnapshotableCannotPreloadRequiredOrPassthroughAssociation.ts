export default class SnapshotableCannotPreloadRequiredOrPassthroughAssociation extends Error {
  constructor(
    private dreamClassName: string,
    private associationName: string
  ) {
    super()
  }

  public override get message() {
    return `
The \`${this.associationName}\` association on \`${this.dreamClassName}\`
is incompatible with \`@Snapshotable\` because it has a \`DreamConst.required\`
or \`DreamConst.passthrough\` \`and\` clause.

To exclude \`${this.associationName}\` from snapshots, apply the
\`@SnapshotableIgnore()\` decorator to the association:

  @SnapshotableIgnore()
  @deco.HasMany('...', { and: { ... } })
  public ${this.associationName}: ...
`
  }
}
