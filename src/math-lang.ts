import { Parser } from "./parser/parser";
import { Lexer } from "./lexer/lexer";
import { SyntaxToken } from "./custom/SyntaxToken";
import { SyntaxType } from "./custom/SyntaxType";

export type run_opts = {
    show_tokenized_code: boolean;
}

const defalt_run_opts: run_opts = {
    show_tokenized_code: false,

}

export function execute( code : string , options : run_opts = defalt_run_opts): any { 
    const lexer =  new Lexer(code)

    while (true) {
        let token: SyntaxToken = lexer.getToken();
        process.stdout.write(`${token.type}: '${token.text}'${token.value == null ? '' : ' ' + token.value}\n`)
        if (token.type == SyntaxType.EndOfFileToken)
            break;
    }
}
