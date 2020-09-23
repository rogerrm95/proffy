import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
        height: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        backgroundColor: "#6842C2"
    },

    images: {
        resizeMode: "contain",
        width: 45,
        height: 45,
        flexDirection: "row",
        alignItems: 'center',
    },

    title: {
        color: "#D4C2FF",
        fontSize: 16,
        marginLeft: 5,
        marginBottom: 10
    },

})

export default styles;