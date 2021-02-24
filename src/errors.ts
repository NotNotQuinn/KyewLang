import { textChangeRangeIsUnchanged } from "typescript";
import * as Trace from "./stacktrace"

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
}

export class TraceableError extends BaseError {

    private _codeSnippet?: Trace.SourceLine;
    constructor() {
        super()
    }
    setError(message:string, codeSnippet:Trace.SourceLine) {
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
}

/*************************
 ERRORS TO RAISE
**************************/

export class NodeViewError extends Error {
    constructor(message:string) {
        super(message)
    }
}