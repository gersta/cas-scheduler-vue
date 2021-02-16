import moment from "moment";

export function asFormattedDate(date: string) {
    return moment(date).format("DD.MM.yyyy");
}