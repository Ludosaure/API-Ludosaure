import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { MessageEntityRepository } from "../../message-entity.repository";
import { GetConversationByUserIdQuery } from "./get-conversation-by-user-id.query";
import { GetConversationByUserIdResponseDto } from "../../dto/response/get-conversation-by-user-id-response.dto";

@QueryHandler(GetConversationByUserIdQuery)
export class GetConversationByUserIdHandler implements IQueryHandler<GetConversationByUserIdQuery> {

  constructor(private readonly messageRepository: MessageEntityRepository) {
  }

  async execute(query: GetConversationByUserIdQuery): Promise<GetConversationByUserIdResponseDto> {
    const conversations = await this.messageRepository.findConversationByUserIdAndOtherUserId(query.user.id, query.otherUserId);
    return new GetConversationByUserIdResponseDto(conversations);
  }

}