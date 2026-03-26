/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Dream, DreamConst } from '@rvoh/dream'
import SnapshotableCannotPreloadRequiredOrPassthroughAssociation from './errors/SnapshotableCannotPreloadRequiredOrPassthroughAssociation.js'

type DreamClassAndAssociationNameTuple = [typeof Dream, string]

const MAX_REPEATS = 4
const snapshotPreloadPathsCache = new Map<string, DreamClassAndAssociationNameTuple[][]>()

/**
 * @internal
 *
 * Recursively walks associations that Snapshotable would traverse,
 * producing an array of preload paths. Each path is an array of
 * [DreamClass, associationName] tuples from root to leaf.
 *
 * Allows the same Dream class to appear up to MAX_REPEATS times in a single
 * path to support tree structures (e.g. a Comment with HasMany children
 * which are also Comments).
 *
 * Follows the same conventions as Snapshotable:
 * - Skips BelongsTo associations
 * - Skips through associations (unless in snapshotableFollowThrough)
 * - Throws for associations with required or passthrough on clauses (must be decorated with @SnapshotableIgnore)
 * - Skips associations in snapshotableIgnore
 * - Includes HasMany and HasOne
 */
export default function buildSnapshotPreloadPaths(
  dreamClass: typeof Dream
): DreamClassAndAssociationNameTuple[][] {
  const cacheKey = dreamClass.sanitizedName
  const cached = snapshotPreloadPathsCache.get(cacheKey)
  if (cached) return cached

  const paths: DreamClassAndAssociationNameTuple[][] = []
  traverse(dreamClass, [], {}, paths)
  snapshotPreloadPathsCache.set(cacheKey, paths)
  return paths
}

function traverse(
  dreamClass: typeof Dream,
  currentPath: DreamClassAndAssociationNameTuple[],
  depthTracker: Record<string, number>,
  paths: DreamClassAndAssociationNameTuple[][]
) {
  const trackerId = dreamClass.sanitizedName
  depthTracker[trackerId] ??= 0
  if (depthTracker[trackerId] + 1 > MAX_REPEATS) {
    if (currentPath.length > 0) {
      paths.push([...currentPath])
    }
    return
  }
  depthTracker[trackerId]++

  const snapshotableIgnoreFields = ((dreamClass as any)['snapshotableIgnore'] || []) as string[]
  const snapshotableFollowThroughFields = ((dreamClass as any)['snapshotableFollowThrough'] || []) as string[]

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const associationMap = dreamClass['associationMetadataMap']() as Record<string, any>

  const eligibleAssociations: string[] = []

  for (const associationName of Object.keys(associationMap)) {
    if (snapshotableIgnoreFields.includes(associationName)) continue

    const associationMetadata = associationMap[associationName]

    if (associationMetadata.type === 'BelongsTo') continue

    if (associationMetadata.through) {
      if (!snapshotableFollowThroughFields.includes(associationName)) continue
    }

    // Associations with required/passthrough on clauses cannot be preloaded
    // without providing the required values — they must be decorated with @SnapshotableIgnore
    if (associationMetadata.and) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const requiredOrPassthroughClause = Object.values(associationMetadata.and).find(
        (value: any) => value === DreamConst.required || value === DreamConst.passthrough
      )
      if (requiredOrPassthroughClause) {
        throw new SnapshotableCannotPreloadRequiredOrPassthroughAssociation(
          dreamClass.sanitizedName,
          associationName
        )
      }
    }

    if (associationMetadata.type !== 'HasMany' && associationMetadata.type !== 'HasOne') continue

    eligibleAssociations.push(associationName)
  }

  if (eligibleAssociations.length === 0) {
    if (currentPath.length > 0) {
      paths.push([...currentPath])
    }
    depthTracker[trackerId]--
    return
  }

  for (const associationName of eligibleAssociations) {
    const associationMetadata = associationMap[associationName]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const modelCBResult = associationMetadata.modelCB()
    const targetClasses: (typeof Dream)[] = Array.isArray(modelCBResult) ? modelCBResult : [modelCBResult]

    for (const targetClass of targetClasses) {
      const tuple: DreamClassAndAssociationNameTuple = [dreamClass, associationName]
      const newPath = [...currentPath, tuple]

      traverse(targetClass, newPath, { ...depthTracker }, paths)
    }
  }

  depthTracker[trackerId]--
}
