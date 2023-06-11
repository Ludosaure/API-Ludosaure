import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "../../domain/model/message.entity";
import { User } from "../../domain/model/user.entity";
import { MessageEntityRepository } from "./message-entity.repository";
import { MessageController } from "./message.controller";
import { GetMyConversationsHandler } from "./application/query/get-my-conversations.handler";
import { GetConversationByUserIdHandler } from "./application/query/get-conversation-by-user-id.handler";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Message, User])
  ],
  controllers: [MessageController],
  providers: [
    MessageEntityRepository,
    GetMyConversationsHandler,
    GetConversationByUserIdHandler,
  ]
})
export class MessageModule {
}
