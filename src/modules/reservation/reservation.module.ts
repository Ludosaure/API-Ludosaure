import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Reservation} from "../../domain/model/reservation.entity";
import {User} from "../../domain/model/user.entity";
import {Game} from "../../domain/model/game.entity";
import {Plan} from "../../domain/model/plan.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Reservation, User, Plan, Game]),
    ],
})
export class ReservationModule {}
