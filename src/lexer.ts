import * as Tokens from "./tokens";

const DIGITS: RegExp = /^(\d|\.)+$/;
const WHITESPACE: RegExp = /^(\n|\t| )+$/gi;

function convert_to_float(a:string): number { 
          
    // Type conversion 
    // of string to float 
    var floatValue = +(a); 
      
    // Return float value 
    return floatValue;  
}  

export class Lexer {
    rawText: string;
    pos: number;
    currentChar: string;

    constructor(rawText: string) {
        this.rawText = rawText;
        this.pos = -1;
        this.currentChar = "";
        this.advance()
    }

    advance() {
        this.pos++;
        this.currentChar = this.rawText[this.pos];
    }

    *make_tokens(): IterableIterator<Tokens.BaseToken> {
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

    generate_number() {
        let number_str = this.currentChar;
        this.advance()
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
            // TODO change tokens to hold metadata, stack pointers, and error data
            // return new Token(TokenType.ERROR, "Syntax error: Cannot end number with '.'");
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
 