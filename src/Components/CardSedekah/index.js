import {Image, Progress} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Jumat, Kurma, Pekerja} from '../../assets/images';
import {responsiveHeight, responsiveWidth} from '../../utils';

const CardSedekah = ({navigation, data}) => {
  const ContentImage = () => {
    if (data.image === 'jumat') {
      return <Image source={Jumat} style={styles.image} alt="ImageContent" />;
    }
    if (data.image === 'kurma') {
      return <Image style={styles.image} source={Kurma} alt="ImageContent" />;
    }
    if (data.image === 'pekerja') {
      return <Image style={styles.image} source={Pekerja} alt="ImageContent" />;
    }
    return null;
  };

  return (
    <TouchableOpacity style={styles.cardContent}>
      <ContentImage />
      <Text style={styles.text}>{data.name}</Text>
    </TouchableOpacity>
  );
};

export default CardSedekah;

const styles = StyleSheet.create({
  cardContent: {
    width: responsiveWidth(373),
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  image: {
    width: responsiveWidth(327),
    height: responsiveHeight(147),
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
  },
});
