import { BinaryTree } from './BinaryTree';
import { BaseBinarySearchTree, TreeNode, TreeNodeValue } from './DataStructures';

export class BinarySearchTree extends BinaryTree<number> implements BaseBinarySearchTree {

    constructor() {
        super(null);
    }

    private findValue(value: number, tree: TreeNodeValue<number>): boolean {
        return tree?.value === value || 
            (
                !!tree && tree.value > value 
                ? !!tree?.left && this.findValue(value, tree.left) 
                : !!tree?.right && this.findValue(value, tree.right)
            );
    }

    private isBinarySearchTree(tree: TreeNodeValue<number>): boolean {
        let result = false;
        if (tree?.left) {
            result = this.isBinarySearchTree(tree.left);
        }
        if (result && tree?.right) {
            result &&= !this.isBinarySearchTree(tree.right)
        };
        if (!tree) {
            return true;
        } 
        if (tree.left) {
            const tempResult = tree.value > tree.left.value;
            if (tree.right) {
                return tempResult && tree.left.value < tree.right.value;
            }
            return tempResult;
        }
        return result;
    }

    public has(value: number): boolean {
        return this.findValue(value, this.tree);
    }

    public insertNode(value: number): void {
        const newNode: TreeNode = {
            value,
            left: null,
            right: null
        };
        if (!this.tree) {
            this.tree = newNode;
        } else {
            let currentNode = this.tree;
            while(true) {
                let parent = currentNode;
                if (parent.value === value) {
                    return;
                } else if (parent.value > value) {
                    if (!parent.left) {
                        parent.left = newNode;
                        return;
                    } else {
                        currentNode = parent.left;
                    }
                } else {
                    if (!parent.right) {
                        parent.right = newNode;
                        return;
                    } else {
                        currentNode = parent.right;
                    }
                }
            }
        }
    }

    public setTree(tree: TreeNodeValue<number>): this {
        if (!this.isBinarySearchTree(tree)) {
            throw new Error('The tree is not BST!');
        }
        this.tree = tree;
        return this;
    }
}
