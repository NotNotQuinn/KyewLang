import { Token, TType } from "./tokens";
import ParseResult from "./parse_result"
import * as Nodes from "./nodes";


export class Parser {
    /*
    private tokens: IterableIterator<Token>;
    private current_token?:Token;
    constructor(tokens : IterableIterator<Token>) {
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
        while (this.current_token !== undefined && 
        (this.current_token.type === TType.PlusToken || this.current_token instanceof Token.MinusToken)) {
            if (this.current_token instanceof TType.PlusToken) {
                this.advance()
                result = new Nodes.AddNode(result, this.term())
            } else if (this.current_token instanceof Token.MinusToken) {
                this.advance()
                result = new Nodes.SubtractNode(result, this.term())
            }
        }
        return result;
    }

    private term(): Nodes.BaseNode {
        var result: Nodes.BaseNode = this.factor()
        if(this.current_token !instanceof Token.PlusToken || this.current_token !instanceof Token.MinusToken) {
            while (this.current_token !== undefined && 
            (this.current_token instanceof Token.DivideToken || this.current_token instanceof Token.MultiplyToken)) {
                if (this.current_token instanceof Token.DivideToken) {
                    this.advance()
                    result = new Nodes.DivideNode(result, this.factor())
                } else if (this.current_token instanceof Token.MultiplyToken) {
                    this.advance()
                    result = new Nodes.MultiplyNode(result, this.factor())
                }
            }
            return result;
        } else {
            if(this.current_token instanceof Token.MinusToken) {
                this.advance();
                return new Nodes.NegativeNode(this.term())
            }
        }
        return result;
    }

    private factor() : Nodes.BaseNode {
        var token: Token | undefined = this.current_token

        if(token instanceof Token.IntToken ) {
            this.advance()
            return new Nodes.IntNode(token.value/*token value will always be `number` on int and float*----/) // YO FIX THIS WHEN YOU UNCOMMENT
        } else if(token instanceof Token.FloatToke ) {
            this.advance()
            return new Nodes.FloatNode(token.value/*token value will always be `number` on int and float*----/) // YO FIX THIS WHEN YOU UNCOMMENT
        } else if(token instanceof Token) {
            this.advance()
            var node = this.expression()
            if (token !instanceof Token) {
                throw Error("Syntax error. Expected ')'")
            }
            this.advance()
            return node;
        } else {
            throw new Error("Syntax error, unexpected token")
        }
    }
    */
}