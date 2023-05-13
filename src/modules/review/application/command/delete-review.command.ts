import { DeleteReviewRequestDto } from "../../dto/request/delete-review-request.dto";
import { User } from "../../../../domain/model/user.entity";

export class DeleteReviewCommand {
  public readonly gameId: string;
  public readonly user: User

  private constructor(gameId: string, user: User) {
    this.gameId = gameId;
    this.user = user;
  }

  public static of(deleteReviewRequestDto: DeleteReviewRequestDto, user: User): DeleteReviewCommand {
    const { gameId } = deleteReviewRequestDto;
    return new DeleteReviewCommand(gameId, user);
  }
}
