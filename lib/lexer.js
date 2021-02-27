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
exports.Lexer = exports.LexerState = exports.OPERATORS = exports.KEYWORDS = void 0;
var tokens_1 = require("./tokens");
var Trace = __importStar(require("./stacktrace"));
// TODO move these keywords and operators to annother file?
// this file could get crouded if we keep them here
exports.KEYWORDS = [
    "if"
];
exports.OPERATORS = [
    "+",
    "-",
    "*",
    "/",
    "%",
];
//*************************************************************************************************************** */
// This lexer is an implementation of a Fianite State Machine (FSM) -> can only be one of a finiate number of states
// If you want to learn more look up Fianite State Machine on Wikipedia
//*************************************************************************************************************** */
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
var s = LexerState;
var Lexer = /** @class */ (function () {
    /**
     * Lexes source into tokens
     * @param source Text to lex
     */
    function Lexer(source) {
        this.source = source;
        this.tokens = [];
        this.state = s.LOOKING;
        this.buf = "";
        this.curPos = 0;
    }
    Object.defineProperty(Lexer.prototype, "curChar", {
        /** Current character to process. */
        get: function () { return this.source.rawText[this.curPos]; },
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
        while (this.state != s.DONE) {
            this.lex_step();
        }
        return this;
    };
    /**
     * Lexes until a token is created.
     */
    Lexer.prototype.lex_one_token = function () {
        while (this.state !== s.CREATE_TOKEN) {
            this.lex_step();
        }
        // since we stop when we need to create a token, we need to step one more time to create it.
        this.lex_step();
    };
    /**
     * Lexes a single step, this could be a change in the position, or a change in state, or both.
     */
    Lexer.prototype.lex_step = function () {
        switch (this.state) {
            case s.DONE:
                return;
            case s.LOOKING:
                switch (this.curChar) {
                    case undefined:
                        this.state = s.DONE;
                        break;
                    // digits
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                        console.log("number found");
                        this.state = s.NUMBER;
                        this.buf += this.curChar;
                        this.curTokenStart = this.curPos;
                        this.curPos++;
                        break;
                    case " ":
                    case "\t":
                    case "\n":
                        this.curPos++;
                        console.log("whitespace");
                        // whitespace
                        break;
                    // lowecase
                    case "a":
                    case "b":
                    case "c":
                    case "d":
                    case "e":
                    case "f":
                    case "g":
                    case "h":
                    case "i":
                    case "j":
                    case "k":
                    case "l":
                    case "m":
                    case "n":
                    case "o":
                    case "p":
                    case "q":
                    case "r":
                    case "s":
                    case "t":
                    case "u":
                    case "v":
                    case "w":
                    case "x":
                    case "y":
                    case "z":
                    // uppercase
                    case "A":
                    case "B":
                    case "C":
                    case "D":
                    case "E":
                    case "F":
                    case "G":
                    case "H":
                    case "I":
                    case "J":
                    case "K":
                    case "L":
                    case "M":
                    case "N":
                    case "O":
                    case "P":
                    case "Q":
                    case "R":
                    case "S":
                    case "T":
                    case "U":
                    case "V":
                    case "W":
                    case "X":
                    case "Y":
                    case "Z":
                    // underscores
                    case "_":
                        // this could be a keyword or an indentifier
                        console.log("Identifier or keyword");
                        this.state = s.IDENTIFIER_OR_KEYWORD;
                        this.buf += this.curChar;
                        this.curTokenStart = this.curPos;
                        this.curPos++;
                        // dont add to buf because we arent handling yet
                        break;
                    case "(":
                    case ")": // order of operations
                    case "-":
                    case "+":
                    case "*":
                    case "/": // add, subtract, multiply, divide
                    case "%": // modulas 
                    case "^": // power
                        this.buf += this.curChar;
                        this.state = s.PUNCTUATION_OR_OPERATOR;
                        break;
                    default:
                        console.log("Unknown character: " + this.curChar);
                        this.curPos++;
                }
                break;
            case s.PUNCTUATION_OR_OPERATOR:
                if (exports.OPERATORS.includes(this.buf)) {
                    this.state = s.OPERATOR_MATCH;
                    break;
                }
                switch (this.curChar) {
                }
                break;
            case s.OPERATOR_MATCH:
                switch (this.curChar) {
                }
                break;
            case s.NUMBER:
                switch (this.curChar) {
                    case ".":
                        this.state = s.NUMBER_WITH_DECIMAL;
                    // dont break because this is still going to be added to the buffer
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                        this.buf += this.curChar;
                        this.curPos++;
                        break;
                    default:
                        this.curTokenType = tokens_1.TType.IntToken;
                        this.state = s.CREATE_TOKEN;
                }
                break;
            case s.NUMBER_WITH_DECIMAL:
                switch (this.curChar) {
                    case ".":
                        this.state = s.CREATE_TOKEN;
                    // dont break because this is still going to be added to the buffer
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                        this.buf += this.curChar;
                        this.curPos++;
                        break;
                    default:
                        this.curTokenType = tokens_1.TType.FloatToken;
                        this.state = s.CREATE_TOKEN;
                }
                break;
            case s.KEYWORD_MATCH:
                switch (this.curChar) {
                    // digits
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                    // lowecase
                    case "a":
                    case "b":
                    case "c":
                    case "d":
                    case "e":
                    case "f":
                    case "g":
                    case "h":
                    case "i":
                    case "j":
                    case "k":
                    case "l":
                    case "m":
                    case "n":
                    case "o":
                    case "p":
                    case "q":
                    case "r":
                    case "s":
                    case "t":
                    case "u":
                    case "v":
                    case "w":
                    case "x":
                    case "y":
                    case "z":
                    // uppercase
                    case "A":
                    case "B":
                    case "C":
                    case "D":
                    case "E":
                    case "F":
                    case "G":
                    case "H":
                    case "I":
                    case "J":
                    case "K":
                    case "L":
                    case "M":
                    case "N":
                    case "O":
                    case "P":
                    case "Q":
                    case "R":
                    case "S":
                    case "T":
                    case "U":
                    case "V":
                    case "W":
                    case "X":
                    case "Y":
                    case "Z":
                    // underscores
                    case "_":
                        this.buf += this.curChar;
                        this.curPos++;
                        this.state = s.IDENTIFIER_OR_KEYWORD;
                        break;
                    default:
                        this.curTokenType = tokens_1.TType.KeywordToken;
                        this.state = s.CREATE_TOKEN;
                }
                break;
            case s.IDENTIFIER_OR_KEYWORD:
                if (exports.KEYWORDS.includes(this.buf)) {
                    this.state = s.KEYWORD_MATCH;
                    break;
                }
                switch (this.curChar) {
                    // digits
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                    // lowecase
                    case "a":
                    case "b":
                    case "c":
                    case "d":
                    case "e":
                    case "f":
                    case "g":
                    case "h":
                    case "i":
                    case "j":
                    case "k":
                    case "l":
                    case "m":
                    case "n":
                    case "o":
                    case "p":
                    case "q":
                    case "r":
                    case "s":
                    case "t":
                    case "u":
                    case "v":
                    case "w":
                    case "x":
                    case "y":
                    case "z":
                    // uppercase
                    case "A":
                    case "B":
                    case "C":
                    case "D":
                    case "E":
                    case "F":
                    case "G":
                    case "H":
                    case "I":
                    case "J":
                    case "K":
                    case "L":
                    case "M":
                    case "N":
                    case "O":
                    case "P":
                    case "Q":
                    case "R":
                    case "S":
                    case "T":
                    case "U":
                    case "V":
                    case "W":
                    case "X":
                    case "Y":
                    case "Z":
                    // underscores
                    case "_":
                        this.buf += this.curChar;
                        this.curPos++;
                        break;
                    default:
                        this.curTokenType = tokens_1.TType.IdentifierToken;
                        this.state = s.CREATE_TOKEN;
                }
                break;
            case s.CREATE_TOKEN:
                if (this.curTokenStart === undefined || this.curTokenType === undefined) {
                    throw new Error("Current starting point was undefined or current token type was undefined");
                }
                this.tokens.push(new tokens_1.Token({
                    type: this.curTokenType,
                    origin: new Trace.SourceLine({
                        start: new Trace.SourcePoint({
                            char_num: this.curTokenStart + 1,
                            source: this.source
                        }),
                        length: this.curPos - this.curTokenStart
                    }),
                    value: this.buf
                }));
                this.reset_lexer();
                // dont increace the position because this is triggered by a state not having the correct character,
                // so the character should belong to the next token.
                break;
        }
    };
    Lexer.prototype.reset_lexer = function () {
        this.state = s.LOOKING;
        this.buf = "";
        this.curTokenStart = undefined; // nowhere
        this.curTokenType = undefined; // nothing
    };
    return Lexer;
}());
exports.Lexer = Lexer;
