import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Back} from '../../assets/icons';
import {formatNumber, responsiveHeight, responsiveWidth} from '../../utils';
import {Image, Input, Select, CheckIcon} from 'native-base';

const ZakatPertanian = ({route, navigation}) => {
  const data = route.params;
  const nishab = 750;

  const [pertanian, setPertanian] = useState('');
  const [jenis, setJenis] = useState('');
  const [totalZakat, setTotalZakat] = useState('');

  const CekTotalZakat = () => {
    if (pertanian >= nishab) {
      if (jenis === 'biaya') {
        setTotalZakat((pertanian * 5) / 100);
        return <Text style={styles.text4}>{totalZakat} KG</Text>;
      } else if (jenis === 'tanpaBiaya') {
        setTotalZakat((pertanian * 10) / 100);
        return <Text style={styles.text4}>{totalZakat} KG</Text>;
      } else {
        return <Text style={styles.text4}>Jumlah Dalam KG</Text>;
      }
    } else {
      return <Text style={styles.text4}>Jumlah Dalam KG</Text>;
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
          <Input
            height="45px"
            fontSize="16px"
            placeholder="Jumlah dalam KG"
            mt="2.5"
            keyboardType="numeric"
            value={pertanian}
            onChangeText={value => {
              setPertanian(value);
            }}
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
      <TouchableOpacity style={styles.button}>
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
    height: responsiveHeight(65)
  },
  textButton: {
    fontSize: 20,
    color: '#fff'
  }
});
