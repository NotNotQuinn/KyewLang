import { BaseNode } from "./nodes";

export default class ParseResult {
    errorMessage?: string;
    entryNode?: BaseNode;
    success: boolean;
    constructor(success:boolean=true, entryNode?: BaseNode, errorMessage?:string) {
        this.entryNode = entryNode;
        this.success = success;
        this.errorMessage = errorMessage;
    }
} 
