export default function convertMinutesInHours(minutes: Number) {

    let time = (Number(minutes) / 60)

    let hour;

    if (Number.isInteger(time)) {

        hour = `${time.toString()}:00`

        return hour
    }

    else {

        const hourAsFloat = String(time).split('.') as Array<any>

        hourAsFloat[1] = `0.${hourAsFloat[1]}`
        hourAsFloat[1] = (hourAsFloat[1] * 60).toFixed()

        hour = `${hourAsFloat[0]}:${hourAsFloat[1]}`

        return hour
    }

    return hour;
}
