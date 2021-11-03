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
    color: "#000",
    fontSize: 24
  }
});
