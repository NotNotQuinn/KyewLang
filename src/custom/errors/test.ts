import * as e from "./errors";
import { SourceLine, SourcePoint, SourceText } from "../trace/stacktrace";
import { Token, TokenType } from "../tokens";

var err = new e.TraceableError()
var err2 = new e.TraceableError()
var err3 = new e.TraceableError()
var err4 = new e.TraceableError()
var err5 = new e.TraceableError()
var source = new SourceText(
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
err.setTrace("This is a test error.", new SourceLine( { char_num: 2 },  1, source ))
err2.setTrace("These words are not allowed.", new SourceLine({ char_num: 178 }, 11, source ))
err3.setTrace("There* oops", new SourceLine({ char_num: 237 }, 4, source ))
err4.setTrace("an* oops", new SourceLine({ char_num: 286 }, 1, source ))
err5.setTrace(
"a* oops. This is a very long error message, I mean like Its very long. I am testing to see how the wrapping works in the terminal. I think this should be about enough to do that.",
new SourceLine({ char_num: 482 }, 2, source ))

err.child = err2
err2.child = err3
err3.child = err4
err4.child = err5



// TODO make the SourcePoint and SourceLine stuff store an ID of the source they are referencing
// TODO and allow error objects to look up sources by id somehow
var almost_empty=new SourceText('1\n2',"almost-empty.txt");
var err6=new e.TraceableError();
var err7=new e.TraceableError();
var err8=new e.TraceableError()
err6.setTrace("This should be 1", new SourceLine({ char_num: 1 }, 1, almost_empty ))
err7.setTrace("It shoube possible to capture a newline character", new SourceLine({ char_num: 2 }, 1, almost_empty ))
err8.setTrace("This should be 2", new SourceLine({ char_num: 3 }, 1, almost_empty ))
err5.child = err6
err6.child = err7
err7.child = err8

if (err.isError()) console.log(err.displayError(source));
else console.log("there was no error.")

// var token = new Token({
//     // TType =  TokenType
//     type: TType.IdentifierToken, 
//     origin: new SourceLine({
//         // This object is created when the token is created
//         // because it points to the specific place where 
//         // the token came from

//         start: new SourcePoint({
//             // This object is also created when the token is created
//             char_num:1,
            
//             // The SourceText object is the only thing that is created before the token is
//             source: new SourceText("lol", "lol.txt")
//         }), 
//         length: 3
//     }),

//     // optional for some token types because
//     // this is an identifier token the text 
//     // that the identifier IS is stored here.
//     value: "lol"
// })

// console.log(token)
