import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import Salary from "../components/Salary";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebse";
import { useSelector, useDispatch } from "react-redux";
import { collections } from "../constants/constants";
import {
  getAllSalaries,
  getLogginUserDetails,
} from "../services/redux/userSlice";
import { COLORS } from "../constants/colors";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ViewSalaryScreen = () => {
  const refreshing = false;

  const dispatch = useDispatch();
  const salaryCollectiion = collection(
    db,
    collections.employee_management_salary_all
  );
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { allStaffSalaries, userId } = useSelector((state) => state.user);

  const getStaffSalarie = async () => {
    setLoading(true);
    try {
      const data = await getDocs(salaryCollectiion);
      const allSa = data?.docs.map((salaryDoc) => ({
        ...salaryDoc.data(),
        id: salaryDoc.id,
      }));

      // dispatch(getAllSalaries(allSa));
      let perosnalSalary = allSa?.filter(
        (salary) => salary?.id.substring(0, 28) === userId
      );
      setSalaries(perosnalSalary);
      setLoading(false);
    } catch (e) {
      Alert.alert("Allert", e.message, [
        {
          text: "Cancel",

          style: "cancel",
        },
        { text: "OK" },
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaffSalarie();
  }, []);

  if (loading) {
    return (
      <View style={styles.leave_container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  } else if (salaries?.length === 0) {
    return (
      <View style={styles.leave_container}>
        <Text
          style={{ fontSize: 24, fontWeight: "700", color: COLORS.primary }}
        >
          No salary record found
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
              onRefresh={getStaffSalarie}
            />
          }
          showsVerticalScrollIndicator={false}
          data={salaries}
          renderItem={Salary}
          keyExtractor={(item) => item?.id}
        />
      </View>
    );
  }
};

export default ViewSalaryScreen;

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
