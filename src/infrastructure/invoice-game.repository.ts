import { InvoiceGame } from "../domain/model/invoice-game.entity";

export interface InvoiceGameRepository {
    findByInvoiceId(invoiceId: string): Promise<InvoiceGame[]>;
    saveInvoiceGame(invoiceGame: InvoiceGame): Promise<void>;
}
