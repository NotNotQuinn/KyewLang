/**
 * Kinds of tokens or nodes
 */
export enum SyntaxType {
    // old
    FloatToken = "FloatToken",
    IdentifierToken = "IdentifierToken",
    KeywordToken = "KeywordToken",
    PunctuationToken = "PunctuationToken",

    // unused
    PlusToken = "PlusToken",
    MinusToken = "MinusToken",
    AsteriskToken = "AsteriskToken",
    ForwardSlashToken = "ForwardSlashToken",
    BackSlashToken = "BackSlashToken",
    OpenPerenthesisToken = "OpenPerenthesisToken",
    ClosePerenthesisToken = "ClosePerenthesisToken",
    NewlineToken = "NewlineToken",

    // new
    IntToken = "IntToken",
    BadToken = "BadToken",
    WhitespaceToken = "WhitespaceToken",
    EndOfFileToken = "EndOfFileToken",

}
