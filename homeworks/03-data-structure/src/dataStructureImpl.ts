import { BinaryTree, TraverseType, TreeNode, TreeLevels } from './dataStructureModels';
import * as _ from 'lodash';

type TraverseFunction<T> = (tree: TreeNode<T>) => T[];

function assertNever(args: never): never {
    throw new Error(`Unexpected Argument, ${args}`);
}

class BinaryTreeImpl<T> implements BinaryTree<T> {

    constructor(protected tree: TreeNode<T>) { }

    private getSubtreeByTraverseOrder = (tree: TreeNode<T> | undefined, traverseFunction: TraverseFunction<T>): T[] =>
        tree ? traverseFunction(tree) : [];

    private traverseDFSInorder: TraverseFunction<T> = (tree) => {
        return [
            ...this.getSubtreeByTraverseOrder(tree.left, this.traverseDFSInorder),
            tree.value,
            ...this.getSubtreeByTraverseOrder(tree.right, this.traverseDFSInorder)
        ];
    }

    private traverseDFSPreorder: TraverseFunction<T> = (tree) => {
        return [
            tree.value,
            ...this.getSubtreeByTraverseOrder(tree.left, this.traverseDFSPreorder),
            ...this.getSubtreeByTraverseOrder(tree.right, this.traverseDFSPreorder)
        ];
    }

    private traverseDFSPostorder: TraverseFunction<T> = (tree) => {
        return [
            ...this.getSubtreeByTraverseOrder(tree.left, this.traverseDFSPostorder),
            ...this.getSubtreeByTraverseOrder(tree.right, this.traverseDFSPostorder),
            tree.value
        ];
    }

    private traverseBFS = (tree: TreeNode<T>, count = 0, levels?: Map<number, T[]>): T[] => {
        if (!levels) {
            levels = new Map();
        }
        if (levels.has(count)) {
            levels.get(count)?.push(tree.value); // !!!
        } else {
            levels.set(count, [tree.value]);
        }
        if (tree.left) {
            this.traverseBFS(tree.left, count + 1, levels);
        }
        if (tree.right) {
            this.traverseBFS(tree.right, count + 1, levels);
        }
        return _.flattenDeep(Array.from(levels.values()));
    }

    private traverseBFS1 = (tree: TreeNode<T>, count = 0, levels?: TreeLevels<T>): T[] => {
        if (!levels) {
            levels = {};
        }
        levels[count] = !!levels[count] ? [...levels[count], tree.value] : [tree.value];
        if (tree.left) {
            this.traverseBFS1(tree.left, count + 1, levels);
        }
        if (tree.right) {
            this.traverseBFS1(tree.right, count + 1, levels);
        }
        return _.flattenDeep(Object.values(levels));
    }

    traverse(type: TraverseType): T[] {
        switch (type) {
            case TraverseType.DFSInorder:
                return this.traverseDFSInorder(this.tree);
            case TraverseType.DFSPreorder: {
                return this.traverseDFSPreorder(this.tree);
            }
            case TraverseType.DFSPostorder:
                return this.traverseDFSPostorder(this.tree);
            case TraverseType.BFS: {
                return this.traverseBFS1(this.tree);
            }
            default:
                assertNever(type);
        }
    }

    getColumn(columnOrder: number): T[] {
        throw new Error('Method not implemented.');
    }
}

const tree: TreeNode<number> = {
    value: 5,
    left: {
        value: 3,
        left: {
            value: 1
        },
        right: {
            value: 2
        },
    },
    right: {
        value: 4,
        left: {
            value: 6
        },
        right: {
            value: 7
        },
    }
}

const t = new BinaryTreeImpl(tree);
const l: TreeLevels<number> = {
    0: [2, 2],
    1: []
}
const n = 0;
console.log(t.traverse(TraverseType.BFS));