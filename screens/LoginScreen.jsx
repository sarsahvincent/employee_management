import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Text } from "@rneui/themed";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebse";
import { useDispatch } from "react-redux";
import { COLORS } from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLogginStaffId } from "../services/redux/userSlice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 10) / 16);
  const [loading, setLoadig] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Alert.alert("Allert", "All fields are required.", [
        {
          text: "Cancel",

          style: "cancel",
        },
        { text: "OK" },
      ]);
    } else {
      try {
        setLoadig(true);
        const result = await signInWithEmailAndPassword(auth, email, password);
        dispatch(getLogginStaffId(result?.user?.uid));
        setPassword("");
        setEmail("");
        setLoadig(false);
        navigation.navigate("Home");
      } catch (err) {
        setLoadig(false);
        if (err.message === "Firebase: Error (auth/invalid-email).") {
          Alert.alert("Error", "Invalid Email or Password", [
            {
              text: "Cancel",

              style: "cancel",
            },
            { text: "OK" },
          ]);
        } else {
          Alert.alert("Error", err.message, [
            {
              text: "Cancel",

              style: "cancel",
            },
            { text: "OK" },
          ]);
        }
      }
    }
  };

  const imageWidth = dimensions.width;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 40 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.login_container}>
            <View style={styles.login_header_container}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "900",
                  fontSize: 24,
                }}
              >
                Account Login
              </Text>
            </View>
            <View>
              <Image
                style={{ height: imageHeight, width: imageWidth }}
                source={require("../assets/images/vecteezy_man-entering-security-password_4689193.jpg")}
              />
            </View>

            <View>
              <View style={styles.MainContainer}>
                <TextInput
                  style={styles.textinput}
                  value={email}
                  placeholder="Enter Your Email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                />

                <TextInput
                  onChangeText={setPassword}
                  style={styles.textinput}
                  placeholder="Enter Your Password"
                  value={password}
                  secureTextEntry
                />
              </View>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <View
                onPress={() => navigation.navigate("Home")}
                style={styles.button_container}
              >
                <Button
                  onPress={handleSubmit}
                  title="Login"
                  icon={{
                    name: "login",
                    type: "expo",
                    size: 15,
                    color: "white",
                  }}
                  iconRight
                  containerStyle={{
                    marginHorizontal: 50,
                    height: 50,
                    width: 250,
                    marginVertical: 10,
                  }}
                  titleStyle={{ fontWeight: "600" }}
                  buttonStyle={{
                    backgroundColor: COLORS.primary,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 7,
                  }}
                />
                {/* <Button
              color={COLORS.primary}
              title="Login"
              onPress={handleSubmit}
            />
            <MaterialIcons name="login" size={34} color={COLORS.primary} /> */}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login_container: {
    flex: 1,
    display: "flex",
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  MainContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  button_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 7,
    width: 250,
    height: 40,
    justifyContent: "center",
    marginTop: 30,
  },
  login_text: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "700",
    marginRight: 10,
  },
  text: {
    fontSize: 28,
    textAlign: "center",
  },
  login_header_container: {
    marginBottom: 40,
  },
  textinput: {
    marginTop: 10,
    width: 250,
    height: 40,
    paddingVertical: 12,
    margin: 8,
    borderRadius: 7,

    borderWidth: 2,
    borderColor: COLORS.primary,
    textAlign: "center",
  },

  logo: {
    width: 66,
    height: 58,
  },
});
