import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MyColors, responsiveHeight, responsiveWidth} from '../../utils';
import {Title} from '../../assets/images';
import {Image} from 'native-base';
import {getData, storeData} from '../../utils/localStorage';

const SplahScreen = ({navigation}) => {
  const [open, setOpen] = useState(true);

  const data = true;
  const submit = () => {
    storeData('splashscreen', data);
    navigation.navigate('BottomTab');
  };

  const cek = () => {
    getData('splashscreen').then(res => {
      if (res) {
        setOpen(false)
        setTimeout(() => {
          navigation.replace('BottomTab');
        }, 2000)
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      cek();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Title} width="275" height="100" alt="Title" />
      {open ? (
        <TouchableOpacity style={styles.button} onPress={() => {submit()}}>
          <Text style={styles.textButton}>Mulai</Text>
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default SplahScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: MyColors.primary,
    width: responsiveWidth(368),
    height: responsiveHeight(75),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: responsiveHeight(50),
  },
  textButton: {
    color: MyColors.white,
    fontSize: 26,
    fontWeight: '600',
  },
});
