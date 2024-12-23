import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ReservationNotFoundException } from "../../exceptions/reservation-not-found.exception";
import { ReservationEntityRepository } from "../../reservation-entity.repository";
import { ReservationCantBeModifiedException } from "../../exceptions/reservation-cant-be-modified.exception";
import { ReturnReservationCommand } from "./return-reservation.command";
import { EmailReservationReturnedService } from "../../../email/mail-bodies/email-reservation-returned.service";
import { FavoriteService } from "../../../favorite/favorite.service";

@CommandHandler(ReturnReservationCommand)
export class ReturnReservationHandler implements ICommandHandler<ReturnReservationCommand> {
  constructor(private readonly repository: ReservationEntityRepository,
              private readonly emailReservationReturnedService: EmailReservationReturnedService,
              private readonly favoriteService: FavoriteService) {
  }

  async execute(command: ReturnReservationCommand): Promise<void> {
    const foundReservation = await this.repository.findById(command.id);
    if (foundReservation == null) {
      throw new ReservationNotFoundException();
    }
    if (foundReservation.isCancelled || foundReservation.isReturned) {
      throw new ReservationCantBeModifiedException();
    }
    foundReservation.isReturned = true;
    foundReservation.returnedDate = new Date();
    await this.repository.saveOrUpdate(foundReservation);

    await this.emailReservationReturnedService.sendConfirmationMail(foundReservation);

    for (const game of foundReservation.games) {
      await this.favoriteService.sendAvailableAgainEmailForFavoriteGame(game);
    }
  }
}
