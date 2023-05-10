import { Review } from "../../domain/model/review.entity";
import { ReviewRepository } from "../../infrastructure/review.repository";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Reservation } from "../../domain/model/reservation.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ReviewEntityRepository extends Repository<Review> implements ReviewRepository {
  constructor(@InjectRepository(Reservation)
              private reviewRepository: Repository<Review>) {
    super(reviewRepository.target, reviewRepository.manager, reviewRepository.queryRunner);
  }

  findById(id: string): Promise<Review> {
    return this.findOne({
      where: {
        id: id
      },
      relations: {
        game: true
      }
    });
  }

  findByGameId(gameId: string): Promise<Review[]> {
    return this.find({
      where: {
        game: { id: gameId }
      },
      relations: {
        game: true
      }
    });
  }

  findAverageRatingByGameId(gameId: string): Promise<number> {
    return this.createQueryBuilder("review")
      .select("AVG(review.rating)", "averageRating")
      .where("review.gameId = :gameId", { gameId: gameId })
      .getRawOne()
      .then((result) => {
        return result.averageRating;
      });
  }

  async saveOrUpdate(review: Review): Promise<void> {
    await this.save(review);
  }

  async deleteReview(review: Review): Promise<void> {
    await this.remove(review);
  }
}
