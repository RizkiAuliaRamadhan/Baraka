import {CheckIcon, Image, Input, Select} from 'native-base';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Back, Centang, Upload} from '../../assets/icons';
import {
  formatNumber,
  kapital,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import CurrencyInput from 'react-native-currency-input';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

const DetailDonasi2 = ({route, navigation}) => {
  const data = route.params;
  console.log(data);

  const [namaDonatur, setNamaDonatur] = useState(data.namaDonatur);
  const [email, setEmail] = useState(data.email);
  const [nominalDonasi, setNominalDonasi] = useState(
    data.total ? data.total : '',
  );
  const [metode, setMetode] = useState('');
  const [focus, setFocus] = useState('#d6d3d1');

  const [imageViewer, setImageViewer] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, seTtransferred] = useState(0);
  const [buktiTransfer, setBuktiTransfer] = useState('');

  const date = new Date();
  const millisecond = date.getMilliseconds();
  const detik = date.getSeconds();
  const menit = date.getMinutes();
  const jam = date.getHours();
  const hari = date.getDay();
  const tanggal = date.getDate();
  const bulan = date.getMonth();
  const tahun = date.getFullYear();

  const getImage = () => {
    launchImageLibrary(
      {quality: 1, maxWidth: 500, maxHeight: 500, includeBase64: true},
      response => {
        if (response.didCancel || response.errorCode || response.errorMessage) {
          alert('error');
        } else {
          const source = response.assets[0];
          const fileString = `data:${source.type};base64,${source.base64}`;

          setImageViewer(source.uri);
        }
      },
    );
  };

  const onSubmitKonfirmasi = async () => {
    if (namaDonatur && email && nominalDonasi && metode && imageViewer) {
      const uploadUrl = imageViewer;
      let fileName = uploadUrl.substring(uploadUrl.lastIndexOf('/') + 1);

      setUploading(true);
      seTtransferred(0);

      // setTransferred
      const task = storage()
        .ref('/buktiTransfer/' + fileName)
        .putFile(uploadUrl);

      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
        seTtransferred(
          Math.round(askSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      });

      try {
        await task;
        const url = await storage()
          .ref('/buktiTransfer/' + fileName)
          .getDownloadURL();

        console.log(url);
        setUploading(false);
        var datas = {
          namaDonatur,
          email,
          nominalDonasi,
          metode,
          image: url,
          uid: data.uid,
          idDonasi: data.id,
          status: "success",
          namaDonasi: data.name
        };

        Alert.alert(
          'Berhasil',
          `Jazaakallahu Khairan ${data.namaDonatur} atas donasinya`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Update Firebase
                database()
                  .ref('/contents/' + data.key)
                  .update({
                    donasi: parseInt(data.donasi) + parseInt(nominalDonasi),
                  })
                  .then(() => {
                    console.log('dataset');
                  });
                navigation.replace('BottomTab', {screen: 'Home'});
              },
            },
          ],
        );
      } catch (e) {
        console.log(e);
      }
      setImageViewer(null);

      // masuk ke firebase riwayat
      database()
        .ref(
          '/riwayat/' +
            millisecond +
            detik +
            menit +
            jam +
            hari +
            tanggal +
            bulan +
            tahun,
        )
        .set(datas)
        .then(() => {
          console.log('Data Set');
        })
        .catch(err => console.log(err.message));
    } else {
      Alert.alert('Gagal', 'Form harus diisi !!');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <Text style={styles.text}>{kapital(data.kategori)}</Text>
        </View>
        {/* subheader */}
        <View style={{marginTop: 35}}>
          <Text style={styles.textHeader}>{kapital(data.kategori)} untuk</Text>
          <View style={styles.cardContent}>
            <Image
              source={{uri: data.image}}
              style={styles.image}
              alt="gambar"
            />
            <Text
              numberOfLines={3}
              style={{
                color: '#000',
                fontSize: 18,
                marginTop: 10,
                fontWeight: '500',
              }}>
              {kapital(data.name)}
            </Text>
          </View>
        </View>
        {/* detail donasi */}
        <View style={{marginTop: 35}}>
          <Text style={styles.textHeader}>Detail {kapital(data.kategori)}</Text>
          <View style={styles.cardContent}>
            <Text style={styles.text2}>Nama Donatur</Text>
            <Input
              placeholder="Nama Donatur"
              height="40px"
              fontSize="16px"
              mt="2.5"
              value={namaDonatur}
              onChangeText={value => {
                setNamaDonatur(value);
              }}
            />
            <View style={{marginTop: 10}} />
            <Text style={styles.text2}>Email</Text>
            <Input
              placeholder="Email"
              height="40px"
              fontSize="16px"
              mt="2.5"
              value={email}
              onChangeText={value => {
                setEmail(value);
              }}
            />
            <View style={{marginTop: 10}} />
            <Text style={styles.text2}>Nominal {kapital(data.kategori)}</Text>
            <CurrencyInput
              value={nominalDonasi}
              onChangeValue={setNominalDonasi}
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
            <View style={{marginTop: 10}} />
            <Text style={styles.text2}>Metode Pemabayaran</Text>
            <Select
              height="45px"
              fontSize="16px"
              selectedValue={metode}
              accessibilityLabel="Metode Pembayaran"
              placeholder="Metode Pembayaran"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={2.5}
              onValueChange={value => setMetode(value)}>
              <Select.Item label="BSI" value="bsi" />
              <Select.Item label="Mandiri" value="mandiri" />
              <Select.Item label="Bri" value="bri" />
            </Select>
            {metode ? (
              <Text>
                Silahkan Transfer ke Bank BSI 7146213787 An. Rizki Aulia
                Ramadhan
              </Text>
            ) : null}
            <View style={{marginTop: 10}} />
            <Text style={styles.text2}>Upload Bukti Transfer</Text>
            {imageViewer ? (
              <View style={{marginTop: 10, justifyContent: 'center'}}>
                <Image
                  source={{uri: imageViewer}}
                  style={styles.imageUpload}
                  alt="gambar"
                />
              </View>
            ) : null}
            <TouchableOpacity
              style={{marginTop: 10, opacity: 0.5}}
              onPress={() => {
                getImage();
              }}>
              <Upload />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {uploading ? (
        <TouchableOpacity style={styles.button}>
          <ActivityIndicator color="#00ff00" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => onSubmitKonfirmasi()}>
          <Text style={styles.textButton}>Konfirmasi</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default DetailDonasi2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(30),
    paddingVertical: responsiveHeight(10),
    backgroundColor: '#fff',
    paddingBottom: 50,
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
  textHeader: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  cardContent: {
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
  image: {
    height: responsiveHeight(225),
    width: '100%',
    borderRadius: 10,
  },
  text2: {
    fontSize: 16,
    color: '#000',
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
  button: {
    height: responsiveHeight(65),
    width: '100%',
    backgroundColor: '#219FA6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  imageUpload: {
    height: 200,
    width: 100,
  },
});
