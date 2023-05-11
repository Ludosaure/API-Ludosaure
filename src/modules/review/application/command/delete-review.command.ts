import { UpdateReviewRequestDto } from "../../dto/request/update-review-request.dto";
import { DeleteReviewRequestDto } from "../../dto/request/delete-review-request.dto";

export class DeleteReviewCommand {
  public readonly id: string;

  private constructor(id: string) {
    this.id = id;
  }

  public static of(deleteReviewRequestDto: DeleteReviewRequestDto): DeleteReviewCommand {
    const { id } = deleteReviewRequestDto;
    return new DeleteReviewCommand(id);
  }
}
