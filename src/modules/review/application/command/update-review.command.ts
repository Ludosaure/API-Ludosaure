import { UpdateReviewRequestDto } from "../../dto/request/update-review-request.dto";

export class UpdateReviewCommand {
  public readonly id: string;
  public readonly rating: number;
  public readonly title: string;
  public readonly comment: string;

  private constructor(id: string, rating: number, title: string, comment: string) {
    this.id = id;
    this.rating = rating;
    this.title = title;
    this.comment = comment;
  }

  public static of(updateReviewRequestDto: UpdateReviewRequestDto): UpdateReviewCommand {
    const { id, rating, title, comment } = updateReviewRequestDto;
    return new UpdateReviewCommand(id, rating, title, comment);
  }
}
