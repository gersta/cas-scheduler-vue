import { asFormattedDate } from "@/components/shared/DateFormat";

describe('DateFormat', () => {
    it('should return error message for non-date string', () => {
        let nonDateString = "Mark";

        const result = asFormattedDate(nonDateString);

        expect(result).toEqual("Invalid date");
    });

    it('should return error message for empty date string', () => {
        let nonDateString = "";

        const result = asFormattedDate(nonDateString);

        expect(result).toEqual("Invalid date");
    })

    it('should return days and months below 10 with leading zeros', () => {
        let date = "2020-02-01";

        const result = asFormattedDate(date);

        expect(result).toBe("01.02.2020");
    })
});