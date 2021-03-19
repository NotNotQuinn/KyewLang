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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var Nodes = __importStar(require("../custom/nodes"));
var parser_state_1 = require("./parser_state");
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.state = parser_state_1.ParserState.DONE;
        this.input_tokens = [];
        this.curPos = 0;
        if (tokens !== undefined)
            this.input_tokens = tokens;
    }
    Object.defineProperty(Parser.prototype, "curToken", {
        get: function () {
            return this.input_tokens[this.curPos];
        },
        enumerable: false,
        configurable: true
    });
    ;
    Parser.prototype.parse = function (node) {
        if (node === void 0) { node = new Nodes.BaseNode; }
        switch (this.curToken) {
            case undefined:
                this.state = parser_state_1.ParserState.DONE;
        }
    };
    return Parser;
}());
exports.Parser = Parser;
