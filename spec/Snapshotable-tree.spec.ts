/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import TreeNode from '../test-app/app/models/TreeNode.js'

describe('Snapshotable with self-referential tree structures', () => {
  it('snapshots a node with no children', async () => {
    const root = await TreeNode.create({ name: 'root' })
    const snapshot = await root.takeSnapshot()

    expect(snapshot.name).toEqual('root')
    expect(snapshot.children).toEqual([])
  })

  it('snapshots a tree of depth 2', async () => {
    const root = await TreeNode.create({ name: 'root' })
    await TreeNode.create({ name: 'child1', parent: root })
    await TreeNode.create({ name: 'child2', parent: root })

    const snapshot = await root.takeSnapshot()

    expect(snapshot.name).toEqual('root')
    expect(snapshot.children).toHaveLength(2)
    expect(snapshot.children[0].name).toEqual('child1')
    expect(snapshot.children[1].name).toEqual('child2')
    expect(snapshot.children[0].children).toEqual([])
    expect(snapshot.children[1].children).toEqual([])
  })

  it('snapshots a tree of depth 4', async () => {
    const root = await TreeNode.create({ name: 'root' })
    const level1 = await TreeNode.create({ name: 'level1', parent: root })
    const level2 = await TreeNode.create({ name: 'level2', parent: level1 })
    await TreeNode.create({ name: 'level3', parent: level2 })

    const snapshot = await root.takeSnapshot()

    expect(snapshot.name).toEqual('root')
    expect(snapshot.children[0].name).toEqual('level1')
    expect(snapshot.children[0].children[0].name).toEqual('level2')
    expect(snapshot.children[0].children[0].children[0].name).toEqual('level3')
    expect(snapshot.children[0].children[0].children[0].children).toEqual([])
  })

  it('snapshots a tree of depth 6 (beyond the preload depth of 4)', async () => {
    const root = await TreeNode.create({ name: 'root' })
    const l1 = await TreeNode.create({ name: 'l1', parent: root })
    const l2 = await TreeNode.create({ name: 'l2', parent: l1 })
    const l3 = await TreeNode.create({ name: 'l3', parent: l2 })
    const l4 = await TreeNode.create({ name: 'l4', parent: l3 })
    await TreeNode.create({ name: 'l5', parent: l4 })

    const snapshot = await root.takeSnapshot()

    expect(snapshot.name).toEqual('root')
    expect(snapshot.children[0].name).toEqual('l1')
    expect(snapshot.children[0].children[0].name).toEqual('l2')
    expect(snapshot.children[0].children[0].children[0].name).toEqual('l3')
    expect(snapshot.children[0].children[0].children[0].children[0].name).toEqual('l4')
    expect(snapshot.children[0].children[0].children[0].children[0].children[0].name).toEqual('l5')
    expect(snapshot.children[0].children[0].children[0].children[0].children[0].children).toEqual([])
  })

  it('snapshots a branching tree with mixed depths', async () => {
    const root = await TreeNode.create({ name: 'root' })
    const a = await TreeNode.create({ name: 'a', parent: root })
    const b = await TreeNode.create({ name: 'b', parent: root })
    await TreeNode.create({ name: 'a1', parent: a })
    await TreeNode.create({ name: 'a2', parent: a })
    await TreeNode.create({ name: 'b1', parent: b })

    const snapshot = await root.takeSnapshot()

    expect(snapshot.children).toHaveLength(2)
    expect(snapshot.children[0].name).toEqual('a')
    expect(snapshot.children[0].children).toHaveLength(2)
    expect(snapshot.children[0].children[0].name).toEqual('a1')
    expect(snapshot.children[0].children[1].name).toEqual('a2')
    expect(snapshot.children[1].name).toEqual('b')
    expect(snapshot.children[1].children).toHaveLength(1)
    expect(snapshot.children[1].children[0].name).toEqual('b1')
  })
})
