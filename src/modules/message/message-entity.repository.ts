import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/model/user.entity";
import { Repository } from "typeorm";
import { Message } from "../../domain/model/message.entity";
import { MessageRepository } from "../../infrastructure/message.repository";
import { Media } from "../../domain/model/media.entity";

@Injectable()
export class MessageEntityRepository extends Repository<Message> implements MessageRepository {
  constructor(@InjectRepository(Message)
              private messageRepository: Repository<Message>) {
    super(messageRepository.target, messageRepository.manager, messageRepository.queryRunner);
  }

  async saveOrUpdate(message: Message): Promise<Message> {
    return await this.save(message);
  }

  async findConversationByUserIdAndOtherUserId(userId: string, otherUserId: string): Promise<Message[]> {
    return await this.messageRepository
      .createQueryBuilder('message')
      .where('(message.sender_id = :userId OR message.sender_id = :otherUserId)', { userId, otherUserId })
      .andWhere('(message.receiver_id = :userId OR message.receiver_id = :otherUserId)', { userId, otherUserId })
      .orderBy('message.send_date', 'DESC')
      .getMany();
  }

  // Retourne les conversations de l'utilisateur avec l'autre interlocuteur et le dernier message de chaque conversation
  async findConversationsOfUserWithLastMessage(userId: string): Promise<any[]> {
    const getConversationsWithMaxSendDate = this.messageRepository.createQueryBuilder('sub')
      .select('CASE WHEN sender_id = :userId THEN receiver_id ELSE sender_id END', 'conversation_id')
      .addSelect('MAX(send_date)', 'max_send_date')
      .where('sub.sender_id = :userId OR sub.receiver_id = :userId', { userId })
      .groupBy('conversation_id');

    return this.messageRepository.createQueryBuilder('message')
      .select('message.*')
      .innerJoin(
        `(${getConversationsWithMaxSendDate.getQuery()})`,
        'last_messages',
        `(
          (message.sender_id = last_messages.conversation_id AND message.receiver_id = :userId)
          OR (message.sender_id = :userId AND message.receiver_id = last_messages.conversation_id)
        ) AND message.send_date = last_messages.max_send_date`,
        { userId },
      )
      .innerJoinAndSelect(User, 'other_user', `other_user.id = CASE WHEN message.sender_id = :userId THEN message.receiver_id ELSE message.sender_id END`)
      .leftJoinAndSelect(Media, 'other_user_profile_picture', 'other_user_profile_picture.id = other_user.profile_picture_id')
      .where('message.sender_id = :userId OR message.receiver_id = :userId', { userId })
      .orderBy('max_send_date', 'DESC')
      .getRawMany();
  }
}