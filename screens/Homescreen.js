import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Linking } from "expo";
import { AsyncStorage } from "react-native";
import { Card } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { setRecoveryProps } from "expo/build/ErrorRecovery/ErrorRecovery";
import * as Contacts from "expo-contacts";
import * as Permissions from "expo-permissions";
const Homescreen = props => {
  const [data, setdata] = useState([]);

  const getContacts = async () => {
    await AsyncStorage.getAllKeys()
      .then(keys => {
        return AsyncStorage.multiGet(keys).then(result => {
          const d = result.sort(function(a, b) {
            if (JSON.parse(a[1]).firstName > JSON.parse(b[1]).firstName) {
              return 1;
            }
            if (JSON.parse(a[1]).firstName < JSON.parse(b[1]).firstName) {
              return 0;
            }
          });
          setdata(d);
          console.log(d);
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(async () => {
    const { navigation } = props;
    navigation.addListener("willFocus", () => {
      getContacts();
    });
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          contact = JSON.parse(item[1]);
          return (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`https://wa.me/91${contact.phoneNumber}`);
              }}
            >
              <Card style={styles.listItem}>
                <View style={styles.iconContainer}>
                  <Text style={styles.contactIcon}>
                    {contact.firstName[0].toUpperCase()}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    {contact.firstName} {contact.lastName}
                  </Text>
                  <Text style={styles.infoText}>{contact.phoneNumber}</Text>
                </View>
                <View style={styles.left}>
                  <TouchableOpacity
                    onPress={async () => {
                      await AsyncStorage.removeItem(
                        contact.phoneNumber.toString()
                      )
                        .then(() => {
                          console.log("Removed");
                          getContacts();
                        })
                        .catch(err => console.log(err));
                    }}
                  >
                    <View style={styles.iconContainer}>
                      <Text style={styles.contactIcon}>
                        <Entypo name="cross" size={30} color="#fff" />
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => item[0].toString()}
      />

      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => {
          props.navigation.navigate("Add");
        }}
      >
        <Entypo name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 20
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100
  },

  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },
  left: {
    position: "absolute",
    right: 10,
    marginTop: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100
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
  },
  floatButton2: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    left: 10,
    height: 60,
    backgroundColor: "#26ae60",
    borderRadius: 100
  }
});

Homescreen.navigationOptions = {
  title: "Contacts App"
};
export default Homescreen;
