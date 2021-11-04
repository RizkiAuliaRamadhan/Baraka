import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Back} from '../../assets/icons';
import {formatNumber, responsiveHeight, responsiveWidth} from '../../utils';
import {Image, Input, Select, CheckIcon} from 'native-base';
import CurrencyInput from 'react-native-currency-input';
import {getData} from '../../utils/localStorage';

const ZakatPertanian = ({route, navigation}) => {
  const data = route.params;
  const nishab = 750;

  const [pertanian, setPertanian] = useState('');
  const [jenis, setJenis] = useState('');
  const [totalZakat, setTotalZakat] = useState('');
  const [focus, setFocus] = useState('#d6d3d1');

  const CekTotalZakat = () => {
    if (pertanian >= nishab) {
      if (jenis === 'biaya') {
        setTotalZakat((pertanian * 5) / 100);
        return <Text style={styles.text4}>{formatNumber(totalZakat)} KG</Text>;
      } else if (jenis === 'tanpaBiaya') {
        setTotalZakat((pertanian * 10) / 100);
        return <Text style={styles.text4}>{formatNumber(totalZakat)} KG</Text>;
      } else {
        return <Text style={styles.text4}>Jumlah Dalam KG</Text>;
      }
    } else {
      return <Text style={styles.text4}>Jumlah Dalam KG</Text>;
    }
  };

  const onSubmitZakat = () => {
    if (totalZakat) {
      getData('user').then(res => {
        if (res) {
          const datas = {
            image: data.image,
            name: data.name,
            namaDonatur: res.nama,
            email: res.email,
            uid: res.uid,
            tlp: res.tlp,
            kategori: data.kategori,
            id: data.id,
          };
          navigation.navigate('DetailDonasi2', datas);
        } else {
          Alert.alert('Maaf', 'Anda Belum Login', [
            {
              text: 'OK',
              onPress: () => {
                navigation.replace('BottomTab', {screen: 'Profile'});
              },
            },
          ]);
        }
      });
    } else {
      Alert.alert('Gagal', 'Form harus lengkap');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <Text style={styles.text}>Detail</Text>
        </View>
        {/* Detail Zakat */}
        <View style={styles.cardContent}>
          <Image
            style={styles.image}
            source={{uri: data.image}}
            alt="ImageContent"
          />
          <Text style={styles.text1}>Zakat {data.name}</Text>
        </View>
        {/* Kalkulator Zakat */}
        <View style={styles.cardKalkulator}>
          <Text style={styles.text2}>Biji - bijian & Buah - buahan</Text>
          <CurrencyInput
            value={pertanian}
            onChangeValue={setPertanian}
            delimiter="."
            precision={0}
            style={styles.input(focus)}
            onFocus={() => {
              setFocus('#38bdf8');
            }}
            onBlur={() => {
              setFocus('#d6d3d1');
            }}
            placeholder="Jumlah Dalam Kg"
            selectionColor="#000"
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Jenis Pengairan</Text>
          <Select
            height="45px"
            fontSize="16px"
            selectedValue={jenis}
            accessibilityLabel="Biaya 5% / Non Biaya 10%"
            placeholder="Biaya 5% / Non Biaya 10%"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={2.5}
            onValueChange={value => setJenis(value)}>
            <Select.Item label="Biaya" value="biaya" />
            <Select.Item label="Tanpa Biaya" value="tanpaBiaya" />
          </Select>
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Jumlah Zakat yang di keluarkan</Text>
          <View style={styles.total}>
            <CekTotalZakat />
          </View>
          <View style={{marginTop: 30}} />
          <Text style={styles.text2}>Status</Text>
          <View style={{marginTop: 10}} />
          {pertanian >= nishab ? (
            <View style={styles.success}>
              <Text style={styles.text3}>
                Mencapai nishab, anda Wajib Zakat
              </Text>
            </View>
          ) : (
            <View style={styles.warning}>
              <Text style={styles.text3}>
                Belum nishab, tidak dikenakan Wajib Zakat
              </Text>
            </View>
          )}
        </View>
        {/* Informasi */}
        <View style={{marginTop: 20, marginBottom: 20}}>
          <Text style={styles.text2}>Informasi</Text>
          <View style={{marginBottom: 10}} />
          <View style={styles.cardKalkulator}>
            <Text style={{color: '#000', fontSize: 12}}>
              Nishab untuk jenis zakat ini adalah sebesar 750 kg. Dikeluarkan
              saat panen sebesar 5% jika irigasinya menggunakan biaya, atau 10%
              jika diairi dengan air hujan/sungai (tanpa biaya).
            </Text>
          </View>
        </View>
        {/* button */}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {onSubmitZakat()}} >
        <Text style={styles.textButton}>Bayar Zakat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ZakatPertanian;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(30),
    paddingVertical: responsiveHeight(10),
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 22,
  },
  back: {
    position: 'absolute',
    left: 0,
  },
  cardContent: {
    width: responsiveWidth(373),
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  image: {
    height: responsiveHeight(225),
    width: '100%',
    borderRadius: 10,
  },
  text1: {
    fontSize: 18,
    color: '#000',
    marginTop: 20,
    fontWeight: '600',
  },
  cardKalkulator: {
    padding: 20,
    borderWidth: 0.5,
    borderColor: '#999',
    borderRadius: 5,
  },
  text2: {
    fontSize: 16,
    color: '#000',
  },
  success: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20BA67',
    paddingVertical: 15,
    borderRadius: 10,
  },
  warning: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E34624',
    paddingVertical: 15,
    borderRadius: 10,
  },
  text3: {
    color: '#fff',
    fontSize: 14,
  },
  text4: {
    color: '#999',
    fontSize: 16,
  },
  total: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 3,
    borderWidth: 0.2,
    borderColor: '#999',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#219FA6',
    height: responsiveHeight(65),
  },
  textButton: {
    fontSize: 20,
    color: '#fff',
  },
  input: focus => ({
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: focus,
    height: 45,
    fontSize: 16,
  }),
});
