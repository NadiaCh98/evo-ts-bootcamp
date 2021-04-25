export enum TraverseType {
    DFSInorder = 'inorder',
    DFSPreorder = 'preorder',
    DFSPostorder = 'postorder',
    BFS = 'breadthwards'
}

export interface TreeNode<T = number> {
    value: T;
    left: TreeNodeValue<T>;
    right: TreeNodeValue<T>;
}

export type TreeNodeValue<T> = TreeNode<T> | null;

export interface TreeLevels<T> {
    [key: number]: T[];
}

export interface BaseBinaryTree<T> {
    setTree(tree: TreeNode<T>): this;
    traverse(type: TraverseType): T[];
    getColumn(columnOrder: number): TreeNode<T>[];
}

export interface BaseBinarySearchTree extends BaseBinaryTree<number> {
    insertNode(node: number): void; 
    has(value: number): boolean;
}
 
export type CompareFunction<ValueType> = (a: ValueType, b: ValueType) => number;
export type MergeSortFunction = <ValueType>(array: ValueType[], compareFunction: CompareFunction<ValueType>) => ValueType[];