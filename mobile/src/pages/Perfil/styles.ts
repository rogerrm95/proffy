import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    
    container:{
        height: "100%",
        backgroundColor: '#f0f0f7'
    },

    photoBox: {
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        marginBottom: 25

    },

    photo: {
        width: 115,
        height: 115,
        marginBottom: 10
    },

    name: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 22,
        color: '#FFF'
    },

    content:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5
    },

    scrollForms: {
        marginTop: -25,
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

    noTime:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#F0F0F7"
    },

    noTimeText:{
        color: "#8257E5",
        fontFamily: "Archivo_400Regular",
        fontSize: 14,
        marginRight: 10
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

    footerWarning:{
        marginVertical: 25,
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center"
    },

    importantText: {
        color: "#8257E5",
        fontSize: 16
    },

    legendText: {
        color: "#A0A0B2",
        fontSize: 13
    }
})

export default styles;