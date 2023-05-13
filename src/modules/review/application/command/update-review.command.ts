import { UpdateReviewRequestDto } from "../../dto/request/update-review-request.dto";
import { User } from "../../../../domain/model/user.entity";

export class UpdateReviewCommand {
  public readonly gameId: string;
  public readonly rating: number;
  public readonly title: string;
  public readonly comment: string;
  public readonly user: User;

  private constructor(gameId: string, rating: number, title: string, comment: string, user: User) {
    this.gameId = gameId;
    this.rating = rating;
    this.title = title;
    this.comment = comment;
    this.user = user;
  }

  public static of(updateReviewRequestDto: UpdateReviewRequestDto, user: User): UpdateReviewCommand {
    const { gameId, rating, title, comment } = updateReviewRequestDto;
    return new UpdateReviewCommand(gameId, rating, title, comment, user);
  }
}
