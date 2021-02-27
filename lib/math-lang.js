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
exports.execute = void 0;
var lexer_1 = require("./lexer");
var Trace = __importStar(require("./stacktrace"));
var defalt_run_opts = {
    show_tokenized_code: false,
};
function execute(code, options) {
    if (options === void 0) { options = defalt_run_opts; }
    var source = new Trace.SourceText(code, "<program>");
    var lexer = new lexer_1.Lexer(source);
    lexer.lex_all();
    return lexer.tokens;
    /*
    
    const lexer = new Lexer(new Trace.SourceText(code, "<program>"))
    const tokens = lexer.make_tokens()
    if(options.show_tokenized_code) {
        console.log(tokens)
    }
    const parser = new Parser(tokens)
    var result : ParseResult = parser.parse()
    return result.entryNode?.visit();

    */
}
exports.execute = execute;
