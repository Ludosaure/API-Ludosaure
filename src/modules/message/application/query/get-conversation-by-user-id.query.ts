import { GetConversationByUserIdRequestDto } from "../../dto/request/get-conversation-by-user-id-request.dto";
import { User } from "../../../../domain/model/user.entity";

export class GetConversationByUserIdQuery {
  otherUserId: string;
  user: User;
  private constructor(otherUserId: string, user: User) {
    this.otherUserId = otherUserId;
    this.user = user;
  }

  static of(getConversationByUserIdRequest: GetConversationByUserIdRequestDto, user: User): GetConversationByUserIdQuery {
    const { userId } = getConversationByUserIdRequest;
    return new GetConversationByUserIdQuery(userId, user);
  }
}