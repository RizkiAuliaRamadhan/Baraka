import {Image} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDonasi} from '../../actions/DonasiAction';
import {File} from '../../assets/images';
import {responsiveWidth} from '../../utils';
import {getData} from '../../utils/localStorage';

const Catatan = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [uid, setUid] = useState('');

  const dispatch = useDispatch();
  const riwayat = useSelector(state => state.DonasiReducer.donasiResult);
  console.log(riwayat);

  const getUserData = () => {
    getData('user').then(res => {
      const data = res;
      setUid(data.uid);
      dispatch(getDonasi(data.uid));
    });
  };

  useEffect(() => {
    getUserData();
    setTimeout(() => {
      dispatch(getDonasi(uid));
    }, 100)
  }, []);

  return (
    <View style={styles.container}>
      {riwayat ? (
        Object.keys(riwayat).map((value, index) => {
          const data = riwayat[value];
          return (
            <View style={styles.card} key={index}>
              <Text>{data.namaDonatur}</Text>
            </View>
          );
        })
      ) : (
        <>
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
            onPress={() => navigation.navigate('BottomTab', {screen: 'Home'})}>
            <Text style={{color: '#fff', fontSize: 22}}>Donasi Sekarang</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Catatan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
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
  },
});
