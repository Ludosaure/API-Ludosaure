export class GenerateInvoiceResponseDto {
    base64String: string;
    filename: string;
    constructor(base64String: string, filename: string) {
        this.base64String = base64String;
        this.filename = filename;
    }
}
