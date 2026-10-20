import { Decorators } from '@rvoh/dream'
import { DreamColumn } from '@rvoh/dream/types'
import Snapshotable from '../../../src/Snapshotable.js'
import ApplicationModel from './ApplicationModel.js'

const deco = new Decorators<typeof TreeNode>()

export default class TreeNode extends Snapshotable(ApplicationModel) {
  public override get table() {
    return 'tree_nodes' as const
  }

  public id: DreamColumn<TreeNode, 'id'>
  public name: DreamColumn<TreeNode, 'name'>
  public createdAt: DreamColumn<TreeNode, 'createdAt'>
  public updatedAt: DreamColumn<TreeNode, 'updatedAt'>

  @deco.BelongsTo('TreeNode', { on: 'treeNodeId', optional: true })
  public parent: TreeNode | null
  public treeNodeId: DreamColumn<TreeNode, 'treeNodeId'>

  @deco.HasMany('TreeNode', { on: 'treeNodeId' })
  public children: TreeNode[]

  // Other nodes sharing this node's parent. Each sibling's `siblings`
  // association points back at this node, forming a cycle.
  @deco.HasMany('TreeNode', {
    on: 'treeNodeId',
    primaryKeyOverride: 'treeNodeId',
    selfAndNot: { id: 'id' },
  })
  public siblings: TreeNode[]
}
