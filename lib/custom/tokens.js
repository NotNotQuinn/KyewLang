"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.TokenType = void 0;
/**
 * Token Types
 */
var TokenType;
(function (TokenType) {
    // used
    TokenType["IntToken"] = "IntToken";
    TokenType["FloatToken"] = "FloatToken";
    TokenType["IdentifierToken"] = "IdentifierToken";
    TokenType["KeywordToken"] = "KeywordToken";
    TokenType["PunctuationToken"] = "PunctuationToken";
    TokenType["EndOfFileToken"] = "EndOfFileToken";
    // unused - can be changed and have no effect
    TokenType["PlusToken"] = "PlusToken";
    TokenType["MinusToken"] = "MinusToken";
    TokenType["AsteriskToken"] = "AsteriskToken";
    TokenType["ForwardSlashToken"] = "ForwardSlashToken";
    TokenType["BackSlashToken"] = "BackSlashToken";
    TokenType["LeftPerenthesisToken"] = "LeftPerenthesisToken";
    TokenType["RightPerenthesisToken"] = "RightPerenthesisToken";
    TokenType["NewlineToken"] = "NewlineToken";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
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
