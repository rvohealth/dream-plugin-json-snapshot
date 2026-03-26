import TreeNode from '../../app/models/TreeNode.js'

let counter = 0

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function createTreeNode(attrs: Record<string, any> = {}) {
  return await TreeNode.create({
    name: `TreeNode name ${++counter}`,
    ...attrs,
  })
}
