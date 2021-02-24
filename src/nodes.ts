import { TraceableError, NodeViewError } from "./errors";



/***********************
 BUILDING BLOCK NODES 
************************/
export class BaseNode extends TraceableError {
    constructor() {
        super()
    }
    display() {
        
    }
    visit():any {
        throw new NodeViewError("Cannot visit base nodes or visit not implemented.");

    }
}

export class UnaryOperatorNode extends BaseNode {
    child: BaseNode;
    constructor(child:BaseNode) {
        super()
        this.child = child
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
        return '(operator)'
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
    visit() {
        // TODO create custom classes for in-lang numbers and stuff
        return this.value;
    }
}

/***********************
 VALUE NODES 
************************/
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

/***********************
 BINARY OPERATION NODES 
************************/
export class AddNode extends BinaryOperatorNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '+'
    }
    visit() {
        return (this.child_1.visit() + this.child_2.visit());
    }
}

export class SubtractNode extends BinaryOperatorNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '-'
    }
    visit() {
        return (this.child_1.visit() - this.child_2.visit());
    }
}

export class MultiplyNode extends BinaryOperatorNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '*'
    }
    visit() {
        return (this.child_1.visit() * this.child_2.visit());
    }
}

export class DivideNode extends BinaryOperatorNode {
    constructor(child_1: BaseNode, child_2: BaseNode) {
        super(child_1, child_2)
    }
    getOperatorString() {
        return '/'
    }
    visit() {
        return (this.child_1.visit() / this.child_2.visit());
    }
}
