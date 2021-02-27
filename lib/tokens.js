"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TType = void 0;
/**
 * Token Types
 */
var TType;
(function (TType) {
    // used
    TType["IntToken"] = "IntToken";
    TType["FloatToken"] = "FloatToken";
    TType["IdentifierToken"] = "IdentifierToken";
    TType["KeywordToken"] = "KeywordToken";
    // unused - can be changed and have no effect
    TType["PlusToken"] = "PlusToken";
    TType["MinusToken"] = "MinusToken";
    TType["AsteriskToken"] = "AsteriskToken";
    TType["ForwardSlashToken"] = "ForwardSlashToken";
    TType["BackSlashToken"] = "BackSlashToken";
    TType["LeftPerenthesisToken"] = "LeftPerenthesisToken";
    TType["RightPerenthesisToken"] = "RightPerenthesisToken";
    TType["NewlineToken"] = "NewlineToken";
})(TType = exports.TType || (exports.TType = {}));
/**
 * A lexical token.
 */
var Token = /** @class */ (function () {
    /**
     *
     * @param obj Object containing information about the token being created.
     * @param obj.type The type of token being created
     * @param obj.origin The original text from source that created this token
     * @param obj.value A string value of the token, unparsed
     */
    function Token(obj) {
        this.type = obj.type;
        this.origin = obj.origin;
        this.value = obj.value;
    }
    return Token;
}());
exports.Token = Token;
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
