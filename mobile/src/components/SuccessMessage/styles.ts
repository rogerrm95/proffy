import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257E5',
        padding: 40
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 36,
        lineHeight: 40,
        textAlign: "center",
    },

    description: {
        marginTop: 40,
        paddingHorizontal: 15,
        color: "#d4c2ff",
        fontSize: 16,
        lineHeight: 26,
        fontFamily: 'Poppins_400Regular',
        textAlign: "center",
    },

    okButton: {
        backgroundColor: '#04d361',
        marginVertical: 40,
        height: 58,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },

    iconHome:{
        marginRight: 15
    },

    okText: {
        color: "#FFF",
        fontSize: 20,
        fontFamily: "Archivo_700Bold",
    }
})

export default styles;