import { SyntaxToken } from "../custom/SyntaxToken";
import { SyntaxType } from "../custom/SyntaxType";
import * as Trace from "../custom/trace/stacktrace"; 

export class Lexer {
    /** source text being lexed */
    public readonly source: string;
    /** list of processed tokens */
    public tokens: Array<SyntaxToken>;

    /** Current character to process. */
    public get curChar() {   return this.source[this.curPos];   }

    /** index of where the current token being processed started */
    public curTokenStart?: number;
    /** type of current token being processed */
    public curTokenType?: SyntaxKind;
    /** index of current character */
    public curPos: number;

    /**
     * Lexes source into tokens
     * @param source Text to lex
     */
    constructor(source: string) {
        this.source = source;
        this.tokens = [];
        this.curPos = 0;
    }

    /**
     * Lexes until all tokens have been processed.
     * @returns Current instance of lexer, so you can chain methods, 
     *          e.g. 
     *          * `lexer = new Lexer(source).lex_all()` 
     *          * `tokens = lexer.lex_all().tokens`
     */
    public lex_all(): Lexer {

    }

    /**
     * Lexes until a token is created.
     */
    public lex_one_token(): SyntaxToken {

    }

    private reset_lexer() {
        this.curTokenStart = undefined;  // nowhere
        this.curTokenType = undefined;  // nothing
    }
}
 