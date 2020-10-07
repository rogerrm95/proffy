import { StyleSheet, Dimensions } from 'react-native'

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        height: 350,
        width: "100%",
        backgroundColor: "#9871F5",
        justifyContent: "center",
        alignItems: "center",
    },

    logo:{
        width: '100%',
        height: '100%'
    }
})

export default styles;