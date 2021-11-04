import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MyColors} from '../../utils';
import {Button, Input} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, registerUser} from '../../actions/AuthAction';
import {clearStorage, getData} from '../../utils/localStorage';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [nama, setNama] = useState('');
  const [tlp, setTlp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [vertifikasiPassword, setVertifikasiPassword] = useState('');
  const [cekRegister, setCekRegister] = useState(false);
  const [pageLogin, setPageLogin] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = () => {
    if ((nama, tlp, email, password, vertifikasiPassword)) {
      if (password === vertifikasiPassword) {
        const datas = {
          nama,
          tlp,
          email,
        };
        dispatch(registerUser(datas, password));
        Alert.alert('Berhasil', 'Selamat Anda Berhasil Daftar', [
          {
            text: 'OK',
            onPress: () => {
              navigation.replace('BottomTab', {screen: 'Home'});
            },
          },
        ]);
      } else {
        Alert.alert('Gagal', 'Password dan Ulangi Password harus sama');
      }
    } else {
      Alert.alert('Gagal', 'Form harus diisi semua');
    }
  };

  const onSubmitLogin = () => {
    if (email && passwordLogin) {
      dispatch(loginUser(email, passwordLogin));
      Alert.alert('Berhasil', 'Selamat Anda Berhasil Login', [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('BottomTab', {screen: 'Home'});
          },
        },
      ]);
    } else {
      Alert.alert('Gagal', 'Form harus diisi semua');
    }
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        clearStorage();
        dispatch(registerUser(false, false));
        dispatch(loginUser(false, false));
        Alert.alert('Berhasil', 'Selamat Anda Logout', [
          {
            text: 'OK',
            onPress: () => {
              navigation.replace('BottomTab', {screen: 'Home'});
            },
          },
        ]);
      });
  };

  const getUserData = () => {
    getData('user').then(res => {
      const data = res;

      if (data) {
        setCekRegister([data]);
      } else {
        setCekRegister(false);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      getUserData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {cekRegister ? (
        <>
          <TouchableOpacity style={styles.button1} onPress={() => logout()}>
            <Text style={{color: '#fff', fontSize: 25}}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : pageLogin ? (
        <>
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.card}>
            <Input
              placeholder="Email"
              height="45px"
              fontSize="18px"
              value={email}
              onChangeText={value => {
                setEmail(value);
              }}
            />
            <Input
              placeholder="Password (min 6)"
              height="45px"
              fontSize="18px"
              mt="18px"
              value={passwordLogin}
              onChangeText={value => {
                setPasswordLogin(value);
              }}
              type="password"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => onSubmitLogin()}>
              <Text style={{color: '#fff', fontSize: 25}}>Masuk</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPageLogin(false)}
              style={{
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#000', fontSize: 18}}>
                Belum punya akun?{' '}
              </Text>
              <Text style={{color: '#4FC5D0', fontSize: 18}}>Register</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Register</Text>
          <View style={styles.card}>
            <Input
              placeholder="Nama"
              height="45px"
              fontSize="18px"
              value={nama}
              onChangeText={value => {
                setNama(value);
              }}
            />
            <Input
              placeholder="Nomer Telepon"
              height="45px"
              fontSize="18px"
              mt="18px"
              value={tlp}
              onChangeText={value => {
                setTlp(value);
              }}
              keyboardType="number-pad"
            />
            <Input
              placeholder="Email"
              height="45px"
              fontSize="18px"
              mt="18px"
              value={email}
              onChangeText={value => {
                setEmail(value);
              }}
            />
            <Input
              placeholder="Password (min 6)"
              height="45px"
              fontSize="18px"
              mt="18px"
              value={password}
              onChangeText={value => {
                setPassword(value);
              }}
              type="password"
              overflow="visible"
            />
            <Input
              placeholder="Ulangi Password (min 6)"
              height="45px"
              fontSize="18px"
              mt="18px"
              value={vertifikasiPassword}
              onChangeText={value => {
                setVertifikasiPassword(value);
              }}
              type="password"
              overflow="visible"
            />
            <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
              <Text style={{color: '#fff', fontSize: 25}}>Daftar Sekarang</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPageLogin(true)}
              style={{
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#000', fontSize: 18}}>
                Sudah punya akun?{' '}
              </Text>
              <Text style={{color: '#4FC5D0', fontSize: 18}}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 24,
    color: '#000',
    marginTop: -70,
  },
  card: {
    width: '100%',
    marginTop: 45,
  },
  button: {
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#4FC5D0',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button1: {
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#E34624',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
