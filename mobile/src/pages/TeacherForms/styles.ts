import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: '#f0f0f7',
    },

    content:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    scroll:{
        marginTop: -40,
        width: '90%',
        backgroundColor: '#FFF',
        paddingBottom: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e6e6f0',
        overflow: "hidden"
    },

    formGroup: {
        marginHorizontal: 16
    },

    profile:{
        flexDirection: "row",
        alignItems: 'center',
        padding: 15,
    },

    avatar: {
        width: 70,
        height: 70,
        resizeMode: "contain",
        borderRadius: 50,
        marginRight: 15
    },

    name:{
        maxWidth: 175,
        color: "#32264D",
        fontFamily: 'Archivo_700Bold',
        fontSize: 20,
    },

    subject: {
        color: "#6A6180",
        fontFamily: 'Archivo_400Regular',
        fontSize: 12,
    },

    buttonNewSchedule:{
        marginLeft: 25,
        backgroundColor: '#8257E5',
        padding: 10,
        borderRadius: 8
    },

    buttonNewScheduleText: {
        color: "#FFF",
        fontFamily: "Archivo_700Bold",
        fontSize: 14
    },

    timeInputs:{
        width: 160,
        flexDirection: "row",
        alignItems: "center"
    },

    scheduleLine:{
        backgroundColor: '#E6E6F0',
        marginVertical: 25,
        height: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonDeleteItem: {
        padding: 10,
        backgroundColor: "#FFF"
    },

    buttonDeleteItemText: {
        color: '#E33D3D',
        fontFamily: "Archivo_700Bold",
        fontSize: 16
    },

    footer: {
        backgroundColor: "#FAFAFC",
        marginTop: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#E6E6F0"
    },

    buttonSubmit: {
        backgroundColor: "#04D361",
        height: 55,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 8
    },

    buttonSubmitText: {
        color: '#FFF',
        fontFamily: "Archivo_700Bold",
        fontSize: 20
    },

    buttonDesable:{
        backgroundColor: '#DCDCE5'
    },

    buttonDesableText:{
        backgroundColor: '#9C98A6'
    },

    footerWarning:{
        marginVertical: 25,
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center"
    },

    importantText: {
        color: "#8257E5",
        fontSize: 15
    },

    legendText: {
        color: "#A0A0B2",
        fontSize: 13
    },

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
    
    errorMessage:{
        fontFamily: "Archivo_700Bold",
        fontSize: 13,
        color: '#FFF',
        marginLeft: 5,
        width: "100%",
        textAlign: "center"
    }
})

export default styles;