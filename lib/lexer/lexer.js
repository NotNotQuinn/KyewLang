"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
var SyntaxToken_1 = require("../custom/SyntaxToken");
var SyntaxType_1 = require("../custom/SyntaxType");
var Lexer = /** @class */ (function () {
    function Lexer(text) {
        this.text = text;
        this.curPos = 0;
    }
    Object.defineProperty(Lexer.prototype, "curChar", {
        get: function () {
            if (this.curPos >= this.text.length)
                return '\0';
            return this.text[this.curPos];
        },
        enumerable: false,
        configurable: true
    });
    Lexer.prototype.Next = function () {
        this.curPos++;
    };
    Lexer.prototype.getToken = function () {
        // <numbers>
        // + - * / ( )
        // <whitespace>
        if (this.curPos >= this.text.length)
            return new SyntaxToken_1.SyntaxToken(SyntaxType_1.SyntaxType.EndOfFileToken, this.curPos, "\0", null);
        if (/\d/i.test(this.curChar)) {
            var start = this.curPos;
            while (/\d/i.test(this.curChar))
                this.Next();
            var length_1 = this.curPos - start;
            var text_1 = this.text.substr(start, length_1);
            var value = parseInt(text_1);
            if (Number.isNaN(value)) {
                value = null;
                // TODO some error shit
            }
            return new SyntaxToken_1.SyntaxToken(SyntaxType_1.SyntaxType.IntToken, start, text_1, value);
        }
        if (/[\t \n]/i.test(this.curChar)) {
            var start = this.curPos;
            while (/[\t \n]/i.test(this.curChar))
                this.Next();
            var length_2 = this.curPos - start;
            var text_2 = this.text.substr(start, length_2);
            var value = null;
            return new SyntaxToken_1.SyntaxToken(SyntaxType_1.SyntaxType.WhitespaceToken, start, text_2, value);
        }
        if (this.curChar == '(')
            return new SyntaxToken_1.SyntaxToken(SyntaxType_1.SyntaxType.OpenPerenthesisToken, this.curPos++, '(', null);
        else if (this.curChar == ')')
            return new SyntaxToken_1.SyntaxToken(SyntaxType_1.SyntaxType.ClosePerenthesisToken, this.curPos++, ')', null);
        else if (this.curChar == '+')
            return new SyntaxToken_1.SyntaxToken(SyntaxType_1.SyntaxType.PlusToken, this.curPos++, '+', null);
        else if (this.curChar == '-')
            return new SyntaxToken_1.SyntaxToken(SyntaxType_1.SyntaxType.MinusToken, this.curPos++, '-', null);
        else if (this.curChar == '*')
            return new SyntaxToken_1.SyntaxToken(SyntaxType_1.SyntaxType.AsteriskToken, this.curPos++, '*', null);
        else if (this.curChar == '/')
            return new SyntaxToken_1.SyntaxToken(SyntaxType_1.SyntaxType.ForwardSlashToken, this.curPos++, '/', null);
        var pos = this.curPos;
        var text = this.curChar;
        this.Next();
        return new SyntaxToken_1.SyntaxToken(SyntaxType_1.SyntaxType.BadToken, pos, text, null);
    };
    return Lexer;
}());
exports.Lexer = Lexer;
