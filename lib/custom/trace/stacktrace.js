"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceLine = exports.SourcePoint = exports.Segment = exports.SourceText = exports.wordWrap = void 0;
require("colorts/lib/string");
// TODO make util file to put this in?
function wordWrap(s, w) { return s.replace(new RegExp("(?![^\\n]{1," + w + "}$)([^\\n]{1," + w + "})\\s", 'g'), '$1\n'); }
exports.wordWrap = wordWrap;
var SourceText = /** @class */ (function () {
    /**
     * Stores the text.
     * @param text The text to store
     * @param filename Filename of source
     */
    function SourceText(text, filename) {
        this.rawText = text;
        this.filename = filename;
    }
    SourceText.prototype.getPointAt = function (point) {
        var line = 1, collumn = 0;
        for (var curChar = 1; curChar < point.char_num; curChar++) {
            if (this.rawText[curChar - 1] == '\n') {
                line++;
                collumn = 0;
            }
            collumn++;
        }
        return { line: line, collumn: collumn };
    };
    SourceText.prototype.getFullLine = function (point) {
        var lines = this.rawText.split('\n');
        var line = this.getPointAt(point).line;
        var out = lines[line - 1];
        // because split removes the newline character, and we want to get the entire line, we will add the newline character to the end, if its not the last line.
        if (line - 1 !== lines.length) {
            out += '\n';
        }
        return out;
    };
    return SourceText;
}());
exports.SourceText = SourceText;
/**
 * Stores the location of a segment of text
 */
var Segment = /** @class */ (function () {
    /**
     * @param start The character number of the start.
     * @param end The character number of the end.
     */
    function Segment(start, end) {
        this.start = start;
        this.end = end;
    }
    return Segment;
}());
exports.Segment = Segment;
var SourcePoint = /** @class */ (function () {
    /**
     * Stores a location in a text.
     */
    function SourcePoint(char_num) {
        this.char_num = char_num;
    }
    return SourcePoint;
}());
exports.SourcePoint = SourcePoint;
var SourceLine = /** @class */ (function () {
    /**
     * Stores a part of a line in a text.
     * @param start A SourcePoint of where the line starts
     * @param length Length of the line to capture
     * @param source The raw text to reference
     */
    function SourceLine(start, length, source) {
        if (length <= 0) {
            throw new Error("Length (" + length + ") cannot be less than 1. Try using SourcePoint.");
        }
        this.length = length;
        this.start = start;
        if (source.getPointAt(start).collumn + length - 1 > source.getFullLine(start).length) {
            throw new Error("Captured line (" + source.getPointAt(start).line + ") is outside of line length.");
        }
    }
    SourceLine.prototype.getLineCaptured = function (source) {
        return this.getFullLine(source).substr(source.getPointAt(this.start).collumn, this.length);
    };
    SourceLine.prototype.getFullLine = function (source) {
        return source.getFullLine(this.start);
    };
    // can be public
    SourceLine.prototype.getArrows = function (source, padding) {
        if (padding === void 0) { padding = 0; }
        var arrows = "^".repeat(this.length);
        return this.getWhitespace(source, padding) + arrows;
    };
    // can be public
    SourceLine.prototype.getWhitespace = function (source, padding) {
        if (padding === void 0) { padding = 0; }
        return " ".repeat(padding) + " ".repeat((source.getPointAt(this.start).collumn ? source.getPointAt(this.start).collumn : 1) - 1);
    };
    SourceLine.prototype.getDisplayWithArrows = function (source, message, padding) {
        var _this = this;
        if (padding === void 0) { padding = 0; }
        // Dont wrap the code. only the error message
        var out = " ".repeat(padding) + this.getFullLine(source).replace("\n", "") + '\n';
        // TODO dynamic colors
        out += this.getArrows(source, padding).red + '\n';
        var lines = wordWrap(message, 80);
        lines.split('\n').forEach(function (line) {
            out += (_this.getWhitespace(source, padding) + (line)).yellow + '\n';
        });
        return out.substr(0, out.length - 1); // remove trailing newline
    };
    return SourceLine;
}());
exports.SourceLine = SourceLine;
