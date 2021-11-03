import { Image } from 'native-base'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {ImageCatatan} from '../../assets/images'
import { responsiveHeight, responsiveWidth } from '../../utils'

const Catatan = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image source={ImageCatatan} style={styles.image} alt="Gambar" />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("BottomTab", {screen: "Home"})} >
                <Text style={{color: "#fff",fontSize: 26 }}>Donasi Sekarang</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Catatan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    image: {
        height: responsiveHeight(358),
        width: responsiveWidth(336)
    },
    button: {
        paddingVertical: 20,
        backgroundColor: '#4FC5D0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: "100%",
        marginTop: 35
    }
})
