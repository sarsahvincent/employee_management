import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Text,
} from "react-native";
import Leave from "../components/Leave";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebse";
import { useSelector } from "react-redux";
import { collections } from "../constants/constants";
import { COLORS } from "../constants/colors";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const LeaveHistoryScreen = () => {
  const refreshing = false;
  const leaveCollectiion = collection(
    db,
    collections.employee_management_manage_leave
  );
  const [loading, setLoading] = useState(false);
  const [loggedinStaffLeave, setLoggedinStaffLeave] = useState([]);
  const { userId } = useSelector((state) => state.user);

  const getStaffLeaves = async () => {
    try {
      setLoading(true);
      const data = await getDocs(leaveCollectiion);
      const staffLeaves = data?.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let perosnalLeaves = staffLeaves.filter(
        (salary) => salary?.leaveId === userId
      );
      setLoggedinStaffLeave(perosnalLeaves);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert("Error", err.message, [
        {
          text: "Cancel",

          style: "cancel",
        },
        { text: "OK" },
      ]);
    }
  };
  useEffect(() => {
    getStaffLeaves();
  }, []);

  if (loading) {
    return (
      <View style={styles.leave_container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  } else if (loggedinStaffLeave?.length === 0) {
    return (
      <View style={styles.leave_container}>
        <Text
          style={{ fontSize: 24, fontWeight: "700", color: COLORS.primary }}
        >
          No leave record found
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.salary_container}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getStaffLeaves}
            />
          }
          showsVerticalScrollIndicator={false}
          data={loggedinStaffLeave}
          renderItem={Leave}
          keyExtractor={(item) => item?.id}
        />
      </View>
    );
  }
};

export default LeaveHistoryScreen;

const styles = StyleSheet.create({
  salary_container: {
    padding: 10,
  },
  leave_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
