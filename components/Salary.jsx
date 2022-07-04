import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

const Salary = ({ item }) => {
  return (
    <View style={styles.salary_container}>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>Name</Text>
        <Text style={styles.salary_text}>{item?.fullName}</Text>
      </View>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>Department</Text>
        <Text style={styles.salary_text}>{item?.selectedDepartmentOption}</Text>
      </View>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>Basic Salary</Text>
        <Text style={styles.salary_text}>{item?.bacsicSalary}</Text>
      </View>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>Allowance</Text>
        <Text style={styles.salary_text}>{item?.allawance}</Text>
      </View>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>Total Amount</Text>
        <Text style={styles.salary_text}>{item?.total}</Text>
      </View>
      <View style={styles.salary_title_name}>
        <Text style={styles.salary_text_title}>Paid On</Text>
        <Text style={styles.salary_text}>{item?.paidOn}</Text>
      </View>
    </View>
  );
};

export default Salary;

const styles = StyleSheet.create({
  salary_container: {
    width: "100%",
    height: 250,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    padding: 10,
    shadowColor: "#5c5555",
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
