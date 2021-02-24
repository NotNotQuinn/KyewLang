import { stringify } from "querystring";
import { FileWatcherEventKind } from "typescript";

export class BaseError {
    errorMessage?: string;

    isError(): boolean {
        return typeof this.errorMessage == 'string';
    }

    setError(message:string) {
        if(this.isError()) {
            throw Error(`Cannot re-assign error message '${this.errorMessage}' to '${message}'`)
        }
    }
}

class TraceableError extends BaseError {

}