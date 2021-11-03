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

  const [cekNishab, setCekNishab] = useState('');
  const [hargaEmas, setHargaEmas] = useState('');
  const [hargaPerak, setHargaPerak] = useState('');
  const [nishab, setNishab] = useState('');
  const [uangTunai, setUangTunai] = useState('');
  const [surat, setSurat] = useState('');
  const [piutang, setPiutang] = useState('');
  const [totalHarta, setTotalHarta] = useState('');
  const [hutang, setHutang] = useState('');
  const [kewajiban, setKewajiban] = useState('');

  const [selisihHarta, setSelisihHarta] = useState('');

  const CekTotalNishab = () => {
    if (hargaEmas !== '') {
      setNishab(hargaEmas * 85);
      return <Text style={styles.text5}>{formatNumber(nishab)}</Text>;
    } else if (hargaPerak !== '') {
      setNishab(hargaPerak * 595);
      return <Text style={styles.text5}>Rp {formatNumber(nishab)}</Text>;
    } else {
      return <Text style={styles.text4}>Rupiah</Text>;
    }
  };

  const CekTotalHarta = () => {
    if (uangTunai !== '' && surat !== '' && piutang !== '') {
      setTotalHarta(parseInt(uangTunai) + parseInt(surat) + parseInt(piutang));
      return <Text style={styles.text5}>{formatNumber(totalHarta)}</Text>;
    } else if (uangTunai !== '' && surat !== '') {
      setTotalHarta(parseInt(uangTunai) + parseInt(surat));
      return <Text style={styles.text5}>{formatNumber(totalHarta)}</Text>;
    } else if (uangTunai !== '' && piutang !== '') {
      setTotalHarta(parseInt(uangTunai) + parseInt(piutang));
      return <Text style={styles.text5}>{formatNumber(totalHarta)}</Text>;
    } else if (uangTunai !== '') {
      setTotalHarta(parseInt(uangTunai));
      return <Text style={styles.text5}>{formatNumber(totalHarta)}</Text>;
    } else {
      return <Text style={styles.text4}>Rupiah</Text>;
    }
  };

  const SelisihHartaKewajiban = () => {
    if (hutang !== '' && kewajiban !== '') {
      setSelisihHarta(totalHarta - (parseInt(hutang) + parseInt(kewajiban)));
      return <Text style={styles.text5}>{formatNumber(selisihHarta)}</Text>;
    } else if (hutang !== '') {
      setSelisihHarta(totalHarta - parseInt(hutang));
      return <Text style={styles.text5}>{formatNumber(selisihHarta)}</Text>;
    } else if (kewajiban !== '') {
      setSelisihHarta(totalHarta - parseInt(kewajiban));
      return <Text style={styles.text5}>{formatNumber(selisihHarta)}</Text>;
    } else {
      return <Text style={styles.text4}>Rupiah</Text>;
    }
  };

  const Zakat = () => {
    if (selisihHarta !== '') {
      if (selisihHarta >= nishab) {
        const totalZakat = (selisihHarta * 2.5) / 100;
        return <Text style={styles.text5}>{formatNumber(totalZakat)}</Text>;
      } else {
        return <Text style={styles.text4}>Tidak wajib zakat</Text>;
      }
    } else {
      return <Text style={styles.text4}>Rupiah</Text>;
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
          <Text style={styles.text2}>Nishab yang digunakan</Text>
          <Select
            height="45px"
            fontSize="16px"
            selectedValue={cekNishab}
            accessibilityLabel="Emas / Perak"
            placeholder="Emas / Perak"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={2.5}
            onValueChange={value => setCekNishab(value)}>
            <Select.Item label="Emas" value="emas" />
            <Select.Item label="Perak" value="perak" />
          </Select>
          <View style={{marginTop: 20}} />
          {cekNishab === 'emas' ? (
            <>
              <Text style={styles.text2}>Harga 1 Gram Emas</Text>
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
            </>
          ) : cekNishab === 'perak' ? (
            <>
              <Text style={styles.text2}>Harga 1 Gram Perak</Text>
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
            </>
          ) : (
            <></>
          )}
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Nishab</Text>
          <View style={styles.total}>
            <CekTotalNishab />
          </View>
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Uang Tunai & Tabungan</Text>
          <Input
            height="45px"
            fontSize="16px"
            placeholder="Rupiah"
            mt="2.5"
            keyboardType="numeric"
            value={uangTunai}
            onChangeText={value => {
              setUangTunai(value);
            }}
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Surat Berharga</Text>
          <Input
            height="45px"
            fontSize="16px"
            placeholder="Rupiah"
            mt="2.5"
            keyboardType="numeric"
            value={surat}
            onChangeText={value => {
              setSurat(value);
            }}
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Piutang</Text>
          <Input
            height="45px"
            fontSize="16px"
            placeholder="Rupiah"
            mt="2.5"
            keyboardType="numeric"
            value={piutang}
            onChangeText={value => {
              setPiutang(value);
            }}
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Total Harta</Text>
          <View style={styles.total}>
            <CekTotalHarta />
          </View>
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Hutang</Text>
          <Input
            height="45px"
            fontSize="16px"
            placeholder="Rupiah"
            mt="2.5"
            keyboardType="numeric"
            value={hutang}
            onChangeText={value => {
              setHutang(value);
            }}
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Total Kewajiban</Text>
          <Input
            height="45px"
            fontSize="16px"
            placeholder="Rupiah"
            mt="2.5"
            keyboardType="numeric"
            value={kewajiban}
            onChangeText={value => {
              setKewajiban(value);
            }}
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Selisih Harta & Kewajiban</Text>
          <View style={styles.total}>
            <SelisihHartaKewajiban />
          </View>
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Zakat</Text>
          <View style={styles.total}>
            <Zakat />
          </View>
          {/* Status */}
          <View style={{marginTop: 30}} />
          <Text style={styles.text2}>Status</Text>
          <View style={{marginTop: 10}} />
          {selisihHarta >= nishab ? (
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
    height: responsiveHeight(65),
  },
  textButton: {
    fontSize: 20,
    color: '#fff',
  },
  text5: {
    color: '#000',
    fontSize: 16,
  },
});
