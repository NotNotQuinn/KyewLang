import * as Trace from "./stacktrace";

export class BaseError {
    private _errorMessage?: string;
        
    constructor(message?:string) {
        this.errorMessage = message
    }

    isError(): boolean {
        return typeof this._errorMessage == 'string';
    }

    set errorMessage(message:string|undefined) {
        if(this.isError()) {
            throw Error(`Cannot re-assign error message ('${this._errorMessage}' to '${message}')`)
        }
        this._errorMessage = message
    }

    get errorMessage() {
        return this._errorMessage;
    }

    get displayError() {
        return this._errorMessage || ""
    }
}

export class TraceableError extends BaseError {
    child?: TraceableError;
    private _line_segment?: Trace.SourceLine;
    constructor(message?:string, codeSnippet?:Trace.SourceLine) {
        super()
    }
    setTrace(message:string, codeSnippet:Trace.SourceLine) {
        this.errorMessage = message;
        this.codeSnippet = codeSnippet;
    }
    set codeSnippet(codeSnippet:Trace.SourceLine|undefined) {
        if(this._line_segment != undefined) {
            throw Error(`Cannot re-assign code snippet.`)
        }
        this._line_segment = codeSnippet;
    }
    get codeSnippet() {
        return this._line_segment
    }

    __getDisplayError(first:boolean=true, padding:number=5) : string {
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
            (this._line_segment?.from.source.filename || "").cyan.bold + 
            // this adds ":line:col" to the filename, so you know where the error is. 
            `${":".grey}${this._line_segment?.from.line.toString().yellow}${":".grey}${this._line_segment?.from.collumn.toString().yellow}`
        ) + ` \n`  // end of the filename line.

        // This gets the display string for the code that generated the error, and indents it all by 2
        out += this._line_segment?.getDisplayWithArrows(this.errorMessage || "<no error message>", 2 ) + '\n';
        if(this.child)
            // if there is a child error, get ITS display string, and add it. 
            out += this.child?.__getDisplayError(false);
        
        // then add the padding to every line.
        var lines = out.split('\n')
        var new_lines: Array<string> = [];
        for(let i=0;i<lines.length;i++) {
            new_lines[i] = " ".repeat(next_padding) +lines[i]
        }
        // rejoin the lines
        out = lines.join('\n')
        
        // this is at the end to avoid padding
        // if we are the first error, display our error in bold and red at the top.
        if(first) out = `Error: ${this.errorMessage}\n`.red.bold + out;
        return out;
    }

    get displayError() {
        return this.__getDisplayError(true, 4)
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