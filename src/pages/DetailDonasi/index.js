import {Image, Progress} from 'native-base';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Back, Centang} from '../../assets/icons';
import {formatNumber, responsiveHeight, responsiveWidth} from '../../utils';

const DetailDonasi = ({route, navigation}) => {
  const data = route.params;
  const penerimaDana = data.penerimaDana;
  const penggalangDana = data.penggalangDana;
  const penyalurDana = data.penyalurDana;

  //progress
  const value = (data.donasi / data.total) * 100;

  const onSubmitDonasi = () => {
    navigation.navigate("DetailDonasi2")
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header} >
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
          <Text style={styles.text}>Detail</Text>
        </View>
        {/* Detail Donasi */}
        <View style={styles.cardContent}>
          <Image
            style={styles.image}
            source={{uri: data.image}}
            alt="ImageContent"
          />
          <Text style={styles.text1}>{data.name}</Text>
          <Text style={styles.text2}>
            {data.waktuSekarang} / {data.akhirWaktu} Days
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={styles.text3}>donasi terkumpul</Text>
            <Text>Rp. {formatNumber(data.donasi)}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Progress
              mt="2.5"
              value={Math.round(value)}
              colorScheme="primary"
              width="85%"
            />
            <Text style={styles.text4}>{Math.round(value)}%</Text>
          </View>
        </View>
        {/* Penggalang Donasi */}
        <Text style={styles.text5}>Penggalang Dana</Text>
        <View style={styles.cardContent1}>
          {penggalangDana.map((value, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: value.image}}
                    style={styles.image1}
                    alt="gambar"
                  />
                  <View style={{marginLeft: 10, justifyContent: 'center'}}>
                    <Text style={styles.text6}>{value.name}</Text>
                    <Text style={styles.text7}>{value.akun}</Text>
                  </View>
                </View>
                <Centang />
              </View>
            );
          })}
        </View>
        {/* Penerima Dana */}
        <Text style={styles.text5}>Penerima Dana</Text>
        <View style={styles.cardContent1}>
          {penerimaDana.map((value, index) => {
            return (
              <View style={{paddingVertical: 20}}>
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: value.image}}
                      style={styles.image1}
                      alt="gambar"
                    />
                    <View style={{marginLeft: 10, justifyContent: 'center'}}>
                      <Text style={styles.text6}>{value.name}</Text>
                      <Text style={styles.text7}>akun terverifikasi</Text>
                    </View>
                  </View>
                  <Centang />
                </View>
              </View>
            );
          })}
        </View>
        {/* Jadwal Penyalur Dana */}
        <Text style={styles.text5}>Jadwal Penyalur Dana</Text>
        <View style={styles.cardContent1}>
          {penerimaDana.map((value, index) => {
            return (
              <View style={{paddingVertical: 20}}>
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: value.image}}
                      style={styles.image1}
                      alt="gambar"
                    />
                    <View style={{marginLeft: 10, justifyContent: 'center'}}>
                      <Text style={styles.text6}>{value.name}</Text>
                      <Text style={styles.text7}>{value.jadwal}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        {/* Penyalur Dana */}
        <Text style={styles.text5}>Penyalur Dana</Text>
        <View style={styles.cardContent1}>
          {penyalurDana.map((value, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: value.image}}
                    style={styles.image1}
                    alt="gambar"
                  />
                  <View style={{marginLeft: 10, justifyContent: 'center'}}>
                    <Text style={styles.text6}>{value.name}</Text>
                    <Text style={styles.text7}>{value.akun}</Text>
                  </View>
                </View>
                <Centang />
              </View>
            );
          })}
        </View>
        <View style={{marginBottom: 20}} />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {onSubmitDonasi()}} >
        <Text style={styles.textButton}>Donasi Sekarang</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailDonasi;

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
    alignItems: 'center'
  },
  text: {
    color: '#000',
    fontSize: 22,
  },
  back: {
    position: 'absolute',
    left: 0
  },
  detailDonasi: {
    marginTop: responsiveHeight(25),
    paddingTop: responsiveHeight(20),
  },
  image: {
    height: responsiveHeight(225),
    width: '100%',
    borderRadius: 10,
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
  cardContent1: {
    width: responsiveWidth(373),
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
  text1: {
    fontSize: 18,
    color: '#000',
    marginTop: 20,
    fontWeight: '600',
  },
  text2: {
    color: '#219FA6',
    fontSize: 18,
    marginTop: 8,
  },
  text3: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  text3: {
    color: '#000',
    fontSize: 14,
  },
  text4: {
    color: '#219FA6',
    fontSize: 16,
  },
  text5: {
    marginTop: responsiveHeight(30),
    marginBottom: 5,
    color: '#000',
    fontSize: 16,
  },
  text6: {
    color: '#000',
    fontSize: 16,
  },
  text7: {
    color: '#0070AF',
    fontSize: 12,
  },
  image1: {
    width: 50,
    height: 50,
  },
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
});
