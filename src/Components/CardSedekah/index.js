import {Image, Progress} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../../utils';

const CardSedekah = ({navigation, data}) => {

  return (
    <TouchableOpacity style={styles.cardContent} onPress={() => navigation.navigate("DetailSedekah", data)} >
      <Image source={{uri: data.image}} style={styles.image} alt="ImageContent" />
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
