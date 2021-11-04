import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {dataContents, responsiveHeight, responsiveWidth} from '../../utils';
import {Menu, Search} from '../../assets/icons';
import {Input} from 'native-base';
import {CardContent, CardZakat, Kategori} from '../../Components';
import {dataZakat} from '../../utils/DummyData/zakat';
import {useDispatch, useSelector} from 'react-redux';
import {getContents} from '../../actions/ContentAction';

const Home = ({navigation}) => {
  const DataZakat = dataZakat;

  const [kategori, setKategori] = useState('Donasi');
  const [search, setSearch] = useState('');

  // redux
  const dispatch = useDispatch();
  const contentRedux = useSelector(
    state => state.ContentsReducer.contentsResult,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      dispatch(getContents());
    });

    return unsubscribe;
  }, [navigation]);

  const onSubmitSearch = () => {
    dispatch(getContents(search))
  }

  const Donasi = () => {
    return (
      <>
        {Object.keys(contentRedux).map((key, index) => {
          console.log("key : " + key);
          return (
            <>
              {contentRedux[key].kategori === 'donasi' ? (
                <CardContent navigation={navigation} data={contentRedux[key]} key={index} />
              ) : null}
            </>
          );
        })}
      </>
    );
  };

  const Sedekah = () => {
    return (
      <>
        {Object.keys(contentRedux).map((key, index) => {
          console.log("key : " + key);
          return (
            <>
              {contentRedux[key].kategori === 'sedekah' ? (
                <CardContent navigation={navigation} data={contentRedux[key]} key={index} />
              ) : null}
            </>
          );
        })}
      </>
    );
  };

  const Zakat = () => {
    return (
      <>
        {DataZakat.map((value, index) => {
          return <CardZakat navigation={navigation} data={value} key={index} />;
        })}
      </>
    );
  };

  const Content = () => {
    return (
      <>
        {kategori === 'Donasi' ? (
          <Donasi key={true} />
        ) : kategori === 'Sedekah' ? (
          <Sedekah key={true} />
        ) : kategori === 'Zakat' ? (
          <Zakat key={true} />
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
        </View>
        {/* Search */}
        <View style={{marginVertical: responsiveHeight(25)}}>
          <Input
            value={search}
            onChangeText={value => setSearch(value)}
            onSubmitEditing={() => onSubmitSearch()}
            placeholder={`Cari donasi "bencana alam"`}
            fontSize="18"
            variant="rounded"
            backgroundColor="#F7FAFF"
            borderColor="#fff"
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
  header: {},
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
