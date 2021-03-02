export enum LexerState {
    // states = themeselves so I can read what state it is when its printed to the console.

    /** Default state, buffer is clear. */
    LOOKING="LOOKING",


    /** Clear the buffer and register a token, next state is always `LOOKING`. */
    CREATE_TOKEN="CREATE_TOKEN",

    /** Currently processing a number. */
    NUMBER="NUMBER",
    /** Currently processing a number with a decimal. */
    NUMBER_WITH_DECIMAL="NUMBER_WITH_DECIMAL",

    /** Currently processing an identifier or keyword. */
    IDENTIFIER_OR_KEYWORD="IDENTIFIER_OR_KEYWORD",
    /** A keyword matches this string exactly, but it could also go on further. */
    KEYWORD_MATCH="KEYWORD_MATCH",

    /** Currently processing an operator or a punctuator. */
    PUNCTUATION_OR_OPERATOR="PUNCTUATION_OR_OPERATOR",
    /** An operator matches this string exatly, but could go on further, e.g. `=` vs. `==` */
    OPERATOR_MATCH="OPERATOR_MATCH",
    

    /** Lexer has processed all tokens, this is the final state. */
    DONE="DONE",
}
