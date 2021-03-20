import { validateLocaleAndSetLanguage } from "typescript";
import { BaseError, TraceableError } from "./errors/errors";
import { SourceLine, SourcePoint, SourceText } from "./trace/stacktrace";

/**
 * Kinds of tokens or nodes
 */
export enum SyntaxKind {
    // used
    IntToken                    =   "IntToken",
    FloatToken                  =   "FloatToken",
    IdentifierToken             =   "IdentifierToken",
    KeywordToken                =   "KeywordToken",
    PunctuationToken            =   "PunctuationToken",
    BadToken                    =   "BadToken",
    EndOfFileToken              =   "EndOfFileToken",

    // unused - can be changed and have no effect
    PlusToken                   =   "PlusToken",
    MinusToken                  =   "MinusToken",
    AsteriskToken               =   "AsteriskToken",
    ForwardSlashToken           =   "ForwardSlashToken",
    BackSlashToken              =   "BackSlashToken",
    OpenPerenthesisToken        =   "OpenPerenthesisToken",
    ClosePerenthesisToken       =   "ClosePerenthesisToken",
    NewlineToken                =   "NewlineToken",

}

/**
 * A token.
 */
export class SyntaxToken {
    kind: SyntaxKind;
    origin: number;
    value?: string;

    /**
     * 
     * @param obj Object containing information about the token being created.
     * @param obj.type The type of token being created
     * @param obj.origin The original text from source that created this token
     * @param obj.value A string value of the token, unparsed
     */
    constructor(obj: { kind: SyntaxKind; origin: number; length: number; value?: string }) {
        this.kind = obj.kind;
        this.origin = obj.origin;
        this.value = obj.value;
    }
}
