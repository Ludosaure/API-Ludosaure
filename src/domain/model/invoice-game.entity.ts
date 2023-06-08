import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./user.entity";
import {Game} from "./game.entity";
import { Invoice } from "./invoice.entity";

@Entity()
export class InvoiceGame {
    @PrimaryColumn({name: 'invoice_id'})
    invoiceId: string;

    @PrimaryColumn({name: 'game_id'})
    gameId: string;

    @ManyToOne(() => Invoice, (invoice) => invoice.id, {nullable: false})
    @JoinColumn({name: 'invoice_id'})
    invoice: Invoice;

    @ManyToOne(() => Game, (game) => game.id, {nullable: false})
    @JoinColumn({name: 'game_id'})
    game: Game;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false, name: 'weekly_amount'})
    weeklyAmount: number;
}
