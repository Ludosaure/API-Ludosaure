import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "../../domain/model/invoice.entity";
import { Game } from "../../domain/model/game.entity";
import { InvoiceGame } from "../../domain/model/invoice-game.entity";
import { InvoiceGameEntityRepository } from "./invoice-game-entity.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceGame, Invoice, Game])
  ],
  providers: [
    InvoiceGameEntityRepository,
  ]
})
export class InvoiceGameModule {
}
