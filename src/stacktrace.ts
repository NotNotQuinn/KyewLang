import 'colorts/lib/string';

// TODO make util file to put this in?
export function wordWrap(s:string, w:number): string { return s.replace( new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n' ); }

export class SourceText {

    readonly rawText: string;
    readonly filename: string;

    /**
     * Stores the text.
     * @param text The text to store
     */
    constructor(text:string, filename:string) {
        this.rawText = text
        this.filename = filename
    }
    getLineNumberAt(char_num:number): number {
        // no newline characters = first line.
        let line_number = 1;
        for(let curChar = 1; curChar < char_num; curChar++) {
            if (this.rawText[curChar - 1] == '\n') {
                line_number++;
            }
        }
        return line_number;
    }

    getPointAt(char_num:number): { line: number; collumn: number } {
        var line:number=1, collumn:number=1;

        for(let curChar = 1; curChar < char_num; curChar++) {
            if (this.rawText[curChar - 1] == '\n') {
                line++;
                collumn = 1;
            }
            collumn++;
        }

        return {line: line, collumn: collumn}
    }
}

export class SourcePoint {

    readonly line: number;
    readonly collumn: number;
    readonly source: SourceText;

    /**
     * Stores a location in a text.
     * @param line The line number of the point.
     * @param collumn The collumn number of the point.
     * @param source The raw text to reference.
     */
    constructor(obj : {line: number, collumn: number, source: SourceText, char_num?: undefined }
                    | {line?: undefined, collumn?: undefined, source: SourceText, char_num: number } ) {
        if( obj.char_num !== undefined ) {
            this.source = obj.source
            var thing = obj.source.getPointAt(obj.char_num)
            this.line = thing.line
            this.collumn = thing.collumn
        } else {
            if( obj.line < 0 ) throw new Error(`Line (${obj.line}) cannot be negative.`);
            if( obj.collumn < 0 ) throw new Error(`Collumn (${obj.collumn}) cannot be negative.`);
            var lines = obj.source.rawText.split(/\r\n|\r|\n/);
            if( obj.line > lines.length ) throw new Error(`Line (${obj.line}) is outside of source length (${lines.length}).`)
            if( lines[obj.line-1].length < obj.collumn ) throw new Error(`Collumn (${obj.collumn}) is ouside of line length (${lines.length}).`)
            this.line = obj.line
            this.collumn = obj.collumn
            this.source = obj.source
        }
    }
    getFullLine():string {
        return this.source.rawText.split('\n')[this.line-1]
    }
}

export class SourceLine {

    readonly from: SourcePoint;
    readonly length: number;

    /**
     * Stores a part of a line in a text.
     * @param obj Object containing data about what line and what part of it you want to store
     * @param obj.start A SourcePoint of where the line starts
     * @param obj.from Collumn number of the starting point
     * @param obj.length Length of the line to capture
     * @param obj.source The raw text to reference
     */
    constructor(  obj  : { start: SourcePoint, length: number, line?: undefined, from?: undefined, source?: undefined }
                       | { start?: undefined, length: number,  line: number, from:number, source: SourceText }           ) {
        if( obj.start instanceof SourcePoint ) {
            this.from = obj.start;
            if( obj.start.collumn + obj.length - 1 > obj.start.getFullLine().length ) throw new Error(`Captured line (${obj.line}) is outside of line length.`)
        } else if ( obj.from !== undefined && obj.line !== undefined && obj.source !== undefined ) {
            if( obj.from + obj.length - 1 > obj.source.rawText.split('\n')[obj.line-1].length ) throw new Error(`Captured line (${obj.line}) is outside of line length.`)
            this.from = new SourcePoint({line: obj.line, collumn: obj.from, source: obj.source})
        } else {
            throw new Error("typescript is broken, this should never happen. if it does.... Uhh, contact devs please lol")
        }
        if( obj.length <= 0 ) throw new Error(`Length (${obj.length}) cannot be less than 1. Try using SourcePoint.`)
        this.length = obj.length;
    }
    getLineCaptured() : string {
        const source = this.from.source;
        return this.getFullLine().substr(this.from.collumn, this.length)

    }

    getFullLine():string {
        return this.from.getFullLine()
    }

    // can be public
    private getArrows(padding:number=0):string {
        var arrows = "^".repeat( this.length );
        return this.getWhitespace(padding) + arrows
    }

    // can be public
    private getWhitespace(padding:number=0) {
        return " ".repeat(padding) + " ".repeat((this.from.collumn ? this.from.collumn : 1 ) -1)
    }

    getDisplayWithArrows(message:string, padding:number=0): string {
        // Dont wrap the code. only the error message
        var out = " ".repeat(padding) + this.getFullLine() + '\n';
        // TODO dynamic colors
        out += this.getArrows(padding).red + '\n';
        var lines = wordWrap(message, 80);
        lines.split('\n').forEach(line => {
            out += (this.getWhitespace(padding) + (line)).yellow + '\n';
        })
        return out.substr(0, out.length - 1) // remove trailing newline
    }
}
