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
exports.Lexer = exports.KEYWORDS = void 0;
var lexer_state_1 = require("./lexer_state");
var tokens_1 = require("./tokens");
var Trace = __importStar(require("./stacktrace"));
// TODO move these keywords and operators to annother file?
// this file could get crouded if we keep them here
exports.KEYWORDS = [
    "if"
];
//*************************************************************************************************************** */
// This lexer is an implementation of a Fianite State Machine (FSM) -> can only be one of a finiate number of states
// If you want to learn more look up Fianite State Machine (or Fianite State Transducer, but thats all math shit) 
// on Wikipedia
//*************************************************************************************************************** */
var Lexer = /** @class */ (function () {
    /**
     * Lexes source into tokens
     * @param source Text to lex
     */
    function Lexer(source) {
        this.source = source;
        this.tokens = [];
        this.state = lexer_state_1.LexerState.LOOKING;
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
        while (this.state != lexer_state_1.LexerState.DONE) {
            this.lex_step();
        }
        return this;
    };
    /**
     * Lexes until a token is created.
     */
    Lexer.prototype.lex_one_token = function () {
        while (this.state !== lexer_state_1.LexerState.CREATE_TOKEN) {
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
            case lexer_state_1.LexerState.DONE:
                return;
            case lexer_state_1.LexerState.LOOKING:
                switch (this.curChar) {
                    case undefined:
                        this.state = lexer_state_1.LexerState.DONE;
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
                        this.state = lexer_state_1.LexerState.NUMBER;
                        this.buf += this.curChar;
                        this.curTokenStart = this.curPos;
                        this.curPos++;
                        break;
                    case " ":
                    case "\t":
                        console.log("whitespace");
                        this.curPos++;
                        // whitespace
                        break;
                    case "\n":
                        this.state = lexer_state_1.LexerState.CREATE_TOKEN;
                        this.curTokenStart = this.curPos;
                        this.curTokenType = tokens_1.TType.NewlineToken;
                        this.buf += this.curChar;
                        this.curPos++;
                        break;
                    case ";":
                        this.state = lexer_state_1.LexerState.CREATE_TOKEN;
                        this.curTokenStart = this.curPos;
                        this.curTokenType = tokens_1.TType.PunctuationToken;
                        this.buf += this.curChar;
                        this.curPos++;
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
                        this.state = lexer_state_1.LexerState.IDENTIFIER_OR_KEYWORD;
                        this.buf += this.curChar;
                        this.curTokenStart = this.curPos;
                        this.curPos++;
                        // dont add to buf because we arent handling yet
                        break;
                    // punctuation
                    case "(":
                    case ")": // order of operations
                    // operators
                    case "-":
                    case "+":
                    case "*":
                    case "/": // add, subtract, multiply, divide
                    case "%": // modulo operator 
                    case "^": // power
                        this.buf += this.curChar;
                        this.curTokenStart = this.curPos;
                        this.state = lexer_state_1.LexerState.PUNCTUATION_OR_OPERATOR;
                        this.curPos++;
                        break;
                    default:
                        console.log("Unknown character: '" + this.curChar + "'");
                        this.curPos++;
                }
                break;
            case lexer_state_1.LexerState.PUNCTUATION_OR_OPERATOR:
                // TODO make comments
                switch (this.curChar) {
                    default:
                        this.curTokenType = tokens_1.TType.PunctuationToken;
                        this.state = lexer_state_1.LexerState.CREATE_TOKEN;
                }
                break;
            case lexer_state_1.LexerState.NUMBER:
                switch (this.curChar) {
                    case ".":
                        this.state = lexer_state_1.LexerState.NUMBER_WITH_DECIMAL;
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
                        this.state = lexer_state_1.LexerState.CREATE_TOKEN;
                }
                break;
            case lexer_state_1.LexerState.NUMBER_WITH_DECIMAL:
                switch (this.curChar) {
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
                        this.state = lexer_state_1.LexerState.CREATE_TOKEN;
                }
                break;
            case lexer_state_1.LexerState.KEYWORD_MATCH:
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
                        this.state = lexer_state_1.LexerState.IDENTIFIER_OR_KEYWORD;
                        break;
                    default:
                        this.curTokenType = tokens_1.TType.KeywordToken;
                        this.state = lexer_state_1.LexerState.CREATE_TOKEN;
                }
                break;
            case lexer_state_1.LexerState.IDENTIFIER_OR_KEYWORD:
                if (exports.KEYWORDS.includes(this.buf)) {
                    this.state = lexer_state_1.LexerState.KEYWORD_MATCH;
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
                        this.state = lexer_state_1.LexerState.CREATE_TOKEN;
                }
                break;
            case lexer_state_1.LexerState.CREATE_TOKEN:
                if (this.curTokenStart === undefined || this.curTokenType === undefined) {
                    throw new Error("Current starting point was undefined or current token type was undefined");
                }
                this.tokens.push(new tokens_1.Token({
                    type: this.curTokenType,
                    origin: new Trace.SourceLine(new Trace.SourcePoint(this.curTokenStart + 1), this.curPos - this.curTokenStart, this.source),
                    value: this.buf
                }));
                this.reset_lexer();
                // dont increace the position because this is triggered by a state not having the correct character,
                // so the character should belong to the next token.
                break;
        }
    };
    Lexer.prototype.reset_lexer = function () {
        this.state = lexer_state_1.LexerState.LOOKING;
        this.buf = "";
        this.curTokenStart = undefined; // nowhere
        this.curTokenType = undefined; // nothing
    };
    return Lexer;
}());
exports.Lexer = Lexer;
