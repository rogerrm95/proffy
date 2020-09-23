import { response } from "express";

interface ScheduleItems {
    week_day: string | number,
    from: number,
    to: number
}

function isBetween(time: number, from: number, to: number) {

    return ((time - from) * (time - to) <= 0)

}

function minMaxOutOfRange(range: Array<number>, from: number, to: number) {
    return ((range[0] < from) && (range[1] > to) === true)
}

export default function compareTimes(schedule: ScheduleItems, scheduleDB: Array<ScheduleItems>) {

    let response: boolean = false;

    scheduleDB.forEach((time: ScheduleItems) => {
        if (schedule.week_day == time.week_day) {

            const from = isBetween(schedule.from, time.from, time.to) as any
            const to = isBetween(schedule.to, time.from, time.to) as any

            if ((from === false) && (to === false)) {

                return response = minMaxOutOfRange([schedule.from, schedule.to], time.from, time.to)
            }

            return response = true

        } else {
            return response = false
        }
    })

    return response;
}