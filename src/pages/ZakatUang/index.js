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
  const [totalSemua, setTotalSemua] = useState('');

  const [focus, setFocus] = useState('#d6d3d1');
  const [focus1, setFocus1] = useState('#d6d3d1');
  const [focus2, setFocus2] = useState('#d6d3d1');
  const [focus3, setFocus3] = useState('#d6d3d1');
  const [focus4, setFocus4] = useState('#d6d3d1');
  const [focus5, setFocus5] = useState('#d6d3d1');

  const CekTotalNishab = () => {
    if (hargaEmas !== '') {
      setNishab(hargaEmas * 85);
      return <Text style={styles.text5}>Rp {formatNumber(nishab)}</Text>;
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
      return <Text style={styles.text5}>Rp {formatNumber(totalHarta)}</Text>;
    } else if (uangTunai !== '' && surat !== '') {
      setTotalHarta(parseInt(uangTunai) + parseInt(surat));
      return <Text style={styles.text5}>Rp {formatNumber(totalHarta)}</Text>;
    } else if (uangTunai !== '' && piutang !== '') {
      setTotalHarta(parseInt(uangTunai) + parseInt(piutang));
      return <Text style={styles.text5}>Rp {formatNumber(totalHarta)}</Text>;
    } else if (uangTunai !== '') {
      setTotalHarta(parseInt(uangTunai));
      return <Text style={styles.text5}>Rp {formatNumber(totalHarta)}</Text>;
    } else {
      return <Text style={styles.text4}>Rupiah</Text>;
    }
  };

  const SelisihHartaKewajiban = () => {
    if (hutang !== '' && kewajiban !== '') {
      setSelisihHarta(totalHarta - (parseInt(hutang) + parseInt(kewajiban)));
      return <Text style={styles.text5}>Rp {formatNumber(selisihHarta)}</Text>;
    } else if (hutang !== '') {
      setSelisihHarta(totalHarta - parseInt(hutang));
      return <Text style={styles.text5}>Rp {formatNumber(selisihHarta)}</Text>;
    } else if (kewajiban !== '') {
      setSelisihHarta(totalHarta - parseInt(kewajiban));
      return <Text style={styles.text5}>Rp {formatNumber(selisihHarta)}</Text>;
    } else {
      return <Text style={styles.text4}>Rupiah</Text>;
    }
  };

  const Zakat = () => {
    if (selisihHarta !== '') {
      if (selisihHarta >= nishab) {
        setTotalSemua((selisihHarta * 2.5) / 100);
        return <Text style={styles.text5}>Rp {formatNumber(totalSemua)}</Text>;
      } else {
        return <Text style={styles.text4}>Tidak wajib zakat</Text>;
      }
    } else {
      return <Text style={styles.text4}>Rupiah</Text>;
    }
  };

  const onSubmitZakat = () => {
    if (totalSemua) {
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
            total: totalSemua,
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
              <CurrencyInput
                value={hargaEmas}
                onChangeValue={setHargaEmas}
                prefix="Rp "
                delimiter="."
                precision={0}
                style={styles.input(focus)}
                onFocus={() => {
                  setFocus('#38bdf8');
                }}
                onBlur={() => {
                  setFocus('#d6d3d1');
                }}
                placeholder="Rupiah"
                selectionColor="#000"
              />
            </>
          ) : cekNishab === 'perak' ? (
            <>
              <Text style={styles.text2}>Harga 1 Gram Perak</Text>
              <CurrencyInput
                value={hargaPerak}
                onChangeValue={setHargaPerak}
                prefix="Rp "
                delimiter="."
                precision={0}
                style={styles.input(focus)}
                onFocus={() => {
                  setFocus('#38bdf8');
                }}
                onBlur={() => {
                  setFocus('#d6d3d1');
                }}
                placeholder="Rupiah"
                selectionColor="#000"
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
          <CurrencyInput
            value={uangTunai}
            onChangeValue={setUangTunai}
            prefix="Rp "
            delimiter="."
            precision={0}
            style={styles.input(focus1)}
            onFocus={() => {
              setFocus1('#38bdf8');
            }}
            onBlur={() => {
              setFocus1('#d6d3d1');
            }}
            placeholder="Rupiah"
            selectionColor="#000"
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Surat Berharga</Text>
          <CurrencyInput
            value={surat}
            onChangeValue={setSurat}
            prefix="Rp "
            delimiter="."
            precision={0}
            style={styles.input(focus2)}
            onFocus={() => {
              setFocus2('#38bdf8');
            }}
            onBlur={() => {
              setFocus2('#d6d3d1');
            }}
            placeholder="Rupiah"
            selectionColor="#000"
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Piutang</Text>
          <CurrencyInput
            value={piutang}
            onChangeValue={setPiutang}
            prefix="Rp "
            delimiter="."
            precision={0}
            style={styles.input(focus3)}
            onFocus={() => {
              setFocus3('#38bdf8');
            }}
            onBlur={() => {
              setFocus3('#d6d3d1');
            }}
            placeholder="Rupiah"
            selectionColor="#000"
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Total Harta</Text>
          <View style={styles.total}>
            <CekTotalHarta />
          </View>
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Hutang</Text>
          <CurrencyInput
            value={hutang}
            onChangeValue={setHutang}
            prefix="Rp "
            delimiter="."
            precision={0}
            style={styles.input(focus4)}
            onFocus={() => {
              setFocus4('#38bdf8');
            }}
            onBlur={() => {
              setFocus4('#d6d3d1');
            }}
            placeholder="Rupiah"
            selectionColor="#000"
          />
          <View style={{marginTop: 20}} />
          <Text style={styles.text2}>Total Kewajiban</Text>
          <CurrencyInput
            value={kewajiban}
            onChangeValue={setKewajiban}
            prefix="Rp "
            delimiter="."
            precision={0}
            style={styles.input(focus5)}
            onFocus={() => {
              setFocus5('#38bdf8');
            }}
            onBlur={() => {
              setFocus5('#d6d3d1');
            }}
            placeholder="Rupiah"
            selectionColor="#000"
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onSubmitZakat();
        }}>
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
