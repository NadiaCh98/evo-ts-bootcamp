export enum TraverseType {
    DFSInorder = 'inorder',
    DFSPreorder = 'preorder',
    DFSPostorder = 'postorder',
    BFS = 'breadthwards'
}

export interface TreeNode<T> {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
}

export interface TreeLevels<T> {
    [key: number]: T[];
}

export interface BinaryTree<T> {
    traverse(type: TraverseType): T[];
    getColumn(columnOrder: number): T[];
}

export interface BinarySearchTree<T> extends BinaryTree<T> {
    has: (value: T) => boolean;
}