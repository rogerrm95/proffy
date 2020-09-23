import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    login: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginForms: {
        width: 350,
        height: 400,
        marginTop: 25,
        padding: 20,

    },

    elements: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 30,
    },

    loginText: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 24,
        color: '#32264D'
    },

    createAccount: {
        color: '#8257E5',
        fontFamily: 'Poppins_400Regular',
        fontSize: 13,
    },

    inputs: {
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginBottom: 10
    },

    inputPasswordBox: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    inputPassword: {
        width: '90%'
    },

    toggleHidePassword: {
        width: 40,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    loginButton: {
        justifyContent: 'center',
        borderRadius: 5,
        height: 50,
    },

    loginButtonText: {
        color: "#FFF",
        fontFamily: "Archivo_700Bold",
        fontSize: 25,
        textAlign: "center"
    },

    activeButton: {
        backgroundColor: '#04D361',
    },

    inativeButton: {
        backgroundColor: '#DCDCE5',
    },

    checkboxContent: {
        flexDirection: "row",
        alignItems: 'flex-end'
    },

    checkboxText: {
        color: "#9C98A6",
        fontFamily:'Poppins_400Regular',
        fontSize: 12
    },

    forgotPasswordText:{
        color: "#9C98A6",
        fontFamily:'Poppins_400Regular',
        fontSize: 13
    }
})

export default styles;
