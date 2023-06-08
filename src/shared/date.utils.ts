import {EndDateBiggerThanStartDateException} from "./exceptions/end-date-bigger-than-start-date.exception";

export class DateUtils {
    /**
     * Get the number of weeks between two dates
     * If a week is started, it counts as a full week
     * @param startDate
     * @param endDate
     */
    public static getNbWeeksBetween(startDate: Date, endDate: Date): number {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
        const millisecondsBetween = endDate.getTime() - startDate.getTime();
        const weeksBetween = millisecondsBetween / millisecondsPerWeek;
        return Math.ceil(weeksBetween);
    }

    public static checkIfStartDateIsBeforeEndDate(startDate: Date, endDate: Date): boolean {
        if (startDate > endDate) {
            throw new EndDateBiggerThanStartDateException();
        }
        return true;
    }
}
