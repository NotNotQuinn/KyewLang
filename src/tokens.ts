export enum TokenType {
    INT="INT",
    FLOAT="FLOAT",
    PLUS="PLUS",
    MINUS="MINUS",
    MULTIPLY="MULTIPLY",
    DIVIDE="DIVIDE",
    L_PARENTHESIS="L_PARENTHESIS",
    R_PARENTHESIS="R_PARENTHESIS",
    NEWLINE="NEWLINE",


    // meta
    ERROR="ERROR",
    NO_TOKEN="NO_TOKEN",
}

export class Token {
    type: TokenType;
    value: any;

    constructor(type: TokenType, value?: any) {
        this.type = type;
        this.value = value;
    }
}
