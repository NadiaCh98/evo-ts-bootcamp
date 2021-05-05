import { TreeNode, TreeNodeValue } from './DataStructures';
import { BinarySearchTree } from './BinarySearchTree';

describe("Binary Search Tree", () => {

    let binaryTree: BinarySearchTree;
    let bst: TreeNode;

    beforeAll(() => {
        binaryTree = new BinarySearchTree();
        bst = {
            value: 10,
            left: {
                value: 5,
                left: {
                    value: 4,
                    left: null,
                    right: null
                },
                right: {
                    value: 8,
                    left: null,
                    right: null
                }
            },
            right: {
                value: 15,
                left: {
                    value: 17,
                    left: null,
                    right: null
                },
                right: {
                    value: 23,
                    left: null,
                    right: null
                }
            }
        };
        
    })

    it("assets setTree() return Error if tree is not BST", () => {
        const receivedTree: TreeNode = {
            value: 2,
            left: {
                value: 5,
                left: null,
                right: null
            },
            right: {
                value: 4,
                left: null,
                right: null
            },
        };
        expect(() => binaryTree.setTree(receivedTree)).toThrowError('The tree is not BST!');
    });

    it("assets setTree() return object reference if simple tree is BST", () => {
        const receivedTree: TreeNode = {
            value: 2,
            left: {
                value: 1,
                left: null,
                right: null
            },
            right: {
                value: 5,
                left: null,
                right: null
            },
        };
        expect(binaryTree.setTree(receivedTree)).toEqual(binaryTree);
    });

    it("assets setTree() return object reference if tree is null", () => {
        expect(binaryTree.setTree(null)).toEqual(binaryTree);
    });

    it("assets setTree() return object reference if simple tree hasn't right subtree", () => {
        const receivedTree: TreeNode = {
            value: 2,
            left: {
                value: 1,
                left: null,
                right: null
            },
            right: null
        };
        expect(binaryTree.setTree(receivedTree)).toEqual(binaryTree);
    });

    it("assets setTree() return object reference if tree is BST", () => {
        expect(binaryTree.setTree(bst)).toEqual(binaryTree);
    });

    describe("Has()", () => {

        beforeAll(() => {
            binaryTree.setTree(bst);
        });

        it("asserts if BST has passed value return true", () => {
            expect(binaryTree.has(4)).toBe(true);
        });

        it("asserts if BST hasn't passed value return false", () => {
            expect(binaryTree.has(9)).toBe(false);
        });
    });

    describe("Insertion nodes", () => {

        beforeEach(() => {
            binaryTree = new BinarySearchTree();
        })

        it('asserts if insert root node that BS tree = root', () => {
            const ROOT = 7;
            binaryTree.insertNode(ROOT);
            expect(binaryTree.getTree()).toEqual<TreeNode>({
                value: ROOT,
                left: null,
                right: null
            });
        });

        it('asserts if next node exist in BST return BST', () => {
            const bst: TreeNode = {
                value: 7,
                left: {
                    value: 6,
                    left: null,
                    right: null
                },
                right: {
                    value: 11,
                    left: null,
                    right: null
                }
            }
            binaryTree.setTree(bst);
            binaryTree.insertNode(11);
            expect(binaryTree.getTree()).toEqual(bst);
        });

        it('asserts if insert next node that BS tree = {value: root, left: node}', () => {
            const values = [7, 5];
            values.forEach(element => {
                binaryTree.insertNode(element);
            });
            expect(binaryTree.getTree()).toEqual<TreeNodeValue<number>>({
                value: values[0],
                left: {
                    value: values[1],
                    left: null,
                    right: null
                },
                right: null
            });
        });

        it('asserts if next insering node > left node that BS tree = {value: root, left, right: node}', () => {
            const values = [7, 5, 11];
            values.forEach(element => {
                binaryTree.insertNode(element);
            });
            expect(binaryTree.getTree()).toEqual<TreeNodeValue<number>>({
                value: values[0],
                left: {
                    value: values[1],
                    left: null,
                    right: null
                },
                right: {
                    value: values[2],
                    left: null,
                    right: null
                }
            });
        });

        it('asserts if next insering node < left node that BS tree = {value: root, left: {value: leftNodeValue, left: node}}', () => {
            const values = [7, 5, 4];
            values.forEach(element => {
                binaryTree.insertNode(element);
            });
            expect(binaryTree.getTree()).toEqual<TreeNodeValue<number>>({
                value: values[0],
                left: {
                    value: values[1],
                    left: {
                        value: values[2],
                        left: null,
                        right: null
                    },
                    right: null
                },
                right: null
            });
        });

        it('asserts if next_node > left_node && next_node < right_node that BS tree = {value: root, left: {value: leftNodeValue, right: {rightNode, left: node}}}', () => {
            const values = [27, 14, 35, 31];
            values.forEach(element => {
                binaryTree.insertNode(element);
            });
            expect(binaryTree.getTree()).toEqual<TreeNodeValue<number>>({
                value: values[0],
                left: {
                    value: values[1],
                    left: null,
                    right: null
                },
                right: {
                    value: values[2],
                    left: {
                        value: values[3],
                        left: null,
                        right: null
                    },
                    right: null
                }
            });
        });
    })
});