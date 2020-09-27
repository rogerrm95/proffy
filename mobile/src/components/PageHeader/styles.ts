import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8257e5',
        justifyContent: "space-between",
        minHeight: 250
    },
    
    header: {
        flexDirection: "column",
        paddingHorizontal: 25,
        paddingBottom: 25,
    },
    
    title: {
        fontFamily: "Archivo_700Bold",
        color: "#FFF",
        fontSize: 22,
        lineHeight: 28,
        maxWidth: 250,
        marginTop: 10,
    },

    description: {
        fontFamily: "Archivo_400Regular",
        fontSize: 15,
        color: "#D4C2FF",
        lineHeight: 22,
        maxWidth: 300,
        marginBottom: 50,
    },

    children:{
       paddingHorizontal: 24 
    },
})

export default styles;