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
    SourceText.prototype.getLineNumberAt = function (character_number) {
        // no newline characters = first line.
        var line_number = 1;
        for (var curChar = 1; curChar < character_number; curChar++) {
            if (this.rawText[curChar - 1] == '\n') {
                line_number++;
            }
        }
        return line_number;
    };
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
        var lines = source.rawText.split(/\r\n|\r|\n/);
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
     * @param obj Object containing data about what line and what part of it you want to store
     * @param obj.start A SourcePoint of where the line starts
     * @param obj.from Collumn number of the starting point
     * @param obj.length Length of the line to capture
     * @param obj.source The raw text to reference
     */
    function SourceLine(obj) {
        if (obj.start instanceof SourcePoint) {
            this.from = obj.start;
            if (obj.start.collumn + obj.length - 1 > obj.start.getFullLine().length)
                throw new Error("Captured line (" + obj.line + ") is outside of line length.");
        }
        else if (obj.from != undefined && obj.line != undefined && obj.source != undefined) {
            if (obj.from + obj.length - 1 > obj.source.rawText.split('\n')[obj.line - 1].length)
                throw new Error("Captured line (" + obj.line + ") is outside of line length.");
            this.from = new SourcePoint(obj.line, obj.from, obj.source);
        }
        else {
            throw new Error("typescript is broken, this should never happen. if it does.... Uhh, contact devs please lol");
        }
        if (obj.length == 0)
            throw new Error("Length (" + obj.length + ") cannot be 0. Try using SourcePoint.");
        this.length = obj.length;
    }
    SourceLine.prototype.getLineCaptured = function () {
        var source = this.from.source;
        return this.getFullLine().substr(this.from.collumn, this.length);
    };
    SourceLine.prototype.getFullLine = function () {
        return this.from.getFullLine();
    };
    // can be public
    SourceLine.prototype.getArrows = function (padding) {
        if (padding === void 0) { padding = 0; }
        var arrows = "^".repeat(this.length);
        return this.getWhitespace(padding) + arrows;
    };
    // can be public
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
