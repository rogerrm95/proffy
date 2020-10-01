import React, { useEffect, useState } from 'react'
import { View, Text, Picker, PickerProps } from 'react-native'

// Estilos //
import styles from './styles'

interface SelectProps extends PickerProps {
    label: string,
    options: Array<string>,
    labelStyle?: labelStyleProps,
    selectStyle?: SelectStyleProps,
}

interface labelStyleProps {
    colorText?: string,
    fontSize?: number,
}

interface SelectStyleProps {
    backgroundColor: string,
    height?: number,
    width?: number
}

const Select: React.FC<SelectProps> = ({
    label, options, labelStyle, selectStyle, ...rest }) => {

    const [labelStyles, setLabelStyles] = useState({})
    const [selectStyles, setSelectStyles] = useState({})

    // Verifica se o usuário utilizou o labelStyle, se sim, atribui os valores, senão styles receberá um objeto vazio //
    useEffect(() => {

        if (labelStyle) {
            setLabelStyles({
                color: labelStyle.colorText ? labelStyle.colorText : null,
                fontSize: labelStyle.fontSize ? labelStyle.fontSize : null
            })
        }
    }, [labelStyle])

    // Verifica se o usuário utilizou o selectStyle, se sim, atribui os valores, senão styles receberá um objeto vazio //
    useEffect(() => {

        if (selectStyle) {
            setSelectStyles({
                backgroundColor: selectStyle.backgroundColor ? selectStyle.backgroundColor : null,
                height: selectStyle.height ? selectStyle.height : "auto",
                width: selectStyle.width ? selectStyle.width : "100%"
            })
        }
    }, [selectStyle])

    return (
        <View style={styles.container}>

            <Text style={[styles.label, labelStyles]}>
                {label}
            </Text>

            <View style={[styles.select, selectStyles]}>
                <Picker
                    mode='dialog'
                    prompt='Selecione uma opção'
                    style={{ color: '#6A6180' }}
                    {...rest}>
                    
                    {
                        options.map((item: string, index: number) => {
                            return <Picker.Item value={item} label={item} key={index} />
                        })
                    }

                </Picker>
            </View>
        </View >
    )
}

export default Select;