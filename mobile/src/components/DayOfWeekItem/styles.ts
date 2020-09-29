import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        marginBottom: 5,

        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#E6E6F0',
        borderRadius: 8,
        backgroundColor: '#FAFAFC',
    },

    fields: {
        width: "40%",

    },

    fieldsText: {
        color: "#6A6180",
        fontFamily: 'Archivo_700Bold'
    },

    icon: {
        resizeMode: "contain",
        transform: [{ rotate: '180deg' }]
    }
})

export default styles;