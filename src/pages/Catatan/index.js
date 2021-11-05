import {Image, Link, Row, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDonasi} from '../../actions/DonasiAction';
import {Download, Upload} from '../../assets/icons';
import {File} from '../../assets/images';
import {formatNumber, responsiveWidth} from '../../utils';

const Catatan = ({navigation}) => {
  const dispatch = useDispatch();
  const riwayat = useSelector(state => state.DonasiReducer.donasiResult);

  const [center, setCenter] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      dispatch(getDonasi());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={{backgroundColor: "#fff"}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Riwayat</Text>
        </View>
        {riwayat ? (
          Object.keys(riwayat).map((value, index) => {
            const data = riwayat[value];
            return (
              <View style={styles.card} key={index}>
                <Text style={styles.text1}>
                  Nama:{'  '} {data.namaDonatur}
                </Text>
                <Text style={styles.text1}>
                  Email:{'  '} {data.email}
                </Text>
                <Text style={styles.text1}>
                  Nominal:{'  '} {formatNumber(data.nominalDonasi)}
                </Text>
                <Text style={styles.text1}>
                  Donasi:{'  '} {data.namaDonasi}
                </Text>
                <Text style={styles.text1}>
                  Metode:{'  '} {data.metode}
                </Text>
                <Text style={styles.text1}>
                  Status:{'  '} {data.status}
                </Text>
                <Row>
                  <Text style={styles.text1}>Bukti:{'  '}</Text>
                  <Link href={data.image}>
                    <Download />
                  </Link>
                </Row>
              </View>
            );
          })
        ) : (
          <View
            style={{
              width: '100%',
              height: '70%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50
            }}>
            <Image source={File} alt="Gambar" />
            <Text
              style={{
                fontSize: 24,
                color: '#000',
                textAlign: 'center',
                fontWeight: '600',
                marginTop: 50,
              }}>
              Anda belum memiliki Catatan Donasi
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('BottomTab', {screen: 'Home'})
              }>
              <Text style={{color: '#fff', fontSize: 22}}>Donasi Sekarang</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Catatan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 20,
    backgroundColor: '#4FC5D0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    marginTop: 35,
  },
  card: {
    width: responsiveWidth(373),
    marginTop: 20,
    paddingTop: 20,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: '#000',
    fontSize: 22,
    fontWeight: '500',
  },
  text1: {
    color: '#000',
    fontSize: 16,
  },
});
