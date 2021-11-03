import React, {useState} from 'react';
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

const ZakatEmas = ({route, navigation}) => {
  const data = route.params;

  const [emas, setEmas] = useState('');
  const [perak, setPerak] = useState('');
  const [hargaEmas, setHargaEmas] = useState('');
  const [hargaPerak, setHargaPerak] = useState('');
  const [totalZakatPerak, setTotalZakatPerak] = useState('');
  const [totalZakatEmas, setTotalZakatEmas] = useState('');

  const nishabEmas = 85;
  const nishabPerak = 595;

  const CekTotalZakatEmas = () => {
    if (emas >= nishabEmas) {
      setTotalZakatEmas(hargaEmas * emas * 2.5 / 100)
      return (<Text style={styles.text5} >{totalZakatEmas}</Text>)
    }else{
      return <Text style={styles.text4} >Total Zakat Emas</Text>
    }
  };
  const CekTotalZakatPerak = () => {
    if (perak >= nishabPerak) {
      setTotalZakatPerak(hargaPerak * perak * 2.5 / 100)
      return (<Text style={styles.text5} >{totalZakatPerak}</Text>)
    }else{
      return <Text style={styles.text4} >Total Zakat Perak</Text>
    }
  };
  const TotalZakat = () => {
    if (perak >= nishabPerak || emas >= nishabEmas) {
      const Total = totalZakatEmas + totalZakatPerak
      return (<Text style={styles.text5} >{Total}</Text>)
    }else{
      return <Text style={styles.text4} >Total Zakat Emas & Perak</Text>
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
          <Text style={styles.text2}>Emas yang dimiliki</Text>
          <Input
            height="45px"
            fontSize="16px"
            placeholder="Emas dalam gram"
            mt="2.5"
            keyboardType="numeric"
            value={emas}
            onChangeText={value => {
              setEmas(value);
            }}
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Perak yang dimiliki</Text>
          <Input
            height="45px"
            fontSize="16px"
            placeholder="Perak dalam gram"
            mt="2.5"
            keyboardType="numeric"
            value={perak}
            onChangeText={value => {
              setPerak(value);
            }}
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Harga 1 gram Emas</Text>
          <Input
            height="45px"
            fontSize="16px"
            placeholder="Rupiah"
            mt="2.5"
            keyboardType="numeric"
            value={hargaEmas}
            onChangeText={value => {
              setHargaEmas(value);
            }}
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Harga 1 gram Perak</Text>
          <Input
            height="45px"
            fontSize="16px"
            placeholder="Rupiah"
            mt="2.5"
            keyboardType="numeric"
            value={hargaPerak}
            onChangeText={value => {
              setHargaPerak(value);
            }}
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Zakat Emas ( dibayar dengan uang )</Text>
          <View style={styles.total}>
            <CekTotalZakatEmas />
          </View>
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Zakat Perak ( dibayar dengan uang )</Text>
          <View style={styles.total}>
            <CekTotalZakatPerak />
          </View>
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Total</Text>
          <View style={styles.total}>
            <TotalZakat />
          </View>
          {/* Status */}
          <View style={{marginTop: 30}} />
          <Text style={styles.text2}>Status</Text>
          <View style={{marginTop: 10}} />
          {emas >= nishabEmas || perak >= nishabPerak ? (
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
              Nishab untuk jenis zakat ini adalah sebesar 85 gram Emas atau 595
              gram Perak. sedangkan zakatnya adalah sebesar 2,5% dan telah
              tersimpan selama 1 tahun Hijriyyah
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

export default ZakatEmas;

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
  text5: {
    color: '#000',
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
});
