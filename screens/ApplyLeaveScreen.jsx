import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "@rneui/themed";
import { db } from "../firebse";
import { collections } from "../constants/constants";
import { COLORS } from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllStaffMembers,
  getLogginUserDetails,
} from "../services/redux/userSlice";

const ApplyLeaveScreen = ({ navigation }) => {
  const { loggedinStaff, userId } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const usersCollectiion = collection(
    db,
    collections.employee_management_users
  );

  const dispatch = useDispatch();
  function create_UUID() {
    var dt = new Date().getTime();
    let uniqueLeaveId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    setLeaveId(uniqueLeaveId);
  }

  const [leaveId, setLeaveId] = useState(null);
  const date = new Date().toISOString().slice(0, 10);
  const handleSubmitData = async () => {
    const leaveData = {
      id: userId + leaveId,
      leaveId: userId,
      name: loggedinStaff?.fullName,
      department: loggedinStaff?.selectedDepartmentOption,
      photo: loggedinStaff?.img,
      phone: loggedinStaff?.mobile,
      reason,
      from,
      to,
      appliedOn: date,
      leaveStatus: "pending",
    };

    if (reason === "" || from === "" || to === "") {
      Alert.alert("Error", "All fields are required", [
        {
          text: "Cancel",

          style: "cancel",
        },
        { text: "OK" },
      ]);
    } else if (reason.length > 100) {
      Alert.alert("Error", "Reason cannot be more than 100 characters", [
        {
          text: "Cancel",

          style: "cancel",
        },
        { text: "OK" },
      ]);
    } else {
      setLoading(true);
      try {
        await setDoc(
          doc(
            db,
            collections.employee_management_manage_leave,
            userId + leaveId
          ),
          leaveData
        );
        setFrom("");
        setTo("");
        setReason("");
        setLoading(false);
        setLoading(false);
        Alert.alert("Success", "Leave request sent successfully", [
          {
            text: "Cancel",

            style: "cancel",
          },
          { text: "OK" },
        ]);
      } catch (error) {
        setLoading(false);
        Alert.alert("Error", error.message, [
          {
            text: "Cancel",

            style: "cancel",
          },
          { text: "OK" },
        ]);
      }
    }
  };

  const getUsers = async () => {
    setLoading(true);
    try {
      const data = await getDocs(usersCollectiion);
      const allStaff = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(getAllStaffMembers(allStaff));
      let currentLoggedinStaff = allStaff?.find((stf) => stf?.id === userId);
      dispatch(getLogginUserDetails(currentLoggedinStaff));
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
    getUsers();
  }, [navigation.focus]);

  useEffect(() => {
    create_UUID();
  }, [reason, from, to]);

  return (
    <View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.MainContainer}>
            <Text style={styles.text}>From</Text>
            <TextInput
              style={styles.textinput}
              value={from}
              placeholder="yyyy-mm-dd"
              keyboardType="number-pad"
              onChangeText={setFrom}
            />
            <Text style={styles.text}>To</Text>
            <TextInput
              onChangeText={setTo}
              style={styles.textinput}
              placeholder="yyyy-mm-dd"
              keyboardType="number-pad"
              value={to}
            />
            <Text style={styles.text}>Reason</Text>
            <TextInput
              onChangeText={setReason}
              style={styles.textinput_reason}
              placeholder="state reasons"
              value={reason}
            />
          </View>
        </TouchableWithoutFeedback>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View
            onPress={() => navigation.navigate("Home")}
            style={styles.button_container}
          >
            <Button
              onPress={handleSubmitData}
              title="SUBMIT"
              icon={{
                name: "send",
                type: "font-awesome",
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
          </View>
        )}
      </View>
    </View>
  );
};

export default ApplyLeaveScreen;

const styles = StyleSheet.create({
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
    fontSize: 18,
    textAlign: "center",
    color: COLORS.primary,
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
  textinput_reason: {
    marginTop: 10,
    width: 250,
    height: 60,
    paddingVertical: 12,
    margin: 8,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: COLORS.primary,
    textAlign: "center",
  },
});
