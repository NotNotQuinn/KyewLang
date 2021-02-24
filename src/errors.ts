import * as Trace from "./stacktrace"

export class BaseError {
    private _errorMessage?: string;

    isError(): boolean {
        return typeof this._errorMessage == 'string';
    }

    setError(message:string) {
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

    /******************* 
     under construction
    ********************/
    private _codeSection?: Trace.SourceLine;
    constructor() {
        super()
    }
    setError(message:string) {
        
    }
    getCodeSection() {
        return this._codeSection
    }
}