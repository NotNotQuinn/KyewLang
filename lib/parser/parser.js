"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var parse_result_1 = __importDefault(require("./parse_result"));
var parser_state_1 = require("./parser_state");
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.state = parser_state_1.ParserState.DONE;
        this.input_tokens = [];
        if (tokens !== undefined)
            this.input_tokens = tokens;
        this.curPos = 0;
    }
    Object.defineProperty(Parser.prototype, "curToken", {
        get: function () {
            return this.input_tokens[this.curPos];
        },
        enumerable: false,
        configurable: true
    });
    ;
    Parser.prototype.parse = function () {
        if (this.curToken == undefined) {
            return new parse_result_1.default(true);
        }
    };
    return Parser;
}());
exports.Parser = Parser;
