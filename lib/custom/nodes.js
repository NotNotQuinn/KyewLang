"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivideNode = exports.MultiplyNode = exports.SubtractNode = exports.AddNode = exports.NegativeNode = exports.FloatNode = exports.IntNode = exports.ValueNode = exports.BinaryOperatorNode = exports.UnaryOperatorNode = exports.BaseNode = void 0;
var errors_1 = require("./errors/errors");
/***********************
 BUILDING BLOCK NODES
************************/
/** */
var BaseNode = /** @class */ (function (_super) {
    __extends(BaseNode, _super);
    function BaseNode() {
        return _super.call(this) || this;
    }
    BaseNode.prototype.display = function () {
    };
    BaseNode.prototype.visit = function () {
        throw new errors_1.NodeViewError("Cannot visit base nodes or visit not implemented.");
    };
    return BaseNode;
}(errors_1.TraceableError));
exports.BaseNode = BaseNode;
var UnaryOperatorNode = /** @class */ (function (_super) {
    __extends(UnaryOperatorNode, _super);
    function UnaryOperatorNode(child) {
        var _this = _super.call(this) || this;
        _this.child = child;
        return _this;
    }
    return UnaryOperatorNode;
}(BaseNode));
exports.UnaryOperatorNode = UnaryOperatorNode;
var BinaryOperatorNode = /** @class */ (function (_super) {
    __extends(BinaryOperatorNode, _super);
    function BinaryOperatorNode(child_1, child_2) {
        var _this = _super.call(this) || this;
        _this.child_1 = child_1;
        _this.child_2 = child_2;
        return _this;
    }
    BinaryOperatorNode.prototype.display = function () {
        return "(" + this.child_1.display() + this.getOperatorString() + this.child_2.display() + ")";
    };
    BinaryOperatorNode.prototype.getOperatorString = function () {
        return '(operator)';
    };
    return BinaryOperatorNode;
}(BaseNode));
exports.BinaryOperatorNode = BinaryOperatorNode;
var ValueNode = /** @class */ (function (_super) {
    __extends(ValueNode, _super);
    function ValueNode(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    ValueNode.prototype.display = function () {
        return "(" + this.value + ")";
    };
    return ValueNode;
}(BaseNode));
exports.ValueNode = ValueNode;
/***********************
 VALUE NODES
************************/
/** */
var IntNode = /** @class */ (function (_super) {
    __extends(IntNode, _super);
    function IntNode(value) {
        return _super.call(this, value) || this;
    }
    return IntNode;
}(ValueNode));
exports.IntNode = IntNode;
var FloatNode = /** @class */ (function (_super) {
    __extends(FloatNode, _super);
    function FloatNode(value) {
        return _super.call(this, value) || this;
    }
    return FloatNode;
}(ValueNode));
exports.FloatNode = FloatNode;
/***********************
 UNARY OPERATION NODES
************************/
/** */
var NegativeNode = /** @class */ (function (_super) {
    __extends(NegativeNode, _super);
    function NegativeNode(child) {
        return _super.call(this, child) || this;
    }
    return NegativeNode;
}(UnaryOperatorNode));
exports.NegativeNode = NegativeNode;
/***********************
 BINARY OPERATION NODES
************************/
/** */
var AddNode = /** @class */ (function (_super) {
    __extends(AddNode, _super);
    function AddNode(child_1, child_2) {
        return _super.call(this, child_1, child_2) || this;
    }
    AddNode.prototype.getOperatorString = function () {
        return '+';
    };
    return AddNode;
}(BinaryOperatorNode));
exports.AddNode = AddNode;
var SubtractNode = /** @class */ (function (_super) {
    __extends(SubtractNode, _super);
    function SubtractNode(child_1, child_2) {
        return _super.call(this, child_1, child_2) || this;
    }
    SubtractNode.prototype.getOperatorString = function () {
        return '-';
    };
    return SubtractNode;
}(BinaryOperatorNode));
exports.SubtractNode = SubtractNode;
var MultiplyNode = /** @class */ (function (_super) {
    __extends(MultiplyNode, _super);
    function MultiplyNode(child_1, child_2) {
        return _super.call(this, child_1, child_2) || this;
    }
    MultiplyNode.prototype.getOperatorString = function () {
        return '*';
    };
    return MultiplyNode;
}(BinaryOperatorNode));
exports.MultiplyNode = MultiplyNode;
var DivideNode = /** @class */ (function (_super) {
    __extends(DivideNode, _super);
    function DivideNode(child_1, child_2) {
        return _super.call(this, child_1, child_2) || this;
    }
    DivideNode.prototype.getOperatorString = function () {
        return '/';
    };
    return DivideNode;
}(BinaryOperatorNode));
exports.DivideNode = DivideNode;
