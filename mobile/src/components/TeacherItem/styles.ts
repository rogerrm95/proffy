import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e6e6f0',
        marginBottom: 18,
        overflow: 'hidden'
    },

    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#eee"
    },

    profile: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 24,
    },

    profileInfo: {
        marginLeft: 16
    },

    name: {
        fontFamily: "Archivo_700Bold",
        color: '#32264d',
        fontSize: 19,
        paddingRight: 35
    },

    subject: {
        fontFamily: "Poppins_400Regular",
        color: '#6a6180',
        fontSize: 12,
        marginTop: 4
    },

    bio: {
        marginHorizontal: 0,
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        lineHeight: 24,
        color: "#6a6180",
        paddingBottom: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E6E6F0"
    },

    dayAndTime: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 45,
        marginBottom: 5
    },

    dayAndTimeText:{
        color: '#9C98A6',
        fontSize: 12,
        fontFamily: 'Poppins_400Regular' 
    },

    scrollweekDay:{
        height: 155,
        marginHorizontal: 25,
    },

    footer: {
        backgroundColor: "#fafafc",
        alignItems: "center",
        padding: 24,
        marginTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#E6E6F0'
    },

    cost: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        color: "#6a6180"
    },

    costValue: {
        fontFamily: "Archivo_700Bold",
        color: '#8257e5',
        fontSize: 16
    },

    containerButtons: {
        flexDirection: "row",
        marginTop: 16
    },

    favoriteButton: {
        backgroundColor: '#8257e5',
        width: 56,
        height: 56,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: 'center',
        marginRight: 8
    },

    favorited: {
        backgroundColor: '#e33d3d'
    },

    contactButton: {
        backgroundColor: '#04d361',
        flex: 1,
        flexDirection: "row",
        height: 56,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: 'center',
    },

    contactButtonText: {
        color: '#FFF',
        fontFamily: "Archivo_700Bold",
        fontSize: 16,
        marginLeft: 16
    }
});

export default styles;