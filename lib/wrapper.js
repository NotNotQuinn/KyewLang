"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexParseAndExecuteWrapper = void 0;
var lexer_1 = require("./lexer");
var parser_1 = require("./parser");
var stacktrace_1 = require("./stacktrace");
// import executor
var LexParseAndExecuteWrapper = /** @class */ (function () {
    function LexParseAndExecuteWrapper(rawText, filename) {
        // TODO refactor to use paths rather than needing to pass the LexParseAndExecuteWrapper a name and text
        // it could read the file. or we could do this in wherever the LexParseAndExecuteWrapper is used.
        this.source = new stacktrace_1.SourceText(rawText, filename);
        // TODO make lexer constructible without source text
        this.lexer = new lexer_1.Lexer(this.source);
        // TODO make parser constructible without tokens
        this.parser = new parser_1.Parser(this.lexer.make_tokens());
    }
    return LexParseAndExecuteWrapper;
}());
exports.LexParseAndExecuteWrapper = LexParseAndExecuteWrapper;
