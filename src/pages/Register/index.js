import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MyColors } from "../../utils";
import { Input } from "native-base";
import { useDispatch, useSelector } from 'react-redux';
import {registerUser} from '../../actions/AuthAction';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vertifikasiPassword, setVertifikasiPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = () => {
    if(email, password, vertifikasiPassword) {
      const datas = {
        "email" : email,
      };
  
      dispatch(registerUser(datas, password));
    }
    else{
      Alert.alert('gagal', "Gagal Daftar")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.wrappRegister}>
        <Text>Email</Text>
        <Input
          placeholder="Email"
          isRequired={true}
          value={email}
          onChangeText={(result) => {
            setEmail(result);
          }}
        />
        <Text>password</Text>
        <Input
          placeholder="Password"
          isRequired={true}
          value={password}
          secureTextEntry={true}
          onChangeText={(result) => {
            setPassword(result);
          }}
        />
        <Text>vertifikasi password</Text>
        <Input
          placeholder="Vertifikasi password"
          isRequired={true}
          value={vertifikasiPassword}
          secureTextEntry={true}
          onChangeText={(result) => {
            setVertifikasiPassword(result);
          }}
        />
        <TouchableOpacity style={styles.register} onPress={onSubmit}>
          <Text style={styles.textWhite}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MyColors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  wrappRegister: {
    padding: 10,
    borderWidth: 1,
    width: "75%"
  },
  register: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: MyColors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  textWhite: {
    color: "white"
  }
});
