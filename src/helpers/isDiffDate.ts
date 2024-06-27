import moment from "moment";

export function isDiffDate(date1: Date, date2: Date) {
    return !moment(date1).isSame(date2, 'day');
}