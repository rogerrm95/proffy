import React from 'react'
import SelectCustom from '../SelectCustom'

import './style.css'

export interface DayOfWeekItemProps {
    week_day: string | number,
    from: number,
    to: number,
    userID: number
}

interface DayItemProps {
    times: Array<string> | any,
    week: string,
    keys: number,
}


const TimeOfWeekItem: React.FC<DayItemProps> = ({ week, keys, times }) => {

    const hasTime = times.length !== 0 ? true : false

    return (
        <div key={keys} id='day-item-container' className={hasTime ? '' : 'container-disable'}>
            <p>
                {week}
            </p>

            <span>Horário:</span>

            {
                times.length !== 0 ? <SelectCustom options={times} /> : <p> - </p>
            }
        </div>
    )
}

export default TimeOfWeekItem;