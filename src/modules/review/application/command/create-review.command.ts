import { CreateReviewRequestDto } from "../../dto/request/create-review-request.dto";
import { User } from "../../../../domain/model/user.entity";

export class CreateReviewCommand {
  public readonly rating: number;
  public readonly comment: string;
  public readonly gameId: string;
  public readonly user: User;

  private constructor(rating: number, comment: string, gameId: string, user: User) {
    this.rating = rating;
    this.comment = comment;
    this.gameId = gameId;
    this.user = user;
  }

  public static of(createReviewRequestDto: CreateReviewRequestDto, user: User): CreateReviewCommand {
    const { rating, comment, gameId } = createReviewRequestDto;
    return new CreateReviewCommand(rating, comment, gameId, user);
  }
}
