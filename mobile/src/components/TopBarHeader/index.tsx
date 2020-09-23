import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

// Icones e Imagens //
import Icon from 'react-native-vector-icons/Feather'
import logo from './../../assets/images/logo.png'

// Estilos //
import styles from './styles';

interface TopBarHeaderProps {
    title: string
}

const TopBarHeader: React.FC<TopBarHeaderProps> = ({ title }) => {

    function handleToLandingPage(){
    }

    return (
        <View style={styles.container}>

            <BorderlessButton onPress={handleToLandingPage} style={styles.images}>
                <Icon name={'arrow-left'} color={'#FFF'} size={25}/>
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            <Image source={logo} style={styles.images}/>
        </View>
    )
}

export default TopBarHeader;