## 2.2.0

- switch to Github action publishing to npmjs.com

## 2.1.1

- Rewrite `Snapshotable` TSDoc: fix two factual errors (required/passthrough `and`-clause associations throw rather than silently skip; N+1 is now avoided via batched preloads up to 4 levels deep), add internal-use-only framing, document auto-inclusion rationale, soft-deleted record inclusion, and data boundary safety

## 2.1.0

- generate the full load tree and use `.load(...).execute(...)` to avoid exponential N+1 problem when generating the JSON snapshot

## 2.0.0

- support Dream 2.0

## 1.5.1

Capture soft-deleted records when taking snapshots

## 1.5.0

support dream 1.7 and dream-spec-helpers 1.2
