import { StyleSheet, View } from 'react-native'
import { colors } from '../global/color'

const FlatCard = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

export default FlatCard

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        margin:8,
        shadowColor:colors.black,
        elevation: 4,
    }
})