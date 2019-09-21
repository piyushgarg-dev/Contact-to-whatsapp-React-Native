import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Form, Item, Label, Input, Button } from "native-base";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Linking } from "expo";
const NumberScreen = () => {
  const [number, setNumber] = useState("");
  useEffect(() => {});
  return (
    <View>
      <Form>
        <Item style={styles.input}>
          <Input
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="number-pad"
            onChangeText={number => {
              setNumber(number);
            }}
          />
        </Item>
      </Form>
      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => {
          Linking.openURL(`https://wa.me/91${number}`);
        }}
      >
        <FontAwesome name="whatsapp" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 0,
    marginTop: 10,
    fontSize: 20
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#B83227",
    borderRadius: 100
  }
});
export default NumberScreen;
