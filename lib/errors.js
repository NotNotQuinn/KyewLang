"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeViewError = exports.TraceableError = exports.BaseError = void 0;
var BaseError = /** @class */ (function () {
    function BaseError() {
    }
    BaseError.prototype.isError = function () {
        return typeof this._errorMessage == 'string';
    };
    BaseError.prototype.setErrorMessage = function (message) {
        if (this.isError()) {
            throw Error("Cannot re-assign error message ('" + this._errorMessage + "' to '" + message + "')");
        }
        this._errorMessage = message;
    };
    BaseError.prototype.getErrorMessage = function () {
        return this._errorMessage;
    };
    BaseError.prototype.getDisplayError = function () {
        return this._errorMessage || "";
    };
    return BaseError;
}());
exports.BaseError = BaseError;
var TraceableError = /** @class */ (function (_super) {
    __extends(TraceableError, _super);
    function TraceableError() {
        return _super.call(this) || this;
    }
    TraceableError.prototype.setTrace = function (message, codeSnippet) {
        this.setErrorMessage(message);
        this.setCodeSnippet(codeSnippet);
    };
    TraceableError.prototype.setCodeSnippet = function (codeSnippet) {
        if (this._codeSnippet != undefined) {
            throw Error("Cannot re-assign code snippet.");
        }
        this._codeSnippet = codeSnippet;
    };
    TraceableError.prototype.getCodeSnippet = function () {
        return this._codeSnippet;
    };
    TraceableError.prototype.getDisplayError = function (first, padding) {
        var _a, _b, _c, _d, _e;
        if (first === void 0) { first = true; }
        if (padding === void 0) { padding = 0; }
        var out = "";
        var next_padding = padding + 4;
        if (!first) {
            // the next_padding pads all the child errors with spaces, so child errors done need to pad, because it will already be padded.
            next_padding = 0;
            // add a new line because it looks nicer when a child isnt right below the parent
            out += '\n';
        }
        ;
        out += (
        // this is the filename. 
        // TODO use paths not filenames.
        (((_a = this._codeSnippet) === null || _a === void 0 ? void 0 : _a.from.source.filename) || "").cyan.bold +
            (
            // this adds ":line:col" to the filename, so you know where the error is. 
            "" + ":".grey + ((_b = this._codeSnippet) === null || _b === void 0 ? void 0 : _b.from.line.toString().yellow) + ":".grey + ((_c = this._codeSnippet) === null || _c === void 0 ? void 0 : _c.from.collumn.toString().yellow))) + " \n"; // end of the filename line.
        // This gets the display string for the code that generated the error, and indents it all by 2
        out += ((_d = this._codeSnippet) === null || _d === void 0 ? void 0 : _d.getDisplayWithArrows(this.getErrorMessage() || "<no error message>", 2)) + '\n';
        if (this.child)
            // if there is a child error, get ITS display string, and add it. 
            out += (_e = this.child) === null || _e === void 0 ? void 0 : _e.getDisplayError(false);
        // then add the padding to every line.
        var lines = out.split('\n');
        var new_lines = [];
        for (var i = 0; i < lines.length; i++) {
            // if padding is zero there still is none.
            if (lines[i] == "")
                continue;
            new_lines[i] = " ".repeat(next_padding) + lines[i];
        }
        // rejoin the lines
        out = lines.join('\n');
        // this is at the end to avoid padding
        // if we are the first error, display our error in bold and red at the top.
        if (first)
            out = ("Error: " + this.getErrorMessage() + "\n").red.bold + out;
        return out;
    };
    return TraceableError;
}(BaseError));
exports.TraceableError = TraceableError;
/*************************
 ERRORS TO RAISE
**************************/
// TODO seperate these errors to a different file, they really have nothing to do with eachother.
var NodeViewError = /** @class */ (function (_super) {
    __extends(NodeViewError, _super);
    function NodeViewError(message) {
        return _super.call(this, message) || this;
    }
    return NodeViewError;
}(Error));
exports.NodeViewError = NodeViewError;
