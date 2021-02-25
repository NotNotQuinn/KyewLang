"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var Tokens = __importStar(require("./tokens"));
var parse_result_1 = __importDefault(require("./parse_result"));
var Nodes = __importStar(require("./nodes"));
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.tokens = tokens;
        this.advance();
    }
    Parser.prototype.advance = function () {
        var res = this.tokens.next();
        this.current_token = res.value;
        if (res.done) {
            this.current_token = undefined;
        }
    };
    Parser.prototype.parse = function () {
        if (this.current_token == undefined) {
            return new parse_result_1.default(true, new Nodes.BaseNode());
        }
        var result = this.expression();
        return new parse_result_1.default(true, result);
    };
    Parser.prototype.expression = function () {
        var result = this.term();
        while (this.current_token != undefined &&
            (this.current_token instanceof Tokens.PlusToken || this.current_token instanceof Tokens.MinusToken)) {
            if (this.current_token instanceof Tokens.PlusToken) {
                this.advance();
                result = new Nodes.AddNode(result, this.term());
            }
            else if (this.current_token instanceof Tokens.MinusToken) {
                this.advance();
                result = new Nodes.SubtractNode(result, this.term());
            }
        }
        return result;
    };
    Parser.prototype.term = function () {
        var result = this.factor();
        while (this.current_token != undefined &&
            (this.current_token instanceof Tokens.DivideToken || this.current_token instanceof Tokens.MultiplyToken)) {
            if (this.current_token instanceof Tokens.DivideToken) {
                this.advance();
                result = new Nodes.DivideNode(result, this.factor());
            }
            else if (this.current_token instanceof Tokens.MultiplyToken) {
                this.advance();
                result = new Nodes.MultiplyNode(result, this.factor());
            }
        }
        return result;
    };
    Parser.prototype.factor = function () {
        var token = this.current_token;
        if (token instanceof Tokens.IntToken) {
            this.advance();
            return new Nodes.IntNode(token.value /* token value will always be `number` on int and float */);
        }
        if (token instanceof Tokens.FloatToken) {
            this.advance();
            return new Nodes.FloatNode(token.value /* token value will always be `number` on int and float */);
        }
        if (token instanceof Tokens.LeftPerenthesisToken) {
            this.advance();
            var node = this.expression();
            if (token instanceof Tokens.RightPerenthesisToken) {
                throw Error("Syntax error. Expected ')'");
            }
            this.advance();
            return node;
        }
        throw new Error("Syntax error");
    };
    return Parser;
}());
exports.Parser = Parser;
