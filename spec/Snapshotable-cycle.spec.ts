/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import TreeNode from '../test-app/app/models/TreeNode.js'

describe('Snapshotable with cyclic associations (e.g. siblings)', () => {
  it('terminates when an association points back at an ancestor, omitting the ancestor', async () => {
    const root = await TreeNode.create({ name: 'root' })
    const a = await TreeNode.create({ name: 'a', parent: root })
    await TreeNode.create({ name: 'b', parent: root })

    const snapshot = await a.takeSnapshot()

    expect(snapshot.name).toEqual('a')
    expect(snapshot.siblings).toHaveLength(1)
    expect(snapshot.siblings[0].name).toEqual('b')
    // b's siblings would be [a], but a is already an ancestor in this branch
    expect(snapshot.siblings[0].siblings).toEqual([])
  })

  it('still includes the same record when it is reached through a different, non-cyclic branch', async () => {
    const root = await TreeNode.create({ name: 'root' })
    await TreeNode.create({ name: 'a', parent: root })
    await TreeNode.create({ name: 'b', parent: root })

    const snapshot = await root.takeSnapshot()

    expect(snapshot.children.map((c: any) => c.name)).toEqual(['a', 'b'])
    // a and b are not ancestors of each other, so each appears in the other's siblings
    expect(snapshot.children[0].siblings.map((c: any) => c.name)).toEqual(['b'])
    expect(snapshot.children[1].siblings.map((c: any) => c.name)).toEqual(['a'])
    // ...but the cycle is cut one level further down
    expect(snapshot.children[0].siblings[0].siblings).toEqual([])
    expect(snapshot.children[1].siblings[0].siblings).toEqual([])
  })

  it('terminates for a cycle deeper than the preload depth', async () => {
    const root = await TreeNode.create({ name: 'root' })
    const l1 = await TreeNode.create({ name: 'l1', parent: root })
    const l2 = await TreeNode.create({ name: 'l2', parent: l1 })
    const l3 = await TreeNode.create({ name: 'l3', parent: l2 })
    const l4 = await TreeNode.create({ name: 'l4', parent: l3 })
    const l5a = await TreeNode.create({ name: 'l5a', parent: l4 })
    await TreeNode.create({ name: 'l5b', parent: l4 })

    const snapshot = await root.takeSnapshot()

    const l5 = snapshot.children[0].children[0].children[0].children[0].children[0]
    expect(l5.name).toEqual('l5a')
    expect(l5.id).toEqual(l5a.id)
    expect(l5.siblings[0].name).toEqual('l5b')
    expect(l5.siblings[0].siblings).toEqual([])
  })
})
