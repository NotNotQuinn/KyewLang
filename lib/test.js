"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var e = __importStar(require("./errors"));
var t = __importStar(require("./stacktrace"));
var err = new e.TraceableError();
var err2 = new e.TraceableError();
var err3 = new e.TraceableError();
var err4 = new e.TraceableError();
var err5 = new e.TraceableError();
var err6 = new e.TraceableError();
var source = new t.SourceText("\n! This is a piece of test code. The first '!' should have an arrow under it.\nAnd this should not be shown because there are no errors here.\nThis however will be shown, because THESE WORDS are bad.\nThis line is ok, \nand so is this one.\nTher is a spelling mistake on this line.\nThis is a error. It's also a very long message to test how the WORD WRAPPING works on the terminal when you have very long lines. I'm not sure if this is enough so I'm just going to keep writing.\nThis is an short line.\n", "testcode.txt");
err.setTrace("This is a test error.", new t.SourceLine(2, 1, 1, source));
err2.setTrace("These words are not allowed.", new t.SourceLine(4, 37, 11, source));
err3.setTrace("There* oops", new t.SourceLine(7, 1, 4, source));
err4.setTrace("an* oops", new t.SourceLine(8, 9, 1, source));
err5.setTrace("a* oops. This is a very long error message, I mean like Its very long. I am testing to see how the wrapping works in the terminal. I think this should be about enough to do that.", new t.SourceLine(9, 9, 2, source));
err.child = err2;
err2.child = err3;
err3.child = err4;
err4.child = err5;
if (err.isError())
    console.log(err.getDisplayError());
else
    console.log("there was no error.");
