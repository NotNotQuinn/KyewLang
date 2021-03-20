"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxType = void 0;
/**
 * Kinds of tokens or nodes
 */
var SyntaxType;
(function (SyntaxType) {
    // old
    SyntaxType["FloatToken"] = "FloatToken";
    SyntaxType["IdentifierToken"] = "IdentifierToken";
    SyntaxType["KeywordToken"] = "KeywordToken";
    SyntaxType["PunctuationToken"] = "PunctuationToken";
    // unused
    SyntaxType["PlusToken"] = "PlusToken";
    SyntaxType["MinusToken"] = "MinusToken";
    SyntaxType["AsteriskToken"] = "AsteriskToken";
    SyntaxType["ForwardSlashToken"] = "ForwardSlashToken";
    SyntaxType["BackSlashToken"] = "BackSlashToken";
    SyntaxType["OpenPerenthesisToken"] = "OpenPerenthesisToken";
    SyntaxType["ClosePerenthesisToken"] = "ClosePerenthesisToken";
    SyntaxType["NewlineToken"] = "NewlineToken";
    // new
    SyntaxType["IntToken"] = "IntToken";
    SyntaxType["BadToken"] = "BadToken";
    SyntaxType["WhitespaceToken"] = "WhitespaceToken";
    SyntaxType["EndOfFileToken"] = "EndOfFileToken";
})(SyntaxType = exports.SyntaxType || (exports.SyntaxType = {}));
