import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    body: {
        height: "100%",
        margin: 15
    },

    backIcon: {
        margin: 5
    },

    title:{
       fontFamily: 'Poppins_600SemiBold',
       fontSize: 24,
       color: '#32264D',
       marginTop: 40,
    },

    description:{
        color: '#6A6180',
        fontFamily: 'Poppins_400Regular',
        fontSize: 13,
        marginVertical: 20,
        paddingRight: 200,
        lineHeight: 20
    },

    warningLabel:{
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#FF0000'
    },

    warningText:{
        color: '#FF0000',
        fontWeight: "bold"
    },

    inviteButton: {
        padding: 15,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },

    inviteButtonText: {
        color: '#FFF',
        fontFamily: 'Poppins_600SemiBold',
    },

    inviteButtonActive: {
        backgroundColor: '#04D361',
    },

    inviteButtonDisable: {
        backgroundColor: '#DCDCE5'
    }
})

export default styles;