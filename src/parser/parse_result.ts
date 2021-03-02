import { BaseNode } from "../custom/nodes";

export default class ParseResult {
    entryNode?: BaseNode;
    success: boolean;
    constructor(success:boolean=true, entryNode?: BaseNode) {
        this.entryNode = entryNode;
        this.success = success;
    }
} 
