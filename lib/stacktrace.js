"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceLine = exports.SourcePoint = exports.SourceText = void 0;
require("colorts/lib/string");
var SourceText = /** @class */ (function () {
    /**
     * Stores the text.
     * @param text The text to store
     */
    function SourceText(text, filename) {
        this.rawText = text;
        this.filename = filename;
    }
    return SourceText;
}());
exports.SourceText = SourceText;
var SourcePoint = /** @class */ (function () {
    /**
     * Stores a location in a text.
     * @param line The line number of the point.
     * @param collumn The collumn number of the point.
     * @param source The raw text to reference.
     */
    function SourcePoint(line, collumn, source) {
        if (line < 0)
            throw new Error("Line (" + line + ") cannot be negative.");
        if (collumn < 0)
            throw new Error("Collumn (" + collumn + ") cannot be negative.");
        var lines = source.rawText.split('\n');
        if (line > lines.length)
            throw new Error("Line (" + line + ") is outside of source length (" + lines.length + ").");
        if (lines[line - 1].length < collumn)
            throw new Error("Collumn (" + collumn + ") is ouside of line length (" + lines.length + ").");
        this.line = line;
        this.collumn = collumn;
        this.source = source;
    }
    SourcePoint.prototype.getFullLine = function () {
        return this.source.rawText.split('\n')[this.line - 1];
    };
    return SourcePoint;
}());
exports.SourcePoint = SourcePoint;
var SourceLine = /** @class */ (function () {
    /**
     * Stores a part of a line in a text.
     * @param line Line number referenced
     * @param from Collumn number of the starting point
     * @param length Length of the line to capture
     * @param source The raw text to reference
     */
    function SourceLine(line, from, length, source) {
        if (length == 0)
            throw new Error("Length (" + length + ") cannot be 0. Try using SourcePoint.");
        if (from + length > source.rawText.split('\n')[line - 1].length)
            throw new Error("Captured line (" + line + ") is outside of line length.");
        this.from = new SourcePoint(line, from, source);
        this.length = length;
    }
    SourceLine.prototype.getLineCaptured = function () {
        var source = this.from.source;
        return this.getFullLine().substr(this.from.collumn, this.length);
    };
    SourceLine.prototype.getFullLine = function () {
        return this.from.getFullLine();
    };
    SourceLine.prototype.getArrows = function (padding) {
        if (padding === void 0) { padding = 0; }
        var arrows = "^".repeat(this.length);
        return this.getWhitespace(padding) + arrows;
    };
    SourceLine.prototype.getWhitespace = function (padding) {
        if (padding === void 0) { padding = 0; }
        return " ".repeat(padding) + " ".repeat((this.from.collumn ? this.from.collumn : 1) - 1);
    };
    SourceLine.prototype.getDisplayWithArrows = function (message, padding) {
        if (padding === void 0) { padding = 0; }
        var out = " ".repeat(padding) + this.getFullLine() + '\n';
        // TODO dynamic colors
        out += this.getArrows(padding).red + '\n';
        out += (this.getWhitespace(padding) + (message)).yellow;
        return out;
    };
    return SourceLine;
}());
exports.SourceLine = SourceLine;
