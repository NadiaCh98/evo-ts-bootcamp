"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var dataStructureModels_1 = require("./dataStructureModels");
var _ = require("lodash");
function assertNever(args) {
    throw new Error("Unexpected Argument, " + args);
}
var BinaryTreeImpl = /** @class */ (function () {
    function BinaryTreeImpl(tree) {
        var _this = this;
        this.tree = tree;
        this.getSubtreeByTraverseOrder = function (tree, traverseFunction) {
            return tree ? traverseFunction(tree) : [];
        };
        this.traverseDFSInorder = function (tree) {
            return __spreadArrays(_this.getSubtreeByTraverseOrder(tree.left, _this.traverseDFSInorder), [
                tree.value
            ], _this.getSubtreeByTraverseOrder(tree.right, _this.traverseDFSInorder));
        };
        this.traverseDFSPreorder = function (tree) {
            return __spreadArrays([
                tree.value
            ], _this.getSubtreeByTraverseOrder(tree.left, _this.traverseDFSPreorder), _this.getSubtreeByTraverseOrder(tree.right, _this.traverseDFSPreorder));
        };
        this.traverseDFSPostorder = function (tree) {
            return __spreadArrays(_this.getSubtreeByTraverseOrder(tree.left, _this.traverseDFSPostorder), _this.getSubtreeByTraverseOrder(tree.right, _this.traverseDFSPostorder), [
                tree.value
            ]);
        };
        this.traverseBFS = function (tree, count, levels) {
            var _a;
            if (count === void 0) { count = 0; }
            if (!levels) {
                levels = new Map();
            }
            if (levels.has(count)) {
                (_a = levels.get(count)) === null || _a === void 0 ? void 0 : _a.push(tree.value); // !!!
            }
            else {
                levels.set(count, [tree.value]);
            }
            if (tree.left) {
                _this.traverseBFS(tree.left, count + 1, levels);
            }
            if (tree.right) {
                _this.traverseBFS(tree.right, count + 1, levels);
            }
            return _.flattenDeep(Array.from(levels.values()));
        };
        this.traverseBFS1 = function (tree, count, levels) {
            if (count === void 0) { count = 0; }
            if (!levels) {
                levels = {};
            }
            levels[count] = !!levels[count] ? __spreadArrays(levels[count], [tree.value]) : [tree.value];
            if (tree.left) {
                _this.traverseBFS1(tree.left, count + 1, levels);
            }
            if (tree.right) {
                _this.traverseBFS1(tree.right, count + 1, levels);
            }
            return _.flattenDeep(Object.values(levels));
        };
    }
    BinaryTreeImpl.prototype.traverse = function (type) {
        switch (type) {
            case dataStructureModels_1.TraverseType.DFSInorder:
                return this.traverseDFSInorder(this.tree);
            case dataStructureModels_1.TraverseType.DFSPreorder: {
                return this.traverseDFSPreorder(this.tree);
            }
            case dataStructureModels_1.TraverseType.DFSPostorder:
                return this.traverseDFSPostorder(this.tree);
            case dataStructureModels_1.TraverseType.BFS: {
                return this.traverseBFS1(this.tree);
            }
            default:
                assertNever(type);
        }
    };
    BinaryTreeImpl.prototype.getColumn = function (columnOrder) {
        throw new Error('Method not implemented.');
    };
    return BinaryTreeImpl;
}());
var tree = {
    value: 5,
    left: {
        value: 3,
        left: {
            value: 1
        },
        right: {
            value: 2
        }
    },
    right: {
        value: 4,
        left: {
            value: 6
        },
        right: {
            value: 7
        }
    }
};
var t = new BinaryTreeImpl(tree);
var l = {
    0: [2, 2],
    1: []
};
var n = 0;
console.log(t.traverse(dataStructureModels_1.TraverseType.BFS));
