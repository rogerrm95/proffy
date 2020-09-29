import React from 'react'
import { View, Text, Image } from 'react-native';

// Icones //
import backIcon from './../../assets/images/icons/back.png'

// Estilo
import styles from './styles'

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

const DayOfWeekItem: React.FC<DayItemProps> = ({ keys, times, week }) => {

    return (
        <View style={styles.container} key={keys}>

            {
                times.length !== 0 ?
                    times.map((time: string) => {
                        return (
                            <>
                                <View style={styles.fields}>
                                    <Text style={styles.fieldsText}>{week}</Text>
                                </View>
                                <Image source={backIcon} style={styles.icon} />

                                <View style={styles.fields}>
                                    <Text style={[styles.fieldsText, { textAlign: 'right' }]}>{time}</Text>
                                </View>
                            </>

                        )
                    })
                    :
                    <>
                        <View style={[styles.fields, { opacity: 0.2 }]}>
                            <Text style={styles.fieldsText}>{week}</Text>
                        </View>
                        <Image source={backIcon} style={styles.icon} />

                        <View style={[styles.fields, { opacity: 0.2 }]}>
                            <Text style={[styles.fieldsText, { textAlign: 'center' }]}>---</Text>
                        </View>
                    </>

            }
        </View>
    )
}

export default DayOfWeekItem;