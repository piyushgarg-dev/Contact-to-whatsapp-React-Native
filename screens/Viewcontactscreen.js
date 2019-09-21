import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Viewcontactscreen() {
  return (
    <View style={styles.container}>
      <Text>View Contact!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
