import {Reservation} from "./reservation.entity";
import {Game} from "./game.entity";
import {Plan} from "./plan.entity";
import {
    ReservationAlreadyEndedException
} from "../../modules/reservation/exceptions/reservation-already-ended.exception";
import {InvalidDateException} from "../../modules/reservation/exceptions/invalid-date.exception";
import {EndDateBiggerThanStartDateException} from "../../shared/exceptions/end-date-bigger-than-start-date.exception";

describe('ReservationEntity', () => {
    describe('CalculateTotalAmount', () => {
        it('should return 5 for one week and one game', () => {
            const game1 = new Game();
            game1.weeklyAmount = 5;
            const reservation = new Reservation();
            reservation.startDate = new Date('2023-01-01');
            reservation.endDate = new Date('2023-01-08');
            reservation.games = [game1];
            expect(reservation.calculateTotalAmount()).toBe(5);
        });

        it('should return 12.5 for one week and two games', () => {
            const game1 = new Game();
            game1.weeklyAmount = 5;
            const game2 = new Game();
            game2.weeklyAmount = 7.5;
            const reservation = new Reservation();
            reservation.startDate = new Date('2023-01-01');
            reservation.endDate = new Date('2023-01-08');
            reservation.games = [game1, game2];
            expect(reservation.calculateTotalAmount()).toBe(12.5);
        });

        it('should return 35.63 with an applied plan for 3 weeks and two games', () => {
            const game1 = new Game();
            game1.weeklyAmount = 5;
            const game2 = new Game();
            game2.weeklyAmount = 7.5;
            const plan = new Plan();
            plan.reduction = 5;
            const reservation = new Reservation();
            reservation.startDate = new Date('2023-01-01');
            reservation.endDate = new Date('2023-01-22');
            reservation.games = [game1, game2];
            reservation.appliedPlan = plan;
            expect(reservation.calculateTotalAmount()).toBe(35.63);
        });
    });

    describe('CheckNewDates', () => {
        it('should throw an error if the reservation is already ended', () => {
            const reservation = new Reservation();
            reservation.startDate = new Date('2023-01-01');
            reservation.endDate = new Date('2023-01-08');
            expect(() => reservation.areDatesValid(new Date('2023-01-09'))).toThrowError(ReservationAlreadyEndedException);
        });

        it('should throw an error if the start date is after the end date', () => {
            const reservation = new Reservation();
            reservation.startDate = new Date('2028-01-10');
            reservation.endDate = new Date('2028-01-08');
            expect(() => reservation.areDatesValid(new Date('2028-01-08'))).toThrowError(EndDateBiggerThanStartDateException);
        });

        it('should throw an error if the new end date is before the current end date', () => {
            const reservation = new Reservation();
            reservation.startDate = new Date('2028-01-01');
            reservation.endDate = new Date('2028-01-15');
            expect(() => reservation.areDatesValid(new Date('2028-01-08'))).toThrowError(InvalidDateException);
        });

        it('should return true if the dates are valid', () => {
            const reservation = new Reservation();
            reservation.startDate = new Date('2028-01-01');
            reservation.endDate = new Date('2028-01-15');
            expect(reservation.areDatesValid(new Date('2028-01-22'))).toBe(true);
        });
    });
});
