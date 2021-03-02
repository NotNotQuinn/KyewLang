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

    displayError(source: Trace.SourceText) {
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
        if(this._line_segment !== undefined) {
            throw Error(`Cannot re-assign code snippet.`)
        }
        this._line_segment = codeSnippet;
    }
    get codeSnippet() {
        return this._line_segment
    }

    __getDisplayError(source: Trace.SourceText, first:boolean=true, padding:number=4) : string {
        var out="";
        if(!first) {
            // the padding pads all the child errors with spaces, so child errors done need to pad, because it will already be padded.
            padding=0;
            // add a new line because it looks nicer when a child isnt right below the parent
            out += '\n'
        };

        var point = source.getPointAt(this._line_segment?.start || { char_num: -1 })

        out += (
            // this is the filename. 
            // TODO use paths not filenames.
            (source.filename || "").cyan.bold + 
            // this adds ":line:col" to the filename, so you know where the error is. 
            `${":".grey}${point.line.toString().yellow}${":".grey}${point.collumn.toString().yellow}`
        ) + ` \n`  // end of the filename line.

        // This gets the display string for the code that generated the error, and indents it all by 2
        out += this._line_segment?.getDisplayWithArrows(source,  this.errorMessage || "<no error message>", 2 ) + '\n';
        if(this.child)
            // if there is a child error, get ITS display string, and add it. 
            out += this.child?.__getDisplayError(source, false);
        
        // then add the padding to every line.
        var lines = out.split('\n')
        var new_lines: Array<string> = [];
        for(let i=0;i<lines.length;i++) {
            new_lines[i] = " ".repeat(padding) +lines[i]
        }
        // rejoin the lines
        out = new_lines.join('\n')
        
        // this is at the end to avoid padding
        // if we are the first error, display our error in bold and red at the top.
        if(first) out = `Error: ${this.errorMessage}\n`.red.bold + out;
        return out;
    }

    displayError(source: Trace.SourceText) {
        return this.__getDisplayError(source, true, 4)
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