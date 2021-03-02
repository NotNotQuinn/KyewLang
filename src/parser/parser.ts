import { Token, TType } from "../custom/tokens";
import ParseResult from "./parse_result"
import * as Nodes from "../custom/nodes";
import { ParserState as s, ParserState} from "./parser_state";



export class Parser {
    public state: ParserState=s.DONE;
    public input_tokens: Array<Token>=[];
    public get curToken(): Token {
        return this.input_tokens[this.curPos]
    };
    public curPos;
    constructor(tokens ?: Array<Token>) {
        if (tokens !== undefined) 
            this.input_tokens = tokens;

        this.curPos = 0;

    }

    public parse() {
        if(this.curToken == undefined) {
            return new ParseResult(true)
        }
        
    }
}