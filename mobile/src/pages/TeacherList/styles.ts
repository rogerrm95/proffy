import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: '#f0f0f7'
    },

    filter:{
        borderBottomWidth: 1,
        borderColor: "#9871F5",
        marginVertical: 30,
    },

    filterButton:{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 5,
        paddingVertical: 10
    },

    filterText: {
        color: '#BDA5F6',
        borderStyle: "solid",
        marginLeft: 10,
        marginRight: 115
    },

    teacherList: {
        marginTop: -40,
    },

    searchForm: {
        marginBottom: 8
    },

    label: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff'
    },

    input: {
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16
    },

    inputGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    inputBlock: {
        width: "48%"
    },

    submitButton: {
        backgroundColor: '#04d361',
        flexDirection: "row",
        height: 56,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: 'center',
    },

    submitButtonText: {
        color: '#FFF',
        fontFamily: "Archivo_700Bold",
        fontSize: 16
    }
})

export default styles;