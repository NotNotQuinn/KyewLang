import 'colorts/lib/string';

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
    getLineNumberAt(character_number:number): number {
        // no newline characters = first line.
        let line_number = 1;
        for(let curChar = 1; curChar < character_number; curChar++) {
            if (this.rawText[curChar - 1] == '\n') {
                line_number++;
            }
        }
        return line_number;
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
    constructor(line: number, collumn: number, source: SourceText) {
        if( line < 0 ) throw new Error(`Line (${line}) cannot be negative.`);
        if( collumn < 0 ) throw new Error(`Collumn (${collumn}) cannot be negative.`);
        var lines = source.rawText.split(/\r\n|\r|\n/);
        if( line > lines.length ) throw new Error(`Line (${line}) is outside of source length (${lines.length}).`)
        if( lines[line-1].length < collumn ) throw new Error(`Collumn (${collumn}) is ouside of line length (${lines.length}).`)
        this.line = line
        this.collumn = collumn
        this.source = source
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
        } else if ( obj.from != undefined && obj.line != undefined && obj.source != undefined ) {
            if( obj.from + obj.length - 1 > obj.source.rawText.split('\n')[obj.line-1].length ) throw new Error(`Captured line (${obj.line}) is outside of line length.`)
            this.from = new SourcePoint(obj.line, obj.from, obj.source)
        } else {
            throw new Error("typescript is broken, this should never happen. if it does.... Uhh, contact devs please lol")
        }
        if( obj.length == 0 ) throw new Error(`Length (${obj.length}) cannot be 0. Try using SourcePoint.`)
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
        var out = " ".repeat(padding) + this.getFullLine() + '\n';
        // TODO dynamic colors
        out += this.getArrows(padding).red + '\n';
        out += (this.getWhitespace(padding) + (message)).yellow;
        return out
    }
}
