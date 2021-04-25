import { BaseBinaryTree, TraverseType, TreeLevels, TreeNode, TreeNodeValue } from "./DataStructures";
import * as _ from 'lodash';

type TraverseFunction<T> = (tree: TreeNodeValue<T>) => T[];
type TraverseByLevelsFunction<TreeNodeType, LevelType, Result> = (
    tree: TreeNodeValue<TreeNodeType>, 
    count?: number, 
    levels?: TreeLevels<LevelType>
) => Result;

export class BinaryTree<T> implements BaseBinaryTree<T> {

    constructor(protected tree: TreeNodeValue<T>) { 
    }

    private traverseDFSInorder: TraverseFunction<T> = (tree) => {
        return tree?.value 
        ? [
            ...this.traverseDFSInorder(tree?.left),
            tree.value,
            ...this.traverseDFSInorder(tree?.right)
        ] 
        : [];
    }

    private traverseDFSPreorder: TraverseFunction<T> = (tree) => {
        return tree?.value 
        ? [
            tree.value,
            ...this.traverseDFSPreorder(tree?.left),
            ...this.traverseDFSPreorder(tree?.right)
        ] 
        : [];
    }

    private traverseDFSPostorder: TraverseFunction<T> = (tree) => {
        return tree?.value 
        ? [
            ...this.traverseDFSPostorder(tree?.left),
            ...this.traverseDFSPostorder(tree?.right),
            tree.value
        ] 
        : [];
    }

    private traverseBFS: TraverseByLevelsFunction<T, T, T[]> = (tree, count = 0, levels = {}): T[] => {
        if (tree) {
            levels[count] = !!levels[count] ? [...levels[count], tree.value] : [tree.value];
            if (tree.left) {
                this.traverseBFS(tree.left, count + 1, levels);
            }
            if (tree.right) {
                this.traverseBFS(tree.right, count + 1, levels);
            }
        }
        return _.flattenDeep(Object.values(levels));
    }

    private getTreeNodesByColumnIndex: TraverseByLevelsFunction<T, TreeNode<T>, TreeLevels<TreeNode<T>>> = (
        tree, 
        count = 0, 
        columns: TreeLevels<TreeNode<T>> = {}
    ): TreeLevels<TreeNode<T>> => {
        if (tree) {
            columns[count] = !!columns[count] ? [...columns[count], tree] : [tree];
            if (tree.left) {
                this.getTreeNodesByColumnIndex(tree.left, count - 1, columns);
            }
            if (tree.right) {
                this.getTreeNodesByColumnIndex(tree.right, count + 1, columns);
            }
        }
        return columns;
    }

    setTree(tree: TreeNode<T>): this {
        this.tree = tree;
        return this;    
    }

    getTree(): TreeNodeValue<T> {
        return this.tree;
    }

    traverse(type: TraverseType): T[] {
        switch (type) {
            case TraverseType.DFSInorder:
                return this.traverseDFSInorder(this.tree);
            case TraverseType.DFSPreorder: 
                return this.traverseDFSPreorder(this.tree);
            case TraverseType.DFSPostorder:
                return this.traverseDFSPostorder(this.tree);
            case TraverseType.BFS: {
                return this.traverseBFS(this.tree);
            }
            // default:
            //     throw new Error(`Unexpected Argument, ${type}`);
        }
    }

    getColumn(columnOrder: number): TreeNode<T>[] {
        const columns = this.getTreeNodesByColumnIndex(this.tree);
        return columns[columnOrder];
    }
}