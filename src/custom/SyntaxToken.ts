import { SyntaxType } from "./SyntaxType";

/**
 * A token.
 */
export class SyntaxToken {
    type: SyntaxType;
    position: number|null;
    text: string|null;
    value: any|null;

    constructor(type: SyntaxType, position: number|null, text: string|null, value: any|null ) {
        this.type = type;
        this.position = position;
        this.text = text;
        this.value = value;
    }
}
