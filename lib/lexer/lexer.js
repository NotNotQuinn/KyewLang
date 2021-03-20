"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = exports.KEYWORDS = void 0;
// TODO move these keywords and operators to annother file?
// this file could get crouded if we keep them here
exports.KEYWORDS = [
    "if"
];
var Lexer = /** @class */ (function () {
    /**
     * Lexes source into tokens
     * @param source Text to lex
     */
    function Lexer(source) {
        this.source = source;
        this.tokens = [];
        this.curPos = 0;
    }
    Object.defineProperty(Lexer.prototype, "curChar", {
        /** Current character to process. */
        get: function () { return this.source[this.curPos]; },
        enumerable: false,
        configurable: true
    });
    /**
     * Lexes until all tokens have been processed.
     * @returns Current instance of lexer, so you can chain methods,
     *          e.g.
     *          * `lexer = new Lexer(source).lex_all()`
     *          * `tokens = lexer.lex_all().tokens`
     */
    Lexer.prototype.lex_all = function () {
    };
    /**
     * Lexes until a token is created.
     */
    Lexer.prototype.lex_one_token = function () {
    };
    Lexer.prototype.reset_lexer = function () {
        this.curTokenStart = undefined; // nowhere
        this.curTokenType = undefined; // nothing
    };
    return Lexer;
}());
exports.Lexer = Lexer;
