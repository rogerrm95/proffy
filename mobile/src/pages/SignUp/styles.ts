import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    textDefault: {
        fontFamily: 'Poppins_600SemiBold',
        color: "#32264D"
    },

    container: {
        backgroundColor: "#E5E5E5",
        width: '100%',
        height: '100%',
        padding: 10,

    },

    header: {
        paddingVertical: 25,
        paddingHorizontal: 5,
        height: '10%'
    },

    content: {
        margin: 5,
    },

    title: {
        fontSize: 35,
        lineHeight: 42,
        padding: 5
    },

    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: "#6A6180",
        lineHeight: 24,
        marginRight: 125,
        padding: 5
    },

    form: {
        marginTop: 125
    },

    titleForm: {
        fontSize: 25,
        paddingBottom: 20
    },

    inputs: {
        backgroundColor: '#FFF',
        marginBottom: 5,
        borderRadius: 5
    },

    nextButton: {
        padding: 15,
        marginTop: 25,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },

    nextButtonText: {
        color: '#FFF',
        fontFamily: 'Poppins_600SemiBold',
    },

    nextButtonActive: {
        backgroundColor: '#04D361',
    },

    nextButtonDisable: {
        backgroundColor: '#DCDCE5'
    }
})

export default styles;