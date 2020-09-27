import React, { useState, useEffect } from 'react'
import { View, Text, TextInputProps } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

// Estilos //
import styles from './styles'

interface InputsProps extends TextInputProps {
    label: string,
    labelStyle?: labelStyleProps,
    inputStyle?: InputStyleProps
}

interface labelStyleProps {
    colorText: string,
    fontSize?: number
}

interface InputStyleProps {
    backgroundColor: string,
    colorText?: string,
    fontSize?: number,
    width?: number | string,
    height?: number | string
}

const Inputs: React.FC<InputsProps> = ({ label, labelStyle, inputStyle, ...rest }) => {

    const [labelStyles, setLabelStyles] = useState({})
    const [inputStyles, setInputStyles] = useState({})

    // Verifica se o usuário utilizou o labelStyle, se sim, atribui os valores, senão styles receberá um objeto vazio //
    useEffect(() => {

        if (labelStyle) {
            setLabelStyles({
                color: labelStyle.colorText ? labelStyle.colorText : null,
                fontSize: labelStyle.fontSize ? labelStyle.fontSize : null
            })
        }
    }, [labelStyle])

    // Verifica se o usuário utilizou o inputStyles, se sim, atribui os valores, senão styles receberá um objeto vazio //
    useEffect(() => {

        if (inputStyle) {
            setInputStyles({
                backgroundColor: inputStyle.backgroundColor ? inputStyle.backgroundColor : null,
                color: inputStyle.colorText ? inputStyle.colorText : '#6A6180',
                fontSize: inputStyle.fontSize ? inputStyle.fontSize : null,
                width: inputStyle.width ? inputStyle.width : null,
                height: inputStyle.height ? inputStyle.height : null
            })
        }
    }, [inputStyle])

    return (
        <View style={[styles.container]}>

            <Text style={[styles.label, labelStyles]}>{label}</Text>

            <TextInput style={[styles.input, inputStyles]}{...rest} />

        </View>
    )
}

export default Inputs;