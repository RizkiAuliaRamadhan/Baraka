import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils';
import {Image} from 'native-base';
import {Sedekah, Zakat, Donasi} from '../../assets/images';

const Kategori = ({name, onPress}) => {
  const KategoriImage = () => {
    if (name === 'Sedekah') {
      return (
        <Image
          source={Sedekah}
          width={responsiveWidth(60)}
          height={responsiveHeight(60)}
          alt="Sedekah"
        />
      );
    }
    if (name === 'Zakat') {
      return (
        <Image
          source={Zakat}
          width={responsiveWidth(60)}
          height={responsiveHeight(60)}
          alt="Zakat"
        />
      );
    }
    if (name === 'Donasi') {
      return (
        <Image
          source={Donasi}
          width={responsiveWidth(60)}
          height={responsiveHeight(60)}
          alt="Donasi"
        />
      );
    }
  };
  return (
    <TouchableOpacity onPress = {onPress}>
      <View style={styles.boxKategori}>
        <KategoriImage />
      </View>
      <Text style={styles.textKategori}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Kategori;

const styles = StyleSheet.create({
  boxKategori: {
    backgroundColor: '#F7FAFF',
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKategori: {
    color: '#111',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
