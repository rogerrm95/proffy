import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-community/picker'

// Estilos //
import styles from './styles'

interface SelectProps {
    label: string,
    options: Array<string>,
    value: number | string,
    height?: number,
    width?: number,
    getValue?: Function
    getLabel?: Function
}

const Select: React.FC<SelectProps> = ({ 
    label, options, getLabel, getValue, value, height, width }) => {

    return (
        <View style={styles.container}>

            <Text style={styles.label}>{label}</Text>

            <View style={styles.select}>
                <Picker
                    selectedValue={value}
                    onValueChange={((item, index) => {
                        getValue ? getValue(index) : null
                        getLabel ? getLabel(item) : null
                    })}
                    mode='dialog'
                    prompt='Selecione uma opção'
                    style={{ color: '#6A6180' }}>

                    {options.map((item: string, index) => {
                        return <Picker.Item value={index} label={item} key={index} />
                    })}

                </Picker>
        </View>
        </View >
    )
}

export default Select;