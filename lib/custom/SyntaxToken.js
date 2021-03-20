"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxToken = void 0;
/**
 * A token.
 */
var SyntaxToken = /** @class */ (function () {
    function SyntaxToken(type, position, text, value) {
        this.type = type;
        this.position = position;
        this.text = text;
        this.value = value;
    }
    return SyntaxToken;
}());
exports.SyntaxToken = SyntaxToken;
