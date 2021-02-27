import { Parser } from "./parser";
import { Lexer } from "./lexer";
import ParseResult from "./parse_result";
import * as Trace from "./stacktrace"

export type run_opts = {
    show_tokenized_code: boolean;
}

const defalt_run_opts: run_opts = {
    show_tokenized_code: false,

}

export function execute( code : string , options : run_opts = defalt_run_opts): any {
    const source = new Trace.SourceText(code, "<program>") 
    const lexer =  new Lexer(source)
    lexer.lex()
    return lexer.tokens
    
    /*
    
    const lexer = new Lexer(new Trace.SourceText(code, "<program>"))
    const tokens = lexer.make_tokens()
    if(options.show_tokenized_code) {
        console.log(tokens)
    }
    const parser = new Parser(tokens)
    var result : ParseResult = parser.parse()
    return result.entryNode?.visit();

    */
}
