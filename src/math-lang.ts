import { Parser } from "./parser/parser";
import { Lexer } from "./lexer/lexer";
import ParseResult from "./parser/parse_result";
import * as Trace from "./custom/trace/stacktrace";

export type run_opts = {
    show_tokenized_code: boolean;
}

const defalt_run_opts: run_opts = {
    show_tokenized_code: false,

}

export function execute( code : string , options : run_opts = defalt_run_opts): any {
    const source = new Trace.SourceText(code, "<program>") 
    const lexer =  new Lexer(source)
    return lexer.lex_all().tokens
}
