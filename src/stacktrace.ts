export class SourceText {

    readonly rawText: string;

    /**
     * Stores the text.
     * @param text The text to store
     */
    constructor(text:string) {
        this.rawText = text
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
        if( lines[line-1].length > collumn ) throw new Error(`Collumn (${collumn}) is ouside of line length (${length}).`)
        this.line = line
        this.collumn = collumn
        this.source = source
    }
}

export class SourceLine {

    readonly start: SourcePoint;
    readonly end: SourcePoint;
    
    /**
     * Stores a part of a line in a text.
     * @param line Line number referenced
     * @param start Collumn number of the starting point
     * @param end Collumn number of the ending point
     * @param source The raw text to reference
     */
    constructor( line: number, start:number, end: number, source: SourceText ) {
        if( end == start ) throw new Error(`End (${end}) cannot eaqual start (${start}). Try using SourcePoint.`)
        if( end > start ) throw new Error(`End (${end}) cannot be before start (${start}).`);
        this.end = new SourcePoint(line, start, source)
        this.start = new SourcePoint(line, end, source)
    }
}
