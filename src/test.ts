import * as e from "./errors";
import * as t from "./stacktrace";

var err = new e.TraceableError()
var err2 = new e.TraceableError()
var err3 = new e.TraceableError()
var err4 = new e.TraceableError()
var err5 = new e.TraceableError()
var source = new t.SourceText(
`
! This is a piece of test code. The first '!' should have an arrow under it.
And this should not be shown because there are no errors here.
This however will be shown, because THESE WORDS are bad.
This line is ok, 
and so is this one.
Ther is a spelling mistake on this line.
This is a error. It's also a very long message to test how the WORD WRAPPING works on the terminal when you have very long lines. I'm not sure if this is enough so I'm just going to keep writing.
This is an short line.
`, "testcode.txt")
err.setTrace("This is a test error.", new t.SourceLine({ line: 2, from:  1, length: 1, source: source }))
err2.setTrace("These words are not allowed.", new t.SourceLine({ line: 4, from: 37, length: 11, source }))
err3.setTrace("There* oops", new t.SourceLine({ line: 7, from: 1, length: 4, source}))
err4.setTrace("an* oops", new t.SourceLine({ line: 8, from: 9, length: 1, source}))
err5.setTrace(
"a* oops. This is a very long error message, I mean like Its very long. I am testing to see how the wrapping works in the terminal. I think this should be about enough to do that.",
new t.SourceLine({line: 9, from: 9, length: 2, source}))

err.child = err2
err2.child = err3
err3.child = err4
err4.child = err5


var almost_empty=new t.SourceText('1\n2',"almost-empty.txt");
var err6=new e.TraceableError();
var err7=new e.TraceableError();
var err8=new e.TraceableError()
err6.setTrace("This should be 1", new t.SourceLine({line: almost_empty.getLineNumberAt(1), from: 1, length: 1, source: almost_empty}))
err7.setTrace("It is impossible to capture a newline character", new t.SourceLine({ line: almost_empty.getLineNumberAt(2), from: 1, length: 1, source: almost_empty}))
err8.setTrace("This should be 2", new t.SourceLine({line: almost_empty.getLineNumberAt(3), from: 1, length: 1, source: almost_empty}))
err5.child = err6
err6.child = err7
err7.child = err8

if (err.isError()) console.log(err.displayError);
else console.log("there was no error.")
