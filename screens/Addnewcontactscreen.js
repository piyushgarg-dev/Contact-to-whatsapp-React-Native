import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert
} from "react-native";
import { AsyncStorage } from "react-native";
import { Form, Item, Label, Input, Button } from "native-base";
export default function Addnewcontactscreen(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const resetStates = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
  };
  const saveContact = async () => {
    if (firstName !== "" && phoneNumber !== "") {
      const contact = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        address: address
      };
      await AsyncStorage.setItem(phoneNumber, JSON.stringify(contact))
        .then(() => {
          console.log("Saved Success");
          props.navigation.navigate("Home");
        })
        .catch(err => console.log(err));
    } else {
      Alert.alert("Please fill First Name and Phone number");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Form>
        <Item style={styles.inputItem}>
          <Label>First Name</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={fname => {
              setFirstName(fname);
            }}
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label>Last Name</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="name-phone-pad"
            onChangeText={lname => {
              setLastName(lname);
            }}
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label>Phone Number</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="number-pad"
            onChangeText={num => {
              setPhoneNumber(num);
            }}
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label>Email</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={e => {
              setEmail(e);
            }}
          />
        </Item>
        <Item style={styles.inputItem}>
          <Label>Address</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={add => {
              setAddress(add);
            }}
          />
        </Item>
      </Form>
      <Button
        style={styles.button}
        full
        onPress={() => {
          saveContact();
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Button>
      <View style={styles.empty}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});

Addnewcontactscreen.navigationOptions = {
  title: "Add New"
};
