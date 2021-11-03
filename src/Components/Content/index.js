import {Image, Progress} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {formatNumber, responsiveHeight, responsiveWidth} from '../../utils';

const CardContent = ({navigation, data}) => {
  //progress
  const value = (data.donasi / data.total) * 100;

  return (
    <TouchableOpacity
      style={styles.cardContent}
      onPress={() => {
        navigation.navigate('DetailDonasi', data);
      }}>
      <Image
        source={{uri: data.image}}
        style={styles.image}
        alt="ImageContent"
      />
      <Text style={styles.text}>{data.name}</Text>
      <Progress mt="2.5" value={Math.round(value)} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.text2}>Rp {formatNumber(data.total)}</Text>
        <Text style={styles.text2}>{Math.round(value)}%</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardContent;

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
  text2: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
});
