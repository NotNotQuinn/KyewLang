import { SyntaxToken } from "../custom/SyntaxToken";
import { SyntaxType } from "../custom/SyntaxType";
import ParseResult from "./parse_result"
import * as Nodes from "../custom/nodes";
import { ParserState as s, ParserState} from "./parser_state";



export class Parser {
    public state: ParserState=s.DONE;
    public input_tokens: Array<SyntaxToken>=[];
    public get curToken(): SyntaxToken {
        return this.input_tokens[this.curPos]
    };
    public curPos=0;
    constructor(tokens ?: Array<SyntaxToken>) {
        if (tokens !== undefined) 
            this.input_tokens = tokens;
    }

    public parse(node: Nodes.BaseNode = new Nodes.BaseNode) {
        switch(this.curToken) {
            case undefined:
                this.state = s.DONE;
        }
    }
}
