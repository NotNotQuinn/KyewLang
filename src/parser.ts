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
            return new ParseResult(true, new Nodes.BaseNode(), "No tokens to parse.");
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
    }

    private factor() : Nodes.ValueNode<number> {
        var token: Tokens.BaseToken | undefined = this.current_token

        if(token instanceof Tokens.IntToken ) {
            this.advance()
            return new Nodes.IntNode(token.value/* token value will always be `number` on int and float */)
        }
        if(token instanceof Tokens.FloatToken ) {
            this.advance()
            return new Nodes.FloatNode(token.value/* token value will always be `number` on int and float */)
        }
        throw new Error("Syntax error")
    }
}