import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },

    boxHeader: {
        backgroundColor: '#8257E5',
        width: '100%',
        height: "50%",
        paddingHorizontal: 25,
        paddingVertical: 50
    },

    topbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 50
    },

    userPerfil: {
        flexDirection: "row",
        alignItems: 'center'
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 15
    },

    name: {
        color: '#d4c2ff',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular'
    },

    buttonPerfil:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },

    buttonLogout:{
        backgroundColor: '#774DD6',
        padding: 12,
        borderRadius: 15
    },

    banner: {
        width: "100%",
        resizeMode: "contain",
    },

    boxContent: {
        backgroundColor: '#F0F0F7',
        width: '100%',
        height: "50%",
        paddingHorizontal: 25,
        justifyContent: "center"
    },

    title: {
        color: '#6A6180',
        fontSize: 20,
        fontFamily: 'Poppins_400Regular',
        lineHeight: 30,
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold',
    },

    buttonsContainers: {
        flexDirection: "row",
        marginTop: 40,
        justifyContent: "space-between"
    },

    button: {
        height: 150,
        width: '48%',
        backgroundColor: '#000',
        borderRadius: 8,
        padding: 24,
        justifyContent: "space-between"
    },

    buttonPrimary: {
        backgroundColor: '#9871f5'
    },

    buttonSecondary: {
        backgroundColor: '#04d361'
    },

    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontFamily: "Archivo_700Bold"
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#9C98A6',
        lineHeight: 20,
        maxWidth: 125,
        marginTop: 40

    }
})

export default styles;