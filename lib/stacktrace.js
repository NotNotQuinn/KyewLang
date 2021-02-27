"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceLine = exports.SourcePoint = exports.SourceText = exports.wordWrap = void 0;
require("colorts/lib/string");
// TODO make util file to put this in?
function wordWrap(s, w) { return s.replace(new RegExp("(?![^\\n]{1," + w + "}$)([^\\n]{1," + w + "})\\s", 'g'), '$1\n'); }
exports.wordWrap = wordWrap;
var SourceText = /** @class */ (function () {
    /**
     * Stores the text.
     * @param text The text to store
     */
    function SourceText(text, filename) {
        this.rawText = text;
        this.filename = filename;
    }
    SourceText.prototype.getLineNumberAt = function (char_num) {
        // no newline characters = first line.
        var line_number = 1;
        for (var curChar = 1; curChar < char_num; curChar++) {
            if (this.rawText[curChar - 1] == '\n') {
                line_number++;
            }
        }
        return line_number;
    };
    SourceText.prototype.getPointAt = function (char_num) {
        var line = 1, collumn = 1;
        for (var curChar = 1; curChar < char_num; curChar++) {
            if (this.rawText[curChar - 1] == '\n') {
                line++;
                collumn = 1;
            }
            collumn++;
        }
        return { line: line, collumn: collumn };
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
    function SourcePoint(obj) {
        if (obj.char_num !== undefined) {
            this.source = obj.source;
            var thing = obj.source.getPointAt(obj.char_num);
            this.line = thing.line;
            this.collumn = thing.collumn;
        }
        else {
            if (obj.line < 0)
                throw new Error("Line (" + obj.line + ") cannot be negative.");
            if (obj.collumn < 0)
                throw new Error("Collumn (" + obj.collumn + ") cannot be negative.");
            var lines = obj.source.rawText.split(/\r\n|\r|\n/);
            if (obj.line > lines.length)
                throw new Error("Line (" + obj.line + ") is outside of source length (" + lines.length + ").");
            if (lines[obj.line - 1].length < obj.collumn)
                throw new Error("Collumn (" + obj.collumn + ") is ouside of line length (" + lines.length + ").");
            this.line = obj.line;
            this.collumn = obj.collumn;
            this.source = obj.source;
        }
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
        else if (obj.from !== undefined && obj.line !== undefined && obj.source !== undefined) {
            if (obj.from + obj.length - 1 > obj.source.rawText.split('\n')[obj.line - 1].length)
                throw new Error("Captured line (" + obj.line + ") is outside of line length.");
            this.from = new SourcePoint({ line: obj.line, collumn: obj.from, source: obj.source });
        }
        else {
            throw new Error("typescript is broken, this should never happen. if it does.... Uhh, contact devs please lol");
        }
        if (obj.length <= 0)
            throw new Error("Length (" + obj.length + ") cannot be less than 1. Try using SourcePoint.");
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
        var _this = this;
        if (padding === void 0) { padding = 0; }
        // Dont wrap the code. only the error message
        var out = " ".repeat(padding) + this.getFullLine() + '\n';
        // TODO dynamic colors
        out += this.getArrows(padding).red + '\n';
        var lines = wordWrap(message, 80);
        lines.split('\n').forEach(function (line) {
            out += (_this.getWhitespace(padding) + (line)).yellow + '\n';
        });
        return out.substr(0, out.length - 1); // remove trailing newline
    };
    return SourceLine;
}());
exports.SourceLine = SourceLine;
