import { UpdateReviewRequestDto } from "../../dto/request/update-review-request.dto";
import { User } from "../../../../domain/model/user.entity";

export class UpdateReviewCommand {
  public readonly gameId: string;
  public readonly rating: number;
  public readonly comment: string;
  public readonly user: User;

  private constructor(gameId: string, rating: number, comment: string, user: User) {
    this.gameId = gameId;
    this.rating = rating;
    this.comment = comment;
    this.user = user;
  }

  public static of(updateReviewRequestDto: UpdateReviewRequestDto, user: User): UpdateReviewCommand {
    const { gameId, rating, comment } = updateReviewRequestDto;
    return new UpdateReviewCommand(gameId, rating, comment, user);
  }
}
