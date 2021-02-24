import { BaseError, TraceableError } from "./errors";

/***********************
 BUILDING BLOCK TOKENS 
************************/
export class BaseToken extends TraceableError {
    constructor() {
        super()
    }
}

export class ValueToken<T> extends BaseToken {
    value:T;
    constructor(value: T) {
        super()
        this.value = value
    }
}

export class BinaryOperatorToken extends BaseToken {
}

/***********************
 VALUE TOKENS 
************************/
export class IntToken extends ValueToken<number> {
    constructor(int_value : number) {
        if(int_value % 1 != 0) {
            throw new TypeError(`Cannot have floating point value '${int_value}' in IntNode.`)
        }
        super(int_value)
    }
}

export class FloatToken extends ValueToken<number> {
    constructor(int_value : number) {
        super(int_value)
    }
}

/***********************
 BINARY OPERATION TOKENS 
************************/
export class PlusToken extends BinaryOperatorToken {
}

export class MinusToken extends BinaryOperatorToken {
}

export class MultiplyToken extends BinaryOperatorToken {
}

export class DivideToken extends BinaryOperatorToken {
}

/***********************
 OTHER TOKENS 
************************/
export class LeftPerenthesisToken extends BaseToken {
}

export class RightPerenthesisToken extends BaseToken {
}

export class NewlineToken extends BaseToken {
}
