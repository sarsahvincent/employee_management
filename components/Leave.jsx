import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

const Salary = ({ item }) => {
  return (
    <View style={styles.salary_container}>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>Department</Text>
        <Text style={styles.salary_text}>{item?.department}</Text>
      </View>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>Reason</Text>
        <Text style={styles.salary_text}>{item?.reason}</Text>
      </View>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>From</Text>
        <Text style={styles.salary_text}>{item?.from}</Text>
      </View>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>To</Text>
        <Text style={styles.salary_text}>{item?.to}</Text>
      </View>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>Status</Text>
        {item?.leaveStatus === "pending" ? (
          <View style={styles.pending}>
            <Text style={styles.pending}>Pending</Text>
          </View>
        ) : item?.leaveStatus === "approved" ? (
          <View>
            <Text style={styles.approved}>Approved</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.rejected}>Rejected</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Salary;

const styles = StyleSheet.create({
  pending: {
    color: "orange",
    fontWeight: "700",
    fontSize: 20,
  },
  approved: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 20,
  },
  rejected: {
    color: "red",
    fontWeight: "700",
    fontSize: 20,
  },
  salary_container: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    padding: 10,
    borderRadius: 7,
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 4,
  },
  salary_title_name: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  salary_text: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 18,
  },
  salary_text_title: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 20,
  },
});
