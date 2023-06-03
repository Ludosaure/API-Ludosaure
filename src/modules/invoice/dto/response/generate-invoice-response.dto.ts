export class GenerateInvoiceResponseDto {
    doc: any;
    filename: string;
    constructor(doc: any, filename: string) {
        this.doc = doc;
        this.filename = filename;
    }
}
