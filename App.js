import React from "react";
import { StyleSheet, Text, View } from "react-native";

//import screens
import Homescreen from "./screens/Homescreen";
import Addnewcontactscreen from "./screens/Addnewcontactscreen";
import Viewcontactscreen from "./screens/Viewcontactscreen";
import Editcontactscreen from "./screens/Editcontactscreen";
import NumberScreen from "./screens/NumberScreen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Homescreen },
    Add: { screen: Addnewcontactscreen },
    View: { screen: Viewcontactscreen },
    Edit: { screen: Editcontactscreen },
    Number: { screen: NumberScreen }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#B83227"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
