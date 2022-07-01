import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebse";
import {
  StyleSheet,
  Image,
  RefreshControl,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { collections } from "../constants/constants";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import DashboardDetail from "../components/DashboardDetail";
import {
  getAllStaffMembers,
  getLogginUserDetails,
} from "../services/redux/userSlice";

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const usersCollectiion = collection(
    db,
    collections.employee_management_users
  );
  const { userId } = useSelector((state) => state.user);
  const refreshing = false;
  const [loading, setLoading] = useState(false);
  const [logoutLoadiing, setLogoutLoading] = useState(false);
  const [currentUserDetails, setCurrentUserDetails] = useState();

  const handleSingout = async () => {
    try {
      setLogoutLoading(true);
      await auth.signOut();
      setLogoutLoading(false);
      navigation.navigate("LoginScreen");
    } catch (e) {
      setLogoutLoading(false);

      Alert.alert("Allert", e.message, [
        {
          text: "Cancel",

          style: "cancel",
        },
        { text: "OK" },
      ]);
    }
  };
  const getUsers = async () => {
    setLoading(true);
    try {
      const data = await getDocs(usersCollectiion);
      const allStaff = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(getAllStaffMembers(allStaff));
      setCurrentUserDetails(allStaff?.find((stf) => stf?.uuid === userId));
      dispatch(getLogginUserDetails(currentUserDetails));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      Alert.alert("Allert", e.message, [
        {
          text: "Cancel",

          style: "cancel",
        },
        { text: "OK" },
      ]);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigation.navigate("LoginScreen");
    }
  }, []);

  const hangleStatus = () => {
    if (currentUserDetails?.last_salary) {
      return (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                alignItems: "center",
                fontWeight: "600",
                fontSize: 24,
                marginRight: 5,
              }}
            >
              Salary Status: Paid
            </Text>
            <View>
              <AntDesign name="checkcircle" size={24} color="white" />
            </View>
          </View>
          <View
            style={{
              marginRight: 20,
            }}
          >
            {logoutLoadiing ? (
              <ActivityIndicator size="large" color={COLORS.white} />
            ) : (
              <MaterialCommunityIcons
                onPress={handleSingout}
                name="logout"
                size={28}
                color="white"
              />
            )}
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                alignItems: "center",
                fontWeight: "600",
                fontSize: 24,
                marginRight: 5,
              }}
            >
              Salary Status:
              {loading ? (
                <ActivityIndicator size="large" color={COLORS.white} />
              ) : (
                <Text>Not paid</Text>
              )}
            </Text>
          </View>
          <View
            style={{
              marginRight: 20,
            }}
          >
            {logoutLoadiing ? (
              <ActivityIndicator size="large" color={COLORS.white} />
            ) : (
              <MaterialCommunityIcons
                onPress={handleSingout}
                name="logout"
                size={28}
                color="white"
              />
            )}
          </View>
        </View>
      );
    }
  };
  React.useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.dashboard_container}>
        <StatusBar />
        <View style={styles.dashboard_top_container}>
          <View style={styles.name_image_container}>
            <View>
              <Text
                style={{ color: COLORS.white, fontWeight: "600", fontSize: 20 }}
              >
                {currentUserDetails?.fullName}
              </Text>
            </View>
            <View style={styles.image_container}>
              <Image
                style={{
                  width: 65,
                  height: 65,
                  resizeMode: "cover",
                  borderRadius: 100,
                }}
                source={{ uri: currentUserDetails?.img }}
              />
            </View>
          </View>

          {hangleStatus()}
        </View>

        {loading ? (
          <View style={styles.dashboard_bottom_container}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <View style={styles.dashboard_bottom_container}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={getUsers} />
              }
              showsVerticalScrollIndicator={false}
            >
              <DashboardDetail data={currentUserDetails} />
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  dashboard_container: {
    flex: 1,
  },
  dashboard_top_container: {
    backgroundColor: COLORS.primary,
    height: "30%",
    marginBottom: -30,
    color: COLORS.white,
    paddingTop: 30,
    flex: 1,
  },
  dashboard_bottom_container: {
    height: "70%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
  },
  image_container: {
    borderColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 100,
  },
  name_image_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
});
