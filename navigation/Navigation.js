import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import BottomNavigator from "./ScreenNavigator";

const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <BottomNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
