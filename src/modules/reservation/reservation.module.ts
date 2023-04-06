import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Reservation} from "../../domain/model/reservation.entity";
import {User} from "../../domain/model/user.entity";
import {Package} from "../../domain/model/package.entity";
import {Game} from "../../domain/model/game.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Reservation, User, Package, Game]),
    ],
})
export class ReservationModule {}
