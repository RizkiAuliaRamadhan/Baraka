import { Input } from "native-base";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MyColors } from "../../utils";

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.wrappLogin}>
        <Text>Email</Text>
        <Input
          placeholder="Email"
          isRequired={true}
          value={email}
          onChangeText={(result) => {
              setEmail(result)
          }}
        />
        <Text>password</Text>
        <Input
          placeholder="Password"
          isRequired={true}
          value={password}
          secureTextEntry={true}
          onChangeText={(result) => {
              setPassword(result)
          }}
        />
        <TouchableOpacity style={styles.login}>
            <Text style={styles.textWhite}>Login</Text>
        </TouchableOpacity >
        <TouchableOpacity style={styles.register} onPress={() => {navigation.navigate("Register")}} >
            <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
  wrappLogin: {
    padding: 10,
    borderWidth: 1,
    width: "75%"
  },
  login: {
      paddingVertical: 10,
      paddingHorizontal: 5,
      backgroundColor: MyColors.primary,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: 'center'
  },
  register: {
      paddingVertical: 10,
      paddingHorizontal: 5,
      backgroundColor: MyColors.secondary,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: 'center'
  },
  textWhite: {
      color: "white"
  }
});
