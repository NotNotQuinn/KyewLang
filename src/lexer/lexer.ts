import { LexerState as s, LexerState } from "./lexer_state";
import { Token, TType } from "../custom/tokens";
import * as Trace from "../custom/trace/stacktrace"; 

// TODO move these keywords and operators to annother file?
// this file could get crouded if we keep them here
export const KEYWORDS : Array<string> = [
    "if"
]

//*************************************************************************************************************** */
// This lexer is an implementation of a Fianite State Machine (FSM) -> can only be one of a finiate number of states
// If you want to learn more look up Fianite State Machine (or Fianite State Transducer, but thats all math shit) 
// on Wikipedia
//*************************************************************************************************************** */


export class Lexer {
    /** source text being lexed */
    public source: Trace.SourceText;
    /** list of processed tokens */
    public tokens: Array<Token>;

    /** Current character to process. */
    public get curChar() {   return this.source.rawText[this.curPos];   }
    /** Buffer of characters not yet put into a token. */
    public buf: string;
    /** current state (Fianite State Machine) */
    public state: LexerState;
    
    /** index of where the current token being processed started */
    public curTokenStart?: number;
    /** type of current token being processed */
    public curTokenType?: TType;
    /** index of current character */
    public curPos: number;

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
     * Lexes until all tokens have been processed.
     * @returns Current instance of lexer, so you can chain methods, 
     *          e.g. 
     *          * `lexer = new Lexer(source).lex_all()` 
     *          * `tokens = lexer.lex_all().tokens`
     */
    public lex_all(): Lexer {
        while(this.state != s.DONE) {
            this.lex_step()
        }
        return this;
    }
    /**
     * Lexes until a token is created.
     */
    public lex_one_token() {
        while(this.state !== s.CREATE_TOKEN) {
            this.lex_step()
        }
        // since we stop when we need to create a token, we need to step one more time to create it.
        this.lex_step()
    }

    /**
     * Lexes a single step, this could be a change in the position, or a change in state, or both.
     */
    public lex_step() {
        switch(this.state) {
            case s.DONE:
                return;

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

                    case " ": case "\t":
                        console.log("whitespace")
                        this.curPos++;
                        // whitespace
                    break;

                    case "\n":
                        this.state = s.CREATE_TOKEN;
                        this.curTokenStart = this.curPos;
                        this.curTokenType = TType.NewlineToken;
                        this.buf += this.curChar;
                        this.curPos++;
                    break;

                    case ";":
                        this.state = s.CREATE_TOKEN;
                        this.curTokenStart = this.curPos;
                        this.curTokenType = TType.PunctuationToken;
                        this.buf += this.curChar;
                        this.curPos++;
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

                    // punctuation
                    case "(": case ")":  // order of operations

                    // operators
                    case "-": case "+": case "*": case "/":  // add, subtract, multiply, divide
                    case "%":  // modulo operator 
                    case "^":  // power
                        this.buf += this.curChar;
                        this.curTokenStart = this.curPos;
                        this.state = s.PUNCTUATION_OR_OPERATOR;
                        this.curPos++;
                    break;

                    default:
                        console.log(`Unknown character: '${this.curChar}'`)
                        this.curPos++;

                }
            break;


            case s.PUNCTUATION_OR_OPERATOR:
                // TODO make comments
                switch(this.curChar) {

                    default:
                        this.curTokenType = TType.PunctuationToken;
                        this.state = s.CREATE_TOKEN;
                }
            break;



            case s.NUMBER:
                switch(this.curChar) {
                    case ".":
                        this.state = s.NUMBER_WITH_DECIMAL;
                        // dont break because this is still going to be added to the buffer
                        // @fallthrough
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
                    origin: new Trace.SourceLine( 
                        new Trace.SourcePoint(
                            this.curTokenStart + 1, /* add one because character at index 0 is the first character*/
                        ),
                        this.curPos - this.curTokenStart,
                        this.source
                    ),
                    value: this.buf
                }))
                this.reset_lexer()
                // dont increace the position because this is triggered by a state not having the correct character,
                // so the character should belong to the next token.
            break;


        }
    }

    private reset_lexer() {
        this.state = s.LOOKING;
        this.buf = "";
        this.curTokenStart = undefined;  // nowhere
        this.curTokenType = undefined;  // nothing
    }
}
 