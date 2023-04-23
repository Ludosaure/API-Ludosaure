import {Reservation} from "./reservation.entity";
import {Game} from "./game.entity";
import {Plan} from "./plan.entity";

describe('ReservationEntity', () => {
    describe('CalculateTotalAmount', () => {
        it('should return 5 for one week and one games', () => {
            const game1 = new Game();
            game1.weeklyAmount = 5;
            const reservation = new Reservation();
            reservation.startDate = new Date('2020-01-01');
            reservation.endDate = new Date('2020-01-08');
            reservation.games = [game1];
            expect(reservation.calculateTotalAmount()).toBe(5);
        });

        it('should return 12.5 for one week and two games', () => {
            const game1 = new Game();
            game1.weeklyAmount = 5;
            const game2 = new Game();
            game2.weeklyAmount = 7.5;
            const reservation = new Reservation();
            reservation.startDate = new Date('2020-01-01');
            reservation.endDate = new Date('2020-01-08');
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
            reservation.startDate = new Date('2020-01-01');
            reservation.endDate = new Date('2020-01-22');
            reservation.games = [game1, game2];
            reservation.appliedPlan = plan;
            expect(reservation.calculateTotalAmount()).toBe(35.63);
        });
    });
});
