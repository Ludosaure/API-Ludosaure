import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Unavailability } from './unavailability.entity';
import { Reservation } from './reservation.entity';
import { Review } from './review.entity';
import { Media } from './media.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, name: 'nb_players_min' })
  nbPlayersMin: number;

  @Column({ nullable: false, name: 'nb_players_max' })
  nbPlayersMax: number;

  @Column({ nullable: false, name: 'average_duration' })
  averageDuration: number;

  @Column({ nullable: false, name: 'age_min' })
  ageMin: number;

  @Column({ nullable: false, name: 'weekly_amount' })
  weeklyAmount: number;

  @Column({
    nullable: false,
    default: false,
    name: 'is_archived',
  })
  isArchived: boolean;

  @ManyToOne(() => Media, (media) => media.id, { nullable: true })
  @JoinColumn({ name: 'picture_id' })
  picture: Media;

  @ManyToOne(() => Category, (category) => category.id, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(
      () => Unavailability,
      (unavailability) => unavailability.game,
      {
        onDelete: 'CASCADE',
      }
  )
  unavailabilities: Unavailability[];

  @ManyToMany(
      () => Reservation,
      (reservation) => reservation.games,
      {
          onDelete: "CASCADE"
      }
  )
  reservations: Reservation[];

  @OneToMany(() => Review, (review) => review.game)
  reviews: Review[];

  averageRating: number;

  nbReviews: number;

  isAvailable: boolean;

  hasUnfinishedReservations(): boolean {
    if (this.reservations.length < 1) {
      return false;
    }

    for (let i = 0; i < this.reservations.length; i++) {
      const reservation = this.reservations[i];
      if (
        !reservation.isCancelled &&
        (!reservation.isPaid || !reservation.isReturned)
      ) {
        return true;
      }
    }

    return false;
  }

  hasUpcommingUnavailibilities(): boolean {
    if (this.unavailabilities.length < 1) {
      return false;
    }

    const now = new Date();

    for (let i = 0; i < this.unavailabilities.length; i++) {
      const unavailibility = this.unavailabilities[i];
      if (unavailibility.date > now) {
        return true;
      }
    }

    return false;
  }
}
