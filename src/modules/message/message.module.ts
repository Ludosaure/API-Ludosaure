import {Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "../../domain/model/message.entity";
import {User} from "../../domain/model/user.entity";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Message, User]),
    ],
})
export class MessageModule {}
