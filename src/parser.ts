import * as Tokens from "./tokens";
import ParseResult from "./parse_result"
import * as Nodes from "./nodes";


export class Parser {
    private tokens: IterableIterator<Tokens.BaseToken>;
    private current_token?:Tokens.BaseToken;
    constructor(tokens : IterableIterator<Tokens.BaseToken>) {
        this.tokens = tokens
        this.advance();
    }

    private advance() {
        var res = this.tokens.next();
        this.current_token = res.value;
        if (res.done) {
            this.current_token = undefined;
        }
    }

    public parse(): ParseResult {
        if(this.current_token == undefined) {
            return new ParseResult(true)
        }
        var result = this.expression();
        
        return new ParseResult(true, result)
    }

    private expression(): Nodes.BaseNode {
        var result: Nodes.BaseNode = this.term()
        while (this.current_token != undefined && 
        (this.current_token instanceof Tokens.PlusToken || this.current_token instanceof Tokens.MinusToken)) {
            if (this.current_token instanceof Tokens.PlusToken) {
                this.advance()
                result = new Nodes.AddNode(result, this.term())
            } else if (this.current_token instanceof Tokens.MinusToken) {
                this.advance()
                result = new Nodes.SubtractNode(result, this.term())
            }
        }
        return result;
    }

    private term(): Nodes.BaseNode {
        var result: Nodes.BaseNode = this.factor()
        if(this.current_token !instanceof Tokens.PlusToken || this.current_token !instanceof Tokens.MinusToken) {
            while (this.current_token != undefined && 
            (this.current_token instanceof Tokens.DivideToken || this.current_token instanceof Tokens.MultiplyToken)) {
                if (this.current_token instanceof Tokens.DivideToken) {
                    this.advance()
                    result = new Nodes.DivideNode(result, this.factor())
                } else if (this.current_token instanceof Tokens.MultiplyToken) {
                    this.advance()
                    result = new Nodes.MultiplyNode(result, this.factor())
                }
            }
            return result;
        } else {
            if(this.current_token instanceof Tokens.MinusToken) {
                this.advance();
                return new Nodes.NegativeNode(this.term())
            }
        }
        return result;
    }

    private factor() : Nodes.BaseNode {
        var token: Tokens.BaseToken | undefined = this.current_token

        if(token instanceof Tokens.IntToken ) {
            this.advance()
            return new Nodes.IntNode(token.value/*/token value will always be `number` on int and float/*/)
        } else if(token instanceof Tokens.FloatToken ) {
            this.advance()
            return new Nodes.FloatNode(token.value/*token value will always be `number` on int and float*/)
        } else if(token instanceof Tokens.LeftPerenthesisToken) {
            this.advance()
            var node = this.expression()
            if (token !instanceof Tokens.RightPerenthesisToken) {
                throw Error("Syntax error. Expected ')'")
            }
            this.advance()
            return node;
        } else {
            throw new Error("Syntax error, unexpected token")
        }
    }
}