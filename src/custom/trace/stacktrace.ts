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

    getPointAt(point:SourcePoint): { line: number; collumn: number } {
        var line:number=1, collumn:number=0;

        for(let curChar = 1; curChar < point.char_num; curChar++) {
            if (this.rawText[curChar - 1] == '\n') {
                line++;
                collumn = 0;
            }
            collumn++;
        }

        return {line: line, collumn: collumn}
    }

    getFullLine(point: SourcePoint ) :string {
        var lines = this.rawText.split('\n')
        var line = this.getPointAt(point).line
        var out = lines[line-1];
        // because split removes the newline character, and we want to get the entire line, we will add the newline character to the end, if its not the last line.
        if( line - 1 !== lines.length) {
            out += '\n';
        }
        return out;
    }
}




/**
 * Stores the location of a segment of text
 */
export class Segment {
    readonly start: number;
    readonly end: number;

    /**
     * @param start The character number of the start.
     * @param end The character number of the end.
     */
    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
}


export class SourcePoint {

    readonly char_num: number;

    /**
     * Stores a location in a text.
     */
    constructor(char_num: number) {
        this.char_num=char_num;
    }
}

export class SourceLine {

    readonly start: SourcePoint;
    readonly length: number;

    /**
     * Stores a part of a line in a text.
     * @param start A SourcePoint of where the line starts
     * @param length Length of the line to capture
     * @param source The raw text to reference
     */
    constructor( start : SourcePoint, length: number, source: SourceText ) {
        if( length <= 0 ) {
            throw new Error(`Length (${length}) cannot be less than 1. Try using SourcePoint.`)
        }
        this.length = length;
        this.start = start;
        if( source.getPointAt(start).collumn + length - 1 >  source.getFullLine(start).length ) { 
            throw new Error(`Captured line (${source.getPointAt(start).line}) is outside of line length.`)
        }        
    }
    getLineCaptured(source: SourceText) : string {
        return this.getFullLine(source).substr(source.getPointAt(this.start).collumn, this.length)
    }

    getFullLine(source: SourceText):string {
        return source.getFullLine(this.start);
    }

    // can be public
    private getArrows(source: SourceText, padding:number=0):string {
        var arrows = "^".repeat( this.length );
        return this.getWhitespace(source, padding) + arrows
    }

    // can be public
    private getWhitespace(source: SourceText, padding:number=0) {
        return " ".repeat(padding) + " ".repeat((source.getPointAt(this.start).collumn ? source.getPointAt(this.start).collumn : 1 ) -1)
    }

    getDisplayWithArrows(source: SourceText, message:string, padding:number=0): string {
        // Dont wrap the code. only the error message
        var out = " ".repeat(padding) + this.getFullLine(source).replace("\n", "") + '\n';
        // TODO dynamic colors
        out += this.getArrows(source, padding).red + '\n';
        var lines = wordWrap(message, 80);
        lines.split('\n').forEach(line => {
            out += (this.getWhitespace(source, padding) + (line)).yellow + '\n';
        })
        return out.substr(0, out.length - 1) // remove trailing newline
    }
}
