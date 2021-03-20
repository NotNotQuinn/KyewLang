import { SyntaxToken } from "../custom/SyntaxToken";
import { SyntaxType } from "../custom/SyntaxType";
import * as Trace from "../custom/trace/stacktrace"; 

export class Lexer {
    public readonly text: string;
    public get curChar():string {
        if (this.curPos >= this.text.length)
            return '\0';
        return this.text[this.curPos];
    }

    public curPos: number;

    constructor(text: string) {
        this.text = text;
        this.curPos = 0;
    }


    private Next() {
        this.curPos++;
    }

    public getToken(): SyntaxToken {
        // <numbers>
        // + - * / ( )
        // <whitespace>

        if (this.curPos >= this.text.length)
            return new SyntaxToken(SyntaxType.EndOfFileToken, this.curPos, "\0", null);

        if(/\d/i.test(this.curChar))
        {
            let start = this.curPos;
            while(/\d/i.test(this.curChar))
                this.Next();

            let length = this.curPos - start;
            let text = this.text.substr(start, length);
            let value: number|null = parseInt(text);
            if(Number.isNaN(value)) {
                value = null;
                // TODO some error shit
            }
            return new SyntaxToken(SyntaxType.IntToken, start, text, value);
        }

        if(/[\t \n]/i.test(this.curChar))
        {
            let start = this.curPos;
            while(/[\t \n]/i.test(this.curChar))
                this.Next();

            let length = this.curPos - start;
            let text = this.text.substr(start, length);
            let value = null;

            return new SyntaxToken(SyntaxType.WhitespaceToken, start, text, value);
        }

        if (this.curChar == '(')
            return new SyntaxToken(SyntaxType.OpenPerenthesisToken, this.curPos++, '(', null)
        else if (this.curChar == ')')
            return new SyntaxToken(SyntaxType.ClosePerenthesisToken, this.curPos++, ')', null)
        else if (this.curChar == '+')
            return new SyntaxToken(SyntaxType.PlusToken, this.curPos++, '+', null)
        else if (this.curChar == '-')
            return new SyntaxToken(SyntaxType.MinusToken, this.curPos++, '-', null)
        else if (this.curChar == '*')
            return new SyntaxToken(SyntaxType.AsteriskToken, this.curPos++, '*', null)
        else if (this.curChar == '/')
            return new SyntaxToken(SyntaxType.ForwardSlashToken, this.curPos++, '/', null)

        let pos = this.curPos;
        let text = this.curChar;
        this.Next()
        return new SyntaxToken(SyntaxType.BadToken, pos, text, null);
    }
}
