import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import store from "./services/redux/store";
import Navigation from "./navigation/Navigation";
import { COLORS } from "./constants/colors";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.primary,
      }}
    >
      <Provider store={store}>
        <Navigation />
      </Provider>
    </View>
  );
}
