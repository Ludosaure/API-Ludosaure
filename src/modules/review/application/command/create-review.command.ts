import { CreateReviewRequestDto } from "../../dto/request/create-review-request.dto";
import { User } from "../../../../domain/model/user.entity";

export class CreateReviewCommand {
  public readonly rating: number;
  public readonly title: string;
  public readonly comment: string;
  public readonly gameId: string;
  public readonly user: User;

  private constructor(rating: number, title: string, comment: string, gameId: string, user: User) {
    this.rating = rating;
    this.title = title;
    this.comment = comment;
    this.gameId = gameId;
    this.user = user;
  }

  public static of(createReviewRequestDto: CreateReviewRequestDto, user: User): CreateReviewCommand {
    const { rating, title, comment, gameId } = createReviewRequestDto;
    return new CreateReviewCommand(rating, title, comment, gameId, user);
  }
}
