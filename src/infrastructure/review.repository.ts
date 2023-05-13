import { Review } from "../domain/model/review.entity";

export interface ReviewRepository {

    findById(id: string): Promise<Review>;

    findByGameId(gameId: string): Promise<Review[]>;

    findByGameIdAndUserId(gameId: string, userId: string): Promise<Review>;

    findAverageRatingByGameId(gameId: string): Promise<number>;

    countReviewsByGameId(gameId: string): Promise<number>;

    saveOrUpdate(review: Review): Promise<void>;

    deleteReview(review: Review): Promise<void>;
}
