import PromptSync from "prompt-sync";
import { runInNewContext } from "vm";

export class BaseNode {

    display() {
        
    }
}

export class ValueNode<T> extends BaseNode {
    value: T;
    constructor(value:T) {
        super()
        this.value = value
    }
    display() {
        return `(${this.value})`
    }
}

export class IntNode extends ValueNode<number> {
    constructor(value:number) {
        super(value)
    }
}

export class FloatNode extends ValueNode<number> {
    constructor(value:number) {
        super(value)
    }
}

export class BinaryOperatorNode extends BaseNode {
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

export class AddNode extends BinaryOperatorNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '+'
    }
}

export class SubtractNode extends BinaryOperatorNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '-'
    }
}

export class MultiplyNode extends BinaryOperatorNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '*'
    }
}

export class DivideNode extends BinaryOperatorNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '/'
    }
}
