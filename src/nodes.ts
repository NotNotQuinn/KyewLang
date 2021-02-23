import PromptSync from "prompt-sync";
import { runInNewContext } from "vm";

export class BaseNode {

    display() {
        
    }
}

export class NumberNode extends BaseNode {
    value: number;
    constructor(value:number) {
        super()
        this.value = value
    }
    display() {
        return `(${this.value.toString()})`
    }
}

export class IntNode extends NumberNode {
    constructor(value:number) {
        super(value)
    }
}

export class FloatNode extends NumberNode {
    constructor(value:number) {
        super(value)
    }
}

export class BiOpNode extends BaseNode {
    child_1: BaseNode;
    child_2: BaseNode;
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super()
        this.child_1 = child_1
        this.child_2 = child_2
    }
    display() {
        return `(${this.child_1.display()}${this.getOperatorString()}${this.child_2.display()})`;
    }

    getOperatorString() {
        return '~~'
    }

}

export class AddNode extends BiOpNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '+'
    }
}

export class SubtractNode extends BiOpNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '-'
    }
}

export class MultiplyNode extends BiOpNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '*'
    }
}

export class DivideNode extends BiOpNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '/'
    }
}
