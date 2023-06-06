import { Injectable } from "@nestjs/common";
import { InvoiceEntityRepository } from "./invoice-entity.repository";
import { Invoice } from "../../domain/model/invoice.entity";
import { Reservation } from "../../domain/model/reservation.entity";
import { DateUtils } from "../../shared/date.utils";

@Injectable()
export default class InvoiceService {

  constructor(private readonly invoiceRepository: InvoiceEntityRepository) {
  }

  async createInvoice(amount: number, reservation: Reservation) {
    const invoicedWeeks = await this.getInvoicedWeeksForReservation(reservation.id);
    const invoice = new Invoice();
    invoice.createdAt = new Date();
    invoice.amount = amount;
    invoice.reservation = reservation;
    invoice.nbWeeks = DateUtils.getNbWeeksBetween(reservation.startDate, reservation.endDate) - invoicedWeeks;
    await this.invoiceRepository.saveInvoice(invoice);
  }

  async getPreviouslyInvoicedWeeksForReservation(reservationId: string, invoice: Invoice): Promise<number> {
    const invoices = await this.invoiceRepository.findByReservationId(reservationId);
    return invoices
      .filter((currentInvoice) => currentInvoice.id !== invoice.id)
      .filter((currentInvoice) => currentInvoice.createdAt < invoice.createdAt)
      .reduce((invoicedWeeks, currentInvoice) => invoicedWeeks + currentInvoice.nbWeeks, 0);
  }

  async getInvoicedWeeksForReservation(reservationId: string): Promise<number> {
    const invoices = await this.invoiceRepository.findByReservationId(reservationId);
    return invoices.reduce((invoicedWeeks, invoice) => invoicedWeeks + invoice.nbWeeks, 0);
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
