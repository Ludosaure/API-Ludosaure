import { Injectable } from "@nestjs/common";
import { Invoice } from "../../domain/model/invoice.entity";
import { Reservation } from "../../domain/model/reservation.entity";
import { DateUtils } from "../../shared/date.utils";
import { InvoiceGameEntityRepository } from "../invoice-game/invoice-game-entity.repository";
import { InvoiceGame } from "../../domain/model/invoice-game.entity";
import { InvoiceEntityRepository } from "./invoice-entity.repository";

@Injectable()
export default class InvoiceService {

  constructor(private readonly invoiceRepository: InvoiceEntityRepository,
              private readonly invoiceGameRepository: InvoiceGameEntityRepository) {
  }

  async createInvoice(amount: number, reservation: Reservation) {
    const invoicedWeeks = await this.getInvoicedWeeksForReservation(reservation.id);
    const invoice = new Invoice();
    invoice.createdAt = new Date();
    invoice.amount = amount;
    invoice.reservation = reservation;
    invoice.reservationNbWeeks = DateUtils.getNbWeeksBetween(reservation.startDate, reservation.endDate);
    invoice.invoiceNbWeeks = invoice.reservationNbWeeks - invoicedWeeks;
    invoice.firstname = reservation.user.firstname;
    invoice.lastname = reservation.user.lastname;
    invoice.email = reservation.user.email;
    invoice.phone = reservation.user.phone;
    invoice.reservationNumber = reservation.reservationNumber;
    invoice.reservationStartDate = reservation.startDate;
    invoice.reservationEndDate = reservation.endDate;
    invoice.reduction = reservation.appliedPlan != null ? reservation.appliedPlan.reduction : null;
    invoice.reservationTotalAmount = reservation.totalAmount;
    await this.invoiceRepository.saveInvoice(invoice);

    for(const game of reservation.games) {
      const invoiceGame = new InvoiceGame();
      invoiceGame.gameId = game.id;
      invoiceGame.invoiceId = invoice.id;
      invoiceGame.name = game.name;
      invoiceGame.weeklyAmount = game.weeklyAmount;
      await this.invoiceGameRepository.saveInvoiceGame(invoiceGame);
    }
  }

  async getPreviouslyInvoicedWeeksForReservation(reservationId: string, invoice: Invoice): Promise<number> {
    const invoices = await this.invoiceRepository.findByReservationId(reservationId);
    return invoices
      .filter((currentInvoice) => currentInvoice.id !== invoice.id)
      .filter((currentInvoice) => currentInvoice.createdAt < invoice.createdAt)
      .reduce((invoicedWeeks, currentInvoice) => invoicedWeeks + currentInvoice.invoiceNbWeeks, 0);
  }

  async getInvoicedWeeksForReservation(reservationId: string): Promise<number> {
    const invoices = await this.invoiceRepository.findByReservationId(reservationId);
    return invoices.reduce((invoicedWeeks, invoice) => invoicedWeeks + invoice.invoiceNbWeeks, 0);
  }

  async getPreviouslyInvoicedAmountForReservation(reservationId: string, invoice: Invoice): Promise<number> {
    const invoices = await this.invoiceRepository.findByReservationId(reservationId);
    return invoices
      .filter((currentInvoice) => currentInvoice.id !== invoice.id)
      .filter((currentInvoice) => currentInvoice.createdAt < invoice.createdAt)
      .reduce((invoicedAmount, currentInvoice) => Number(invoicedAmount) + Number(currentInvoice.amount), 0);
  }

  async getInvoicedAmountForReservation(reservationId: string): Promise<number> {
    const invoices = await this.invoiceRepository.findByReservationId(reservationId);
    return invoices.reduce((invoicedAmount, invoice) => Number(invoicedAmount) + Number(invoice.amount), 0);
  }
}
