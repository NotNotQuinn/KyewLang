import { Token, TokenType } from "./tokens";
import ParseResult from "./ParseResult"
import { MultiplyNode, NumberNode, AddNode, SubtractNode, DivideNode, BiOpNode, BaseNode, IntNode, FloatNode } from "./nodes";


export class Parser {
    tokens: IterableIterator<Token>;
    current_token:Token;
    constructor(tokens : IterableIterator<Token>) {
        this.tokens = tokens
        this.current_token = new Token(TokenType.NO_TOKEN, "If nimmy sees this VI VON ZULUL")
        this.advance();
    }
    advance() {
        var res = this.tokens.next();
        this.current_token = res.value;
        if (res.done) {
            this.current_token = new Token(TokenType.NO_TOKEN, "This token was generated after the parer parsed all the tokens.");
        }
    }
    parse(): ParseResult {
        if(this.current_token.type == TokenType.NO_TOKEN) {
            return new ParseResult(true, new BaseNode(), "No tokens to parse.");
        }
        var result = this.expression();
        
        return new ParseResult(true, result)
    }

    expression(): BaseNode {
        var result: BaseNode = this.term()
        while (this.current_token.type != TokenType.NO_TOKEN && 
        (this.current_token.type == TokenType.PLUS || this.current_token.type == TokenType.MINUS)) {
            if (this.current_token.type == TokenType.PLUS) {
                this.advance()
                result = new AddNode(result, this.term())
            } else if (this.current_token.type == TokenType.MINUS) {
                this.advance()
                result = new SubtractNode(result, this.term())
            }
        }
        return result;
    }

    term(): BaseNode {
        var result: BaseNode = this.factor()
        while (this.current_token.type != TokenType.NO_TOKEN && 
        (this.current_token.type == TokenType.DIVIDE || this.current_token.type == TokenType.MULTIPLY)) {
            if (this.current_token.type == TokenType.DIVIDE) {
                this.advance()
                result = new DivideNode(result, this.factor())
            } else if (this.current_token.type == TokenType.MULTIPLY) {
                this.advance()
                result = new MultiplyNode(result, this.factor())
            }
        }
        return result;
    }

    factor() : NumberNode {
        var token:Token = this.current_token

        if(token.type == TokenType.INT ) {
            this.advance()
            return new IntNode(token.value/* token value will always be `number` on int and float */)
        }
        if(token.type == TokenType.FLOAT ) {
            this.advance()
            return new FloatNode(token.value/* token value will always be `number` on int and float */)
        }

        // return this.raise_error("Invalid syntax.")
        throw new Error("Syntax error")
    }

    raise_error(message?:string): ParseResult {
        return new ParseResult(false, new BaseNode(), message)
    }
}