import * as Tokens from "./tokens";
import * as Trace from "./stacktrace";

const DIGITS: RegExp = /^(\d|\.)+$/;
const WHITESPACE: RegExp = /^(\n|\t| )+$/gi;
function convert_to_float(a:string): number { 
          
    // Type conversion 
    // of string to float 
    var floatValue : number = +(a); 
      
    // Return float value 
    return floatValue;  
}  

export class Lexer {
    source: Trace.SourceText;
    pos: number;
    currentChar?: string;

    constructor(source: Trace.SourceText) {
        this.source = source;
        this.pos = -1;
        this.advance()
    }

    advance() {
        this.pos++;
        this.currentChar = this.source.rawText[this.pos];
    }

    *make_tokens(): IterableIterator<Tokens.BaseToken> {
        // TODO look up lexer on wikipedia you idoit
        // a a real lexer goes forward until there is a 
        // space or something else you choose, then it 
        // will take all those characters and try to make 
        // a token, otherwise there will be an error.
        while (this.currentChar != undefined) {
            if( WHITESPACE.test(this.currentChar)) {
                // no token for whitespace
                this.advance()
            } else if( DIGITS.test(this.currentChar)) {
                yield this.generate_number()
            } else if( this.currentChar == '-' ) {
                yield new Tokens.MinusToken(); 
                this.advance();
            } else if( this.currentChar == '+' ) {
                yield new Tokens.PlusToken(); 
                this.advance();
            } else if( this.currentChar == '*' ) {
                yield new Tokens.MultiplyToken(); 
                this.advance();
            } else if( this.currentChar == '/' ) {
                yield new Tokens.DivideToken(); 
                this.advance();
            } else if( this.currentChar == '(' ) {
                yield new Tokens.LeftPerenthesisToken(); 
                this.advance();
            } else if( this.currentChar == ')' ) {
                yield new Tokens.RightPerenthesisToken(); 
                this.advance();
            } else {
                console.log("invalid character '" + this.currentChar + "' ")
                this.advance()
            }
        }
    }

    generate_number(): Tokens.BaseToken {
        let number_str : string | undefined="";
        if (number_str === undefined) {
            let out = new Tokens.BaseToken()
            //out.setTrace("Attempted to generate number token when current character is undefined.", new Trace.SourceLine(this.source.getLineNumberAt(this.pos), ))
            return out
        }
        let point_count = 0;
        while (this.currentChar != undefined && (DIGITS.test(this.currentChar) || this.currentChar == '.')) {
            if(this.currentChar == '.') {
                if (point_count > 0) {
                    break
                }
                point_count++;
                number_str += this.currentChar;
                this.advance()
            }
            if (DIGITS.test(this.currentChar)) {
                number_str += this.currentChar;
                this.advance()
            }
        } 
        if(number_str.startsWith('.')) number_str = "0" + number_str;
        if(number_str.endsWith('.')) {
            // TODO refactor the lexer, and parser to use and look for errors in tokens and nodes 
            throw new Error("Syntax error: Cannot end number with '.'")
        }

        if (point_count == 0) {
            // there was no floating point value
            return new Tokens.IntToken(convert_to_float(number_str))
        } else {
            return new Tokens.FloatToken(convert_to_float(number_str))
        }
    }
}
 