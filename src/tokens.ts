import { validateLocaleAndSetLanguage } from "typescript";
import { BaseError, TraceableError } from "./errors";
import { SourceLine, SourcePoint, SourceText } from "./stacktrace";

/**
 * Token Types
 */
export enum TType {
    // used
    IntToken="IntToken",
    FloatToken="FloatToken",
    IdentifierToken="IdentifierToken",
    KeywordToken="KeywordToken",
    PunctuationToken="PunctuationToken",

    // unused - can be changed and have no effect
    PlusToken="PlusToken",
    MinusToken="MinusToken",
    AsteriskToken="AsteriskToken",
    ForwardSlashToken="ForwardSlashToken",
    BackSlashToken="BackSlashToken",
    LeftPerenthesisToken="LeftPerenthesisToken",
    RightPerenthesisToken="RightPerenthesisToken",
    NewlineToken="NewlineToken",

}

/**
 * A lexical token.
 */
export class Token {
    type: TType;
    origin: SourceLine;
    value?: string;

    /**
     * 
     * @param obj Object containing information about the token being created.
     * @param obj.type The type of token being created
     * @param obj.origin The original text from source that created this token
     * @param obj.value A string value of the token, unparsed
     */
    constructor(obj: { type: TType; origin: SourceLine; value?: string }) {
        this.type = obj.type;
        this.origin = obj.origin;
        this.value = obj.value;
    }
}


// TODO put this somewhere else
/*
EXAMPLE HOW TO CREATE TOKEN:
```js
var token = new Token({
    // TType =  TokenType
    type: TType.IdentifierToken, 
    origin: new SourceLine({
        // This object is created when the token is created
        // because it points to the specific place where 
        // the token came from

        start: new SourcePoint({
            // This object is also created when the token is created
            char_num:1,

            // The SourceText object is the only thing that is created before the token is
            source: new SourceText("lol", "lol.txt")
        }), 
        length: 3
    }),

    // optional for some token types because
    // this is an identifier token the text 
    // that the identifier IS is stored here.
    value: "lol"
})
```
*/