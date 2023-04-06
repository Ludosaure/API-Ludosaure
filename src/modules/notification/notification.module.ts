import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Notification} from "../../domain/model/notification.entity";
import {Reservation} from "../../domain/model/reservation.entity";
import {Game} from "../../domain/model/game.entity";
import {User} from "../../domain/model/user.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Notification, User, Reservation, Game]),
    ],
})
export class NotificationModule {}
