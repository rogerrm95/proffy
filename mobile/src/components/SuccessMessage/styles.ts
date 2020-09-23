import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257E5',
        justifyContent: 'center',
        padding: 40
    },

    content: {
        flex: 1,
        justifyContent: "center"
    },

    title: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 32,
        lineHeight: 37,
        maxWidth: 200
    },

    description: {
        marginTop: 24,
        color: "#d4c2ff",
        fontSize: 16,
        lineHeight: 26,
        fontFamily: 'Poppins_400Regular',
        maxWidth: 240
    },

    okButton: {
        backgroundColor: '#04d361',
        marginVertical: 40,
        height: 58,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },

    okText: {
        color: "#FFF",
        fontSize: 16,
        fontFamily: "Archivo_700Bold",
    }
})

export default styles;