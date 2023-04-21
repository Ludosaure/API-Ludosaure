export class DateUtils {
    /**
     * Get the number of weeks between two dates
     * If a week is started, it counts as a full week
     * @param startDate
     * @param endDate
     */
    public static getWeeksBetween(startDate: Date, endDate: Date): number {
        const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
        const millisecondsBetween = endDate.getTime() - startDate.getTime();
        const weeksBetween = millisecondsBetween / millisecondsPerWeek;
        return Math.ceil(weeksBetween);
    }
}
