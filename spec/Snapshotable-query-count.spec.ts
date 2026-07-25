/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { KyselyQueryDriver } from '@rvoh/dream/db'
import TreeNode from '../test-app/app/models/TreeNode.js'

/**
 * Snapshotable preloads its association tree in batches (see
 * `buildSnapshotPreloadPaths`), and every one of those preload statements is
 * issued through `KyselyQueryDriver#pluck`, so spying on `pluck` gives an exact
 * count of the preload queries a snapshot costs. (Only preloads go through it —
 * the initial `TreeNode.create` calls happen before the spy is installed.)
 */
describe('Snapshotable preload query counts', () => {
  async function createChain(depth: number) {
    const root = await TreeNode.create({ name: 'node0' })
    let current = root
    for (let i = 1; i < depth; i++) {
      current = await TreeNode.create({ name: `node${i}`, parent: current })
    }
    return root
  }

  context('a tree entirely within the preload depth', () => {
    it('issues only the root batched preload', async () => {
      const root = await createChain(3)

      const pluckSpy = vi.spyOn(KyselyQueryDriver.prototype, 'pluck')
      await root.takeSnapshot()

      // one batched preload rooted at `root`; nothing is deep enough to need a reload
      expect(pluckSpy).toHaveBeenCalledTimes(6)
    })
  })

  context('a tree deeper than the preload depth', () => {
    it('reloads an overflow node once, not once per unloaded association', async () => {
      // TreeNode has two snapshot-eligible associations (`children` and `firstChild`),
      // so a node past the preload horizon has two unloaded associations. Before the
      // fix, `_buildSnapshotFromLoaded` discarded the hydrated clone returned by
      // `LoadBuilder#execute`, so each of those associations triggered its own full
      // subtree reload.
      const root = await createChain(6)

      const pluckSpy = vi.spyOn(KyselyQueryDriver.prototype, 'pluck')
      const snapshot = await root.takeSnapshot()

      // 12 with the fix; 16 without it (the two overflow nodes each reloaded twice)
      expect(pluckSpy).toHaveBeenCalledTimes(12)

      // and the snapshot is still complete all the way down
      expect(snapshot.children[0].children[0].children[0].children[0].children[0].name).toEqual('node5')
    })
  })
})
