import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Game} from "./game.entity";
import { Invoice } from "./invoice.entity";

@Entity()
export class InvoiceGame {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'invoice_id', nullable: false})
    invoiceId: string;

    @Column({name: 'game_id', nullable: true })
    gameId: string;

    @ManyToOne(() => Invoice, (invoice) => invoice.id, {nullable: false})
    @JoinColumn({name: 'invoice_id'})
    invoice: Invoice;

    @ManyToOne(
        () => Game,
        (game) => game.id,
        {
            onDelete: "SET NULL"
        }
    )
    @JoinColumn({name: 'game_id'})
    game: Game;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false, name: 'weekly_amount'})
    weeklyAmount: number;
}
