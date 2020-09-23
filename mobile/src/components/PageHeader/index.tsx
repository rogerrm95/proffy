import React, { Children, ReactNode } from 'react'
import { View, Image, Text } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

// Componentes //
import TopBarHeader from '../TopBarHeader';

// Icons and Images //


// Styles //
import styles from './styles';

interface PageHeaderProps {
    title: string,
    labelTop: string
    description?: string,
    headerButton?: ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ labelTop, title, description, headerButton, children }) => {

    const { navigate } = useNavigation()

    function handleToLandingPage() {
        navigate('Landing')
    }

    return (
        <View style={styles.container}>

            <TopBarHeader title={labelTop} />

            <View style={styles.header}>
                <Text style={styles.title}>
                    {title}
                </Text>

                {description ?
                    <Text style={styles.description}>
                        {"\n" + description}
                    </Text>
                    : null}

                {headerButton}

            </View>

            <View style={styles.children}>
                {children}
            </View>

        </View>
    )
}

export default PageHeader;