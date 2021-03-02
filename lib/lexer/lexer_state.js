"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexerState = void 0;
var LexerState;
(function (LexerState) {
    // states = themeselves so I can read what state it is when its printed to the console.
    /** Default state, buffer is clear. */
    LexerState["LOOKING"] = "LOOKING";
    /** Clear the buffer and register a token, next state is always `LOOKING`. */
    LexerState["CREATE_TOKEN"] = "CREATE_TOKEN";
    /** Currently processing a number. */
    LexerState["NUMBER"] = "NUMBER";
    /** Currently processing a number with a decimal. */
    LexerState["NUMBER_WITH_DECIMAL"] = "NUMBER_WITH_DECIMAL";
    /** Currently processing an identifier or keyword. */
    LexerState["IDENTIFIER_OR_KEYWORD"] = "IDENTIFIER_OR_KEYWORD";
    /** A keyword matches this string exactly, but it could also go on further. */
    LexerState["KEYWORD_MATCH"] = "KEYWORD_MATCH";
    /** Currently processing an operator or a punctuator. */
    LexerState["PUNCTUATION_OR_OPERATOR"] = "PUNCTUATION_OR_OPERATOR";
    /** An operator matches this string exatly, but could go on further, e.g. `=` vs. `==` */
    LexerState["OPERATOR_MATCH"] = "OPERATOR_MATCH";
    /** Lexer has processed all tokens, this is the final state. */
    LexerState["DONE"] = "DONE";
})(LexerState = exports.LexerState || (exports.LexerState = {}));
