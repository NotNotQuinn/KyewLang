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
exports.NewlineToken = exports.RightPerenthesisToken = exports.LeftPerenthesisToken = exports.DivideToken = exports.MultiplyToken = exports.MinusToken = exports.PlusToken = exports.FloatToken = exports.IntToken = exports.BinaryOperatorToken = exports.ValueToken = exports.BaseToken = void 0;
var errors_1 = require("./errors");
/***********************
 BUILDING BLOCK TOKENS
************************/
var BaseToken = /** @class */ (function (_super) {
    __extends(BaseToken, _super);
    function BaseToken() {
        return _super.call(this) || this;
    }
    return BaseToken;
}(errors_1.TraceableError));
exports.BaseToken = BaseToken;
var ValueToken = /** @class */ (function (_super) {
    __extends(ValueToken, _super);
    function ValueToken(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    return ValueToken;
}(BaseToken));
exports.ValueToken = ValueToken;
var BinaryOperatorToken = /** @class */ (function (_super) {
    __extends(BinaryOperatorToken, _super);
    function BinaryOperatorToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BinaryOperatorToken;
}(BaseToken));
exports.BinaryOperatorToken = BinaryOperatorToken;
/***********************
 VALUE TOKENS
************************/
var IntToken = /** @class */ (function (_super) {
    __extends(IntToken, _super);
    function IntToken(int_value) {
        var _this = this;
        if (int_value % 1 != 0) {
            throw new TypeError("Cannot have floating point value '" + int_value + "' in IntNode.");
        }
        _this = _super.call(this, int_value) || this;
        return _this;
    }
    return IntToken;
}(ValueToken));
exports.IntToken = IntToken;
var FloatToken = /** @class */ (function (_super) {
    __extends(FloatToken, _super);
    function FloatToken(int_value) {
        return _super.call(this, int_value) || this;
    }
    return FloatToken;
}(ValueToken));
exports.FloatToken = FloatToken;
/***********************
 BINARY OPERATION TOKENS
************************/
var PlusToken = /** @class */ (function (_super) {
    __extends(PlusToken, _super);
    function PlusToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PlusToken;
}(BinaryOperatorToken));
exports.PlusToken = PlusToken;
var MinusToken = /** @class */ (function (_super) {
    __extends(MinusToken, _super);
    function MinusToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MinusToken;
}(BinaryOperatorToken));
exports.MinusToken = MinusToken;
var MultiplyToken = /** @class */ (function (_super) {
    __extends(MultiplyToken, _super);
    function MultiplyToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiplyToken;
}(BinaryOperatorToken));
exports.MultiplyToken = MultiplyToken;
var DivideToken = /** @class */ (function (_super) {
    __extends(DivideToken, _super);
    function DivideToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DivideToken;
}(BinaryOperatorToken));
exports.DivideToken = DivideToken;
/***********************
 OTHER TOKENS
************************/
var LeftPerenthesisToken = /** @class */ (function (_super) {
    __extends(LeftPerenthesisToken, _super);
    function LeftPerenthesisToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LeftPerenthesisToken;
}(BaseToken));
exports.LeftPerenthesisToken = LeftPerenthesisToken;
var RightPerenthesisToken = /** @class */ (function (_super) {
    __extends(RightPerenthesisToken, _super);
    function RightPerenthesisToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RightPerenthesisToken;
}(BaseToken));
exports.RightPerenthesisToken = RightPerenthesisToken;
var NewlineToken = /** @class */ (function (_super) {
    __extends(NewlineToken, _super);
    function NewlineToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NewlineToken;
}(BaseToken));
exports.NewlineToken = NewlineToken;
