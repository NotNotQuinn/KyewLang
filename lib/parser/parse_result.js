"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParseResult = /** @class */ (function () {
    function ParseResult(success, entryNode) {
        if (success === void 0) { success = true; }
        this.entryNode = entryNode;
        this.success = success;
    }
    return ParseResult;
}());
exports.default = ParseResult;
