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
    function BaseError(message) {
        this.errorMessage = message;
    }
    BaseError.prototype.isError = function () {
        return typeof this._errorMessage == 'string';
    };
    Object.defineProperty(BaseError.prototype, "errorMessage", {
        get: function () {
            return this._errorMessage;
        },
        set: function (message) {
            if (this.isError()) {
                throw Error("Cannot re-assign error message ('" + this._errorMessage + "' to '" + message + "')");
            }
            this._errorMessage = message;
        },
        enumerable: false,
        configurable: true
    });
    BaseError.prototype.displayError = function (source) {
        return this._errorMessage || "";
    };
    return BaseError;
}());
exports.BaseError = BaseError;
var TraceableError = /** @class */ (function (_super) {
    __extends(TraceableError, _super);
    function TraceableError(message, codeSnippet) {
        var _this = _super.call(this) || this;
        _this.errorMessage = message;
        _this.codeSnippet = codeSnippet;
        return _this;
    }
    TraceableError.prototype.setTrace = function (message, codeSnippet) {
        this.errorMessage = message;
        this.codeSnippet = codeSnippet;
    };
    Object.defineProperty(TraceableError.prototype, "codeSnippet", {
        get: function () {
            return this._line_segment;
        },
        set: function (codeSnippet) {
            if (this._line_segment !== undefined) {
                throw Error("Cannot re-assign code snippet.");
            }
            this._line_segment = codeSnippet;
        },
        enumerable: false,
        configurable: true
    });
    TraceableError.prototype.__getDisplayError = function (source, first, padding) {
        var _a, _b, _c;
        if (first === void 0) { first = true; }
        if (padding === void 0) { padding = 4; }
        var out = "";
        if (!first) {
            // the padding pads all the child errors with spaces, so child errors done need to pad, because it will already be padded.
            padding = 0;
            // add a new line because it looks nicer when a child isnt right below the parent
            out += '\n';
        }
        ;
        var point = source.getPointAt(((_a = this._line_segment) === null || _a === void 0 ? void 0 : _a.start) || { char_num: -1 });
        out += (
        // this is the filename. 
        // TODO use paths not filenames.
        (source.filename || "").cyan.bold +
            (
            // this adds ":line:col" to the filename, so you know where the error is. 
            "" + ":".grey + point.line.toString().yellow + ":".grey + point.collumn.toString().yellow)) + " \n"; // end of the filename line.
        // This gets the display string for the code that generated the error, and indents it all by 2
        out += ((_b = this._line_segment) === null || _b === void 0 ? void 0 : _b.getDisplayWithArrows(source, this.errorMessage || "<no error message>", 2)) + '\n';
        if (this.child)
            // if there is a child error, get ITS display string, and add it. 
            out += (_c = this.child) === null || _c === void 0 ? void 0 : _c.__getDisplayError(source, false);
        // then add the padding to every line.
        var lines = out.split('\n');
        var new_lines = [];
        for (var i = 0; i < lines.length; i++) {
            new_lines[i] = " ".repeat(padding) + lines[i];
        }
        // rejoin the lines
        out = new_lines.join('\n');
        // this is at the end to avoid padding
        // if we are the first error, display our error in bold and red at the top.
        if (first)
            out = ("Error: " + this.errorMessage + "\n").red.bold + out;
        return out;
    };
    TraceableError.prototype.displayError = function (source) {
        return this.__getDisplayError(source, true, 4);
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
