import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {getData} from '../../utils/localStorage';
import {dataContents, responsiveHeight, responsiveWidth} from '../../utils';
import {Menu, Search} from '../../assets/icons';
import {Image, Input} from 'native-base';
import {Sedekah} from '../../assets/images';
import {CardContent, CardZakat, Kategori} from '../../Components';
import CardSedekah from '../../Components/CardSedekah';
import { dataSedekah } from '../../utils/DummyData/sedekah';
import { dataZakat } from '../../utils/DummyData/zakat';

const Home = ({navigation}) => {
  const DataContent = dataContents;
  const DataSedekah = dataSedekah
  const DataZakat = dataZakat

  const [kategori, setKategori] = useState('Donasi');

  const Donasi = () => {
    return (
      <>
        {DataContent.map((value, index) => {
          return (
            <CardContent navigation={navigation} data={value} key={index} />
          );
        })}
      </>
    );
  };

  const Sedekah = () => {
    return (
      <>
        {DataSedekah.map((value, index) => {
          return (
            <CardSedekah navigation={navigation} data={value} key={index} />
          );
        })}
      </>
    );
  };

  const Zakat = () => {
    return (
      <>
        {DataZakat.map((value, index) => {
          return (
            <CardZakat navigation={navigation} data={value} key={index} />
          );
        })}
      </>
    );
  };

  const Content = () => {
    return (
      <>
        {kategori === 'Donasi' ? (
          <Donasi />
        ) : kategori === 'Sedekah' ? (
          <Sedekah />
        ) : kategori === 'Zakat' ? (
          <Zakat />
        ) : (
          <Text>Data Kosong</Text>
        )}
      </>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.text1}>Mari sisihkan harta kita</Text>
            <Text style={styles.text1}>untuk membantu sesama</Text>
          </View>
          <TouchableOpacity style={styles.menu}>
            <Menu />
          </TouchableOpacity>
        </View>
        {/* Search */}
        <View style={{marginVertical: responsiveHeight(25)}}>
          <Input
            fontSize="18"
            variant="rounded"
            borderColor="#fff"
            placeholder={`Cari donasi "bencana alam"`}
            InputLeftElement={<Search style={styles.iconSearch} />}
          />
        </View>
        {/* Kategori */}
        <Text style={styles.text1}>Kategori</Text>
        <View style={styles.kategori}>
          <Kategori
            name="Sedekah"
            onPress={() => {
              setKategori('Sedekah');
            }}
          />
          <Kategori
            name="Zakat"
            onPress={() => {
              setKategori('Zakat');
            }}
          />
          <Kategori
            name="Donasi"
            onPress={() => {
              setKategori('Donasi');
            }}
          />
        </View>
        {/* Content */}
        <View style={styles.content}>
          <Content />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(20),
    paddingVertical: responsiveHeight(10),
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: 18,
    color: '#000',
  },
  menu: {
    justifyContent: 'center',
  },
  iconSearch: {
    marginLeft: responsiveWidth(40),
    marginRight: responsiveWidth(10),
  },
  kategori: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 10,
    marginBottom: responsiveHeight(75),
  },
});
