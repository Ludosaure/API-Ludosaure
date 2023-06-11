import { Message } from "../domain/model/message.entity";

export interface MessageRepository {
    saveOrUpdate(message: Message): Promise<Message>;

    findConversationsOfUserWithLastMessage(userId: string): Promise<Message[]>;

    findConversationByUserIdAndOtherUserId(userId: string, otherUserId: string): Promise<Message[]>;
}
