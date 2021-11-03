import {Image} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Title} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../utils';

const About = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informasi Aplikasi</Text>
      <Image source={Title} style={{marginTop: 65}} alt="Gambar" />
      <Text style={styles.text}>BARAKA adalah platform aplikasi berbasis Mobile  untuk menggalang dana , membayar Zakat dan donasi kemanusiaan. </Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 67,
  },
  title: {
    color: '#000',
    fontSize: 24,
    marginTop: -65,
  },
  text: {
      marginTop: 20,
      color: "#000",
      fontSize: 18,
      textAlign: 'justify'
  }
});
