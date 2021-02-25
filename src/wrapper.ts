import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { SourceText } from "./stacktrace";
// import executor

export class LexParseAndExecuteWrapper {
    lexer: Lexer;
    parser: Parser;
    source: SourceText;
    constructor(rawText:string, filename:string) {
        // TODO refactor to use paths rather than needing to pass the LexParseAndExecuteWrapper a name and text
        // it could read the file. or we could do this in wherever the LexParseAndExecuteWrapper is used.
        this.source = new SourceText(rawText, filename)
        // TODO make lexer constructible without source text
        this.lexer = new Lexer(this.source);
        // TODO make parser constructible without tokens
        this.parser = new Parser(this.lexer.make_tokens())
    }
}