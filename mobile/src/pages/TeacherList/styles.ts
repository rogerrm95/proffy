import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: '#f0f0f7'
    },

    filter:{
        borderBottomWidth: 1,
        borderColor: "#9871F5",
        marginVertical: 5,
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

    searchForm: {
        marginBottom: 15
    },

    inputGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    inputBlock: {
        width: "50%"
    },

    submitButton: {
        backgroundColor: '#04d361',
        height: 52,
        marginVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 8,
    },

    submitButtonText: {
        marginLeft: 10,
        color: '#FFF',
        fontFamily: "Archivo_700Bold",
        fontSize: 20,
        letterSpacing: 2
    },

    teacherList: {
        marginTop: -20,
    },

    withoutResults: {
        justifyContent: "center",
        alignItems: "center",
        height: 500,
    },

    withoutResultsMessage:{
        color: "#C1BCCC",
        fontSize: 18,
        fontFamily: 'Archivo_700Bold',
        marginTop: 10
    },

    withResults:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        padding: 10,
        borderRadius: 8
    },

    withResultsMessage:{
        color: "#6A6180",
        marginLeft: 15
    },
})

export default styles;