import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { SourceText } from "./stacktrace";
// import executor

export class LexParseAndExecuteWrapper {
    lexer: Lexer;
    parser: Parser;
    source: SourceText;
    constructor(rawText:string) {
        this.source = new SourceText(rawText)
        // TODO make lexer constructible without source text
        this.lexer = new Lexer(this.source);
        // TODO make parser constructible without tokens
        this.parser = new Parser(this.lexer.make_tokens())
    }
}