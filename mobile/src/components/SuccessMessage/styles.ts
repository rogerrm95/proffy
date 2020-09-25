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
        justifyContent: "center",
    },

    title: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        fontSize: 34,
        lineHeight: 40,
        maxWidth: 250
    },

    description: {
        marginTop: 24,
        color: "#d4c2ff",
        fontSize: 18,
        lineHeight: 28,
        fontFamily: 'Poppins_400Regular',
        textAlign: "justify",
        maxWidth: 250,
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