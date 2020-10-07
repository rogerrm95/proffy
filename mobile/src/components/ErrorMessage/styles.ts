import { StyleSheet } from 'react-native'


const style = StyleSheet.create({

    container: {
        position: 'absolute',
        top: 30,
        left: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#AD2523',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#FFF',
    },

    errorMessageBox: {
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        maxWidth: 250,
        marginLeft: 15,
    },

    errorMessage: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 12,
        color: '#FFF',
        width: "95%",
        textAlign: "center"
    }
})

export default style;