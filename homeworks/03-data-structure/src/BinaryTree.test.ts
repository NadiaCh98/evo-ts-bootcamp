import { BinaryTree } from './BinaryTree';
import { TraverseType, TreeNode } from './DataStructures';

describe("Binary Tree Functionality", () => {
    let testingTree: TreeNode;
    let binaryTree: BinaryTree<number>;

    beforeAll(() => {
        testingTree = {
            value: 5,
            left: {
                value: 10,
                left: {
                    value: 11,
                    left: null,
                    right: null
                },
                right: {
                    value: 12,
                    left: null,
                    right: null
                }
            },
            right: {
                value: 8,
                left: {
                    value: 15,
                    left: null,
                    right: null
                },
                right: {
                    value: 16,
                    left: null,
                    right: null
                }
            }
        };
    });

    beforeEach(() => {
        binaryTree = new BinaryTree<number>(testingTree);
    });

    it("asserts binary tree is transferred tree", () => {
        expect(binaryTree.getTree()).toEqual(testingTree);
    });

    describe("Traverse", () => {

        it("assets traverse inorder of {value: 5, left: 10, right: 11} = [10, 5, 11]", () => {
            binaryTree.setTree({
                value: 5,
                left: {
                    value: 10,
                    left: null,
                    right: null
                },
                right: {
                    value: 11,
                    left: null,
                    right: null
                }
            });
            expect(binaryTree.traverse(TraverseType.DFSInorder)).toEqual<number[]>([10, 5, 11]);
        });
    
        it("assets traverse inorder of testingTree = [11, 10, 12, 5, 15, 8, 16]", () => {
            expect(binaryTree.traverse(TraverseType.DFSInorder)).toEqual<number[]>([11, 10, 12, 5, 15, 8, 16]);
        });

        it("assets traverse preorder of {value: 5, left: 10, right: 11} = [5, 10, 11]", () => {
            binaryTree.setTree({
                value: 5,
                left: {
                    value: 10,
                    left: null,
                    right: null
                },
                right: {
                    value: 11,
                    left: null,
                    right: null
                }
            });
            expect(binaryTree.traverse(TraverseType.DFSPreorder)).toEqual<number[]>([5, 10, 11]);
        });
    
        it("assets traverse preorder of testingTree = [5, 10, 11, 12, 8, 15, 16]", () => {
            expect(binaryTree.traverse(TraverseType.DFSPreorder)).toEqual<number[]>([5, 10, 11, 12, 8, 15, 16]);
        });

        it("assets traverse postorder of {value: 5, left: 10, right: 11} = [10, 11, 5]", () => {
            binaryTree.setTree({
                value: 5,
                left: {
                    value: 10,
                    left: null,
                    right: null
                },
                right: {
                    value: 11,
                    left: null,
                    right: null
                }
            });
            expect(binaryTree.traverse(TraverseType.DFSPostorder)).toEqual<number[]>([10, 11, 5]);
        });
    
        it("assets traverse postorder of testingTree = [11, 12, 10,  15, 16, 8, 5]", () => {
            binaryTree.setTree(testingTree);
            expect(binaryTree.traverse(TraverseType.DFSPostorder)).toEqual<number[]>([11, 12, 10,  15, 16, 8, 5]);
        });

        it("assets traverse BFS of testingTree = [5, 10, 8, 11, 12, 15, 16]", () => {
            binaryTree.setTree(testingTree);
            expect(binaryTree.traverse(TraverseType.BFS)).toEqual<number[]>([5, 10, 8, 11, 12, 15, 16]);
        });
    });

    describe("Get Column", () => {
        it("asserts 0 column of testing tree = [testing tree, {value: 12, value, 15}]", () => {
            binaryTree.setTree(testingTree);
            expect(binaryTree.getColumn(0)).toEqual<TreeNode[]>([
                testingTree, 
                {value: 12, left: null, right: null}, 
                {value: 15, left: null, right: null}
            ]);
        });
    
        it("asserts 1 column of testing tree = [{value: 8, left: 15, right: 16}]", () => {
            binaryTree.setTree(testingTree);
            expect(binaryTree.getColumn(1)).toEqual<TreeNode[]>([
                {
                    value: 8,
                    left: {
                        value: 15,
                        left: null,
                        right: null
                    },
                    right: {
                        value: 16,
                        left: null,
                        right: null
                    }
                }
            ]);
        });
    
        it("asserts 2 column of testing tree = [{value: 16}]", () => {
            binaryTree.setTree(testingTree);
            expect(binaryTree.getColumn(2)).toEqual<TreeNode[]>([
                {
                    value: 16,
                    left: null,
                    right: null
                }
            ]);
        });
    });
})