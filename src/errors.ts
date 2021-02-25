import * as Trace from "./stacktrace";

export class BaseError {
    private _errorMessage?: string;

    isError(): boolean {
        return typeof this._errorMessage == 'string';
    }

    setErrorMessage(message:string) {
        if(this.isError()) {
            throw Error(`Cannot re-assign error message ('${this._errorMessage}' to '${message}')`)
        }
        this._errorMessage = message
    }
    getErrorMessage() {
        return this._errorMessage;
    }
    constructor() {
    }
    getDisplayError() {
        return this._errorMessage || ""
    }
}

export class TraceableError extends BaseError {
    child?: TraceableError;
    private _codeSnippet?: Trace.SourceLine;
    constructor() {
        super()
    }
    setTrace(message:string, codeSnippet:Trace.SourceLine) {
        this.setErrorMessage(message);
        this.setCodeSnippet(codeSnippet);
    }
    setCodeSnippet(codeSnippet:Trace.SourceLine) {
        if(this._codeSnippet != undefined) {
            throw Error(`Cannot re-assign code snippet.`)
        }
        this._codeSnippet = codeSnippet;
    }
    getCodeSnippet() {
        return this._codeSnippet
    }
    getDisplayError(first:boolean=true, padding:number=0) : string {
        var out="";
        var next_padding = padding+4;
        if(!first) {
            // the next_padding pads all the child errors with spaces, so child errors done need to pad, because it will already be padded.
            next_padding=0;
            // add a new line because it looks nicer when a child isnt right below the parent
            out += '\n'
        };

        out += (
            // this is the filename. 
            // TODO use paths not filenames.
            (this._codeSnippet?.from.source.filename || "").cyan.bold + 
            // this adds ":line:col" to the filename, so you know where the error is. 
            `${":".grey}${this._codeSnippet?.from.line.toString().yellow}${":".grey}${this._codeSnippet?.from.collumn.toString().yellow}`
        ) + ` \n`  // end of the filename line.

        // This gets the display string for the code that generated the error, and indents it all by 2
        out += this._codeSnippet?.getDisplayWithArrows(this.getErrorMessage() || "<no error message>", 2 ) + '\n';
        if(this.child)
            // if there is a child error, get ITS display string, and add it. 
            out += this.child?.getDisplayError(false);
        
        // then add the padding to every line.
        var lines = out.split('\n')
        var new_lines: Array<string> = [];
        for(let i=0;i<lines.length;i++) {
            // if padding is zero there still is none.
            if(lines[i] == "") continue;
            new_lines[i] = " ".repeat(next_padding) +lines[i]
        }
        // rejoin the lines
        out = lines.join('\n')
        
        // this is at the end to avoid padding
        // if we are the first error, display our error in bold and red at the top.
        if(first) out = `Error: ${this.getErrorMessage()}\n`.red.bold + out;
        return out;
    }
}

/*************************
 ERRORS TO RAISE
**************************/

// TODO seperate these errors to a different file, they really have nothing to do with eachother.

export class NodeViewError extends Error {
    constructor(message:string) {
        super(message)
    }
}