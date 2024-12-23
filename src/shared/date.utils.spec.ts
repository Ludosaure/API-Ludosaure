import {DateUtils} from "./date.utils";
import {EndDateBiggerThanStartDateException} from "./exceptions/end-date-bigger-than-start-date.exception";

describe('DateUtils', () => {

    describe('getWeeksBetween', () => {
        it('should return 1', () => {
            const startDate = new Date('2020-01-01');
            const endDate = new Date('2020-01-08');
            expect(DateUtils.getNbWeeksBetween(startDate, endDate)).toBe(1);
        });

        it('should return 2 if the week is started even if its not full', () => {
            const startDate = new Date('2020-01-01');
            const endDate = new Date('2020-01-10');
            expect(DateUtils.getNbWeeksBetween(startDate, endDate)).toBe(2);
        });

        it('should return 2', () => {
            const startDate = new Date('2020-01-01');
            const endDate = new Date('2020-01-15');
            expect(DateUtils.getNbWeeksBetween(startDate, endDate)).toBe(2);
        });

        it('should return 3', () => {
            const startDate = new Date('2020-01-01');
            const endDate = new Date('2020-01-22');
            expect(DateUtils.getNbWeeksBetween(startDate, endDate)).toBe(3);
        });

        it('should return 4', () => {
            const startDate = new Date('2020-01-01');
            const endDate = new Date('2020-01-29');
            expect(DateUtils.getNbWeeksBetween(startDate, endDate)).toBe(4);
        });

        it('should return 5', () => {
            const startDate = new Date('2020-01-01');
            const endDate = new Date('2020-02-05');
            expect(DateUtils.getNbWeeksBetween(startDate, endDate)).toBe(5);
        });

        it('should return 15', () => {
            const startDate = new Date('2020-01-01');
            const endDate = new Date('2020-04-15');
            expect(DateUtils.getNbWeeksBetween(startDate, endDate)).toBe(15);
        });
    });

    describe('checkIfStartDateIsBeforeEndDate', () => {
        it('should return true', () => {
            const startDate = new Date('2020-01-01');
            const endDate = new Date('2020-01-08');
            expect(DateUtils.checkIfStartDateIsBeforeEndDate(startDate, endDate)).toBe(true);
        });

        it('should throw an error', () => {
            const startDate = new Date('2020-01-08');
            const endDate = new Date('2020-01-01');
            expect(() => DateUtils.checkIfStartDateIsBeforeEndDate(startDate, endDate)).toThrow(EndDateBiggerThanStartDateException);
        });
    });
});
