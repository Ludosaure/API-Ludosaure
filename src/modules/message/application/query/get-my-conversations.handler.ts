import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMyConversationsQuery } from "./get-my-conversations.query";
import { MessageEntityRepository } from "../../message-entity.repository";
import { ConversationDto, GetMyConversationsResponseDto } from "../../dto/response/get-my-conversations-response.dto";
import { User } from "../../../../domain/model/user.entity";
import { Media } from "../../../../domain/model/media.entity";
import { Message } from "../../../../domain/model/message.entity";

@QueryHandler(GetMyConversationsQuery)
export class GetMyConversationsHandler implements IQueryHandler<GetMyConversationsQuery> {

  constructor(private readonly messageRepository: MessageEntityRepository) {
  }

  async execute(query: GetMyConversationsQuery): Promise<GetMyConversationsResponseDto> {
    const conversations = await this.messageRepository.findConversationsOfUserWithLastMessage(query.userId);
    return new GetMyConversationsResponseDto(this.initReturnedConversations(conversations));
  }

  private initReturnedConversations(conversations: any[]): ConversationDto[] {
    const returnedConversations : ConversationDto[] = [];
    for(const conversation of conversations) {
      const profilePicture = new Media();
      profilePicture.id = conversation.other_user_profile_picture_id;
      profilePicture.url = conversation.other_user_profile_picture_url;
      profilePicture.key = conversation.other_user_profile_picture_key;

      const otherUser = new User();
      otherUser.id = conversation.other_user_id;
      otherUser.firstname = conversation.other_user_firstname;
      otherUser.lastname = conversation.other_user_lastname;
      otherUser.profilePicture = profilePicture;

      const lastMessage = new Message();
      lastMessage.id = conversation.id;
      lastMessage.content = conversation.content;
      lastMessage.sendDate = conversation.send_date;
      lastMessage.isRead = conversation.is_read;

      const returnedConversation = new ConversationDto();
      returnedConversation.otherUser = otherUser;
      returnedConversation.lastMessage = lastMessage;
      returnedConversations.push(returnedConversation);
    }
    return returnedConversations;
  }

}