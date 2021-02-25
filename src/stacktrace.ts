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
        var lines = source.rawText.split('\n');
        if(line > lines.length) throw new Error(`Line (${line}) is outside of source length (${lines.length}).`)
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
     * @param line Line number referenced
     * @param from Collumn number of the starting point
     * @param length Length of the line to capture
     * @param source The raw text to reference
     */
    constructor( line: number, from:number, length: number, source: SourceText ) {
        if( length == 0 ) throw new Error(`Length (${length}) cannot be 0. Try using SourcePoint.`)
        if( from + length > source.rawText.split('\n')[line-1].length ) throw new Error(`Captured line (${line}) is outside of line length.`)
        this.from = new SourcePoint(line, from, source)
        this.length = length;
    }
    getLineCaptured() : string {
        const source = this.from.source;
        return this.getFullLine().substr(this.from.collumn, this.length)

    }
    
    getFullLine():string {
        return this.from.getFullLine()
    }

    private getArrows(padding:number=0):string {
        var arrows = "^".repeat( this.length );
        return this.getWhitespace(padding) + arrows
    }
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
