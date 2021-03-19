import { validateLocaleAndSetLanguage } from "typescript";
import { BaseError, TraceableError } from "./errors/errors";
import { SourceLine, SourcePoint, SourceText } from "./trace/stacktrace";

/**
 * Token Types
 */
export enum TokenType {
    // used
    IntToken                    =   "IntToken",
    FloatToken                  =   "FloatToken",
    IdentifierToken             =   "IdentifierToken",
    KeywordToken                =   "KeywordToken",
    PunctuationToken            =   "PunctuationToken",
    EndOfFileToken              =   "EndOfFileToken",

    // unused - can be changed and have no effect
    PlusToken                   =   "PlusToken",
    MinusToken                  =   "MinusToken",
    AsteriskToken               =   "AsteriskToken",
    ForwardSlashToken           =   "ForwardSlashToken",
    BackSlashToken              =   "BackSlashToken",
    LeftPerenthesisToken        =   "LeftPerenthesisToken",
    RightPerenthesisToken       =   "RightPerenthesisToken",
    NewlineToken                =   "NewlineToken",

}

/**
 * A lexical token.
 */
export class Token {
    type: TokenType;
    origin: SourceLine;
    value?: string;

    /**
     * 
     * @param obj Object containing information about the token being created.
     * @param obj.type The type of token being created
     * @param obj.origin The original text from source that created this token
     * @param obj.value A string value of the token, unparsed
     */
    constructor(obj: { type: TokenType; origin: SourceLine; value?: string }) {
        this.type = obj.type;
        this.origin = obj.origin;
        this.value = obj.value;
    }
}
