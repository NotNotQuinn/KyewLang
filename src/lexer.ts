import { Token, TType } from "./tokens";
import * as Trace from "./stacktrace"; 

// TODO move these keywords and operators to annother file?
// this file could get crouded if we keep them here
export const KEYWORDS : Array<string> = [
    "if"
]

export const OPERATORS : Array<string> = [
    "+",
    "-",
    "*",
    "/",
    "%",
]

//*************************************************************************************************************** */
// This lexer is an implementation of a Fianite State Machine (FSM) -> can only be one of a finiate number of states
// If you want to learn more look up Fianite State Machine on Wikipedia
//*************************************************************************************************************** */

export enum LexerState {
    /** default state, buffer is clear */
    LOOKING="LOOKING",


    /** clearing the buffer and registering a token, next state is always LOOKING */
    CREATE_TOKEN="CREATE_TOKEN",

    /** currently processing a number */
    NUMBER="NUMBER",
    /** currently processing a number with a decimal */
    NUMBER_WITH_DECIMAL="NUMBER_WITH_DECIMAL",

    /** An identifier or keyword */
    IDENTIFIER_OR_KEYWORD="IDENTIFIER_OR_KEYWORD",
    /** a keyword matches this string exactly, but it could also go on further */
    KEYWORD_MATCH="KEYWORD_MATCH",

    /** currently processing an operator or a punctuator */
    PUNCTUATION_OR_OPERATOR="PUNCTUATION_OR_OPERATOR",
    /** an operator matches,  */
    OPERATOR_MATCH="OPERATOR_MATCH",
    

    /** lexer has processed all tokens, this is the final state */
    DONE="DONE",
}
const s =  LexerState;
export class Lexer {
    /** source text being lexed */
    source: Trace.SourceText;
    /** list of processed tokens */
    tokens: Array<Token>;

    /** current character to process */
    private get curChar() {   return this.source.rawText[this.curPos];   }
    /** buffer of characters not yet put into a token */
    private buf: string;
    /** current state (Fianite State Machine) */
    private state: LexerState;
    
    /** index of where the current token being processed started */
    private curTokenStart?: number;
    /** type of current token being processed */
    private curTokenType?: TType;
    /** index of current character */
    private curPos: number;

    /**
     * Lexes source into tokens
     * @param source Text to lex
     */
    constructor(source: Trace.SourceText) {
        this.source = source;
        this.tokens = [];
        this.state = s.LOOKING;
        this.buf = "";
        this.curPos = 0;
    }

    /**
     * Lex source into tokens, and store in Lexer.tokens
     * @returns Current instance of lexer, so you can chain methods, 
     *          e.g. 
     *          * `lexer = new Lexer(source).lex()` 
     *          * `tokens = lexer.lex().tokens`
     */
    lex(): Lexer {
        while(this.state != s.DONE) {
            switch(this.state) {


                case s.LOOKING:
                    switch(this.curChar) {
                        case undefined:
                            this.state = s.DONE;
                        break;
                        // digits
                        case "0": case "1": case "2": case "3": case "4": 
                        case "5": case "6": case "7": case "8": case "9":
                            console.log("number found")
                            this.state = s.NUMBER;
                            this.buf += this.curChar;
                            this.curTokenStart = this.curPos;
                            this.curPos++;
                        break;
                        case " ": case "\t": case "\n":
                            this.curPos++;
                            console.log("whitespace")
                            // whitespace
                        break;
                        // lowecase
                        case "a": case "b": case "c": case "d": case "e": case "f": 
                        case "g": case "h": case "i": case "j": case "k": case "l": 
                        case "m": case "n": case "o": case "p": case "q": case "r": 
                        case "s": case "t": case "u": case "v": case "w": case "x": 
                        case "y": case "z":
                        // uppercase
                        case "A": case "B": case "C": case "D": case "E": case "F":
                        case "G": case "H": case "I": case "J": case "K": case "L": 
                        case "M": case "N": case "O": case "P": case "Q": case "R": 
                        case "S": case "T": case "U": case "V": case "W": case "X": 
                        case "Y": case "Z":
                        // underscores
                        case "_": 
                            // this could be a keyword or an indentifier
                            console.log("Identifier or keyword")
                            this.state = s.IDENTIFIER_OR_KEYWORD;
                            this.buf += this.curChar;
                            this.curTokenStart = this.curPos;
                            this.curPos++;
                            // dont add to buf because we arent handling yet
                        break;
                        case "(": case ")":  // order of operations
                        case "-": case "+": case "*": case "/":  // add, subtract, multiply, divide
                        case "%":  // modulas 
                        case "^":  // power
                            this.buf += this.curChar;
                            this.state = s.PUNCTUATION_OR_OPERATOR;
                        break;
                        default:
                            console.log(`Unknown character: ${this.curChar}`)
                            this.curPos++;
                    }
                break;


                case s.PUNCTUATION_OR_OPERATOR:
                    if(OPERATORS.includes(this.buf)) {
                        this.state = s.OPERATOR_MATCH
                        break;
                    }
                    switch(this.curChar) {

                    }
                break;


                case s.OPERATOR_MATCH:
                    switch(this.curChar) {

                    }
                break;


                case s.NUMBER:
                    switch(this.curChar) {
                        case ".":
                            this.state = s.NUMBER_WITH_DECIMAL;
                            // dont break because this is still going to be added to the buffer
                        case "0": case "1": case "2": case "3": case "4":
                        case "5": case "6": case "7": case "8": case "9":
                            this.buf += this.curChar;
                            this.curPos++;
                        break;
                        default:
                            this.curTokenType = TType.IntToken;
                            this.state = s.CREATE_TOKEN;
                    }
                break;


                case s.NUMBER_WITH_DECIMAL:
                    switch(this.curChar) {
                        case ".":
                            this.state = s.CREATE_TOKEN;
                            // dont break because this is still going to be added to the buffer
                        case "0": case "1": case "2": case "3": case "4":
                        case "5": case "6": case "7": case "8": case "9":
                            this.buf += this.curChar;
                            this.curPos++;
                        break;
                        default:
                            this.curTokenType = TType.FloatToken;
                            this.state = s.CREATE_TOKEN;
                    }
                break;


                case s.KEYWORD_MATCH:
                    switch(this.curChar) {
                        // digits
                        case "0": case "1": case "2": case "3": case "4": 
                        case "5": case "6": case "7": case "8": case "9":
                        // lowecase
                        case "a": case "b": case "c": case "d": case "e": case "f": 
                        case "g": case "h": case "i": case "j": case "k": case "l": 
                        case "m": case "n": case "o": case "p": case "q": case "r": 
                        case "s": case "t": case "u": case "v": case "w": case "x": 
                        case "y": case "z":
                        // uppercase
                        case "A": case "B": case "C": case "D": case "E": case "F":
                        case "G": case "H": case "I": case "J": case "K": case "L": 
                        case "M": case "N": case "O": case "P": case "Q": case "R": 
                        case "S": case "T": case "U": case "V": case "W": case "X": 
                        case "Y": case "Z":
                        // underscores
                        case "_":
                            this.buf += this.curChar;
                            this.curPos++;
                            this.state = s.IDENTIFIER_OR_KEYWORD;
                        break;
                        default:
                            this.curTokenType = TType.KeywordToken;
                            this.state = s.CREATE_TOKEN;
                    }
                break;
                
                
                case s.IDENTIFIER_OR_KEYWORD:
                    if(KEYWORDS.includes(this.buf)) {
                        this.state = s.KEYWORD_MATCH
                        break;
                    }
                    switch(this.curChar) {
                        // digits
                        case "0": case "1": case "2": case "3": case "4": 
                        case "5": case "6": case "7": case "8": case "9":
                        // lowecase
                        case "a": case "b": case "c": case "d": case "e": case "f": 
                        case "g": case "h": case "i": case "j": case "k": case "l": 
                        case "m": case "n": case "o": case "p": case "q": case "r": 
                        case "s": case "t": case "u": case "v": case "w": case "x": 
                        case "y": case "z":
                        // uppercase
                        case "A": case "B": case "C": case "D": case "E": case "F":
                        case "G": case "H": case "I": case "J": case "K": case "L": 
                        case "M": case "N": case "O": case "P": case "Q": case "R": 
                        case "S": case "T": case "U": case "V": case "W": case "X": 
                        case "Y": case "Z":
                        // underscores
                        case "_":
                            this.buf += this.curChar;
                            this.curPos++;
                        break;
                        default:
                            this.curTokenType = TType.IdentifierToken;
                            this.state = s.CREATE_TOKEN;
                    }
                break;


                case s.CREATE_TOKEN:
                    if (this.curTokenStart === undefined || this.curTokenType === undefined) {
                        throw new Error("Current starting point was undefined or current token type was undefined")
                    }
                    this.tokens.push(new Token({
                        type: this.curTokenType,
                        origin: new Trace.SourceLine({
                            start: new Trace.SourcePoint({
                                char_num: this.curTokenStart + 1, // add one becase curTokenStart is an index, and this is a number
                                source: this.source
                            }),
                            length: this.curPos - this.curTokenStart
                        }),
                        value: this.buf
                    }))
                    this.reset_lexer()
                    // dont increace the position because this is triggered by a state not having the correct character,
                    // so the character should belong to the next token.
                break;


            }
        }
        return this;
    }
    private reset_lexer() {
        this.state = s.LOOKING;
        this.buf = "";
        this.curTokenStart = undefined;  // nowhere
        this.curTokenType = undefined;  // nothing
    }
}
 