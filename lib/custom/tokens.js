"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxToken = exports.SyntaxKind = void 0;
/**
 * Kinds of tokens or nodes
 */
var SyntaxKind;
(function (SyntaxKind) {
    // used
    SyntaxKind["IntToken"] = "IntToken";
    SyntaxKind["FloatToken"] = "FloatToken";
    SyntaxKind["IdentifierToken"] = "IdentifierToken";
    SyntaxKind["KeywordToken"] = "KeywordToken";
    SyntaxKind["PunctuationToken"] = "PunctuationToken";
    SyntaxKind["BadToken"] = "BadToken";
    SyntaxKind["EndOfFileToken"] = "EndOfFileToken";
    // unused - can be changed and have no effect
    SyntaxKind["PlusToken"] = "PlusToken";
    SyntaxKind["MinusToken"] = "MinusToken";
    SyntaxKind["AsteriskToken"] = "AsteriskToken";
    SyntaxKind["ForwardSlashToken"] = "ForwardSlashToken";
    SyntaxKind["BackSlashToken"] = "BackSlashToken";
    SyntaxKind["OpenPerenthesisToken"] = "OpenPerenthesisToken";
    SyntaxKind["ClosePerenthesisToken"] = "ClosePerenthesisToken";
    SyntaxKind["NewlineToken"] = "NewlineToken";
})(SyntaxKind = exports.SyntaxKind || (exports.SyntaxKind = {}));
/**
 * A token.
 */
var SyntaxToken = /** @class */ (function () {
    /**
     *
     * @param obj Object containing information about the token being created.
     * @param obj.type The type of token being created
     * @param obj.origin The original text from source that created this token
     * @param obj.value A string value of the token, unparsed
     */
    function SyntaxToken(obj) {
        this.kind = obj.kind;
        this.origin = obj.origin;
        this.value = obj.value;
    }
    return SyntaxToken;
}());
exports.SyntaxToken = SyntaxToken;
