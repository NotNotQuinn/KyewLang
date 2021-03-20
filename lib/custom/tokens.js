"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxToken = void 0;
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
