import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8257e5',
        justifyContent: "space-between",
    },
    
    header: {
        flexDirection: "column",
        paddingHorizontal: 25,
    },
    
    title: {
        fontFamily: "Archivo_700Bold",
        color: "#FFF",
        fontSize: 22,
        lineHeight: 28,
        maxWidth: 280,
        marginTop: 20,
    },

    description: {
        fontFamily: "Archivo_400Regular",
        fontSize: 15,
        color: "#D4C2FF",
        lineHeight: 22,
        maxWidth: 300,
        marginBottom: 75,
    },

    children:{
       paddingHorizontal: 24 
    },
})

export default styles;