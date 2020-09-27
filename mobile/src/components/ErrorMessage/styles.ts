import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    
    errorMessageBox: {
        flex: 1,
        position: 'absolute',
        top: 100,
        right: 50,
        width: 275,
        backgroundColor: '#B3201B',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },

    errorMessage: {
        fontFamily: "Archivo_700Bold",
        fontSize: 13,
        color: '#FFF',
        marginLeft: 5,
        width: "100%",
        textAlign: "center"
    }
})

export default style;