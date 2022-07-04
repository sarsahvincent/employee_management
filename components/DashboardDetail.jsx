import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

const DashboardDetail = ({ data }) => {
  return (
    <View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>Department</Text>
        <Text style={styles.dashboard_text}>
          {data?.selectedDepartmentOption}
        </Text>
      </View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>Email</Text>
        <Text style={styles.dashboard_text}>{data?.email}</Text>
      </View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>Address</Text>
        <Text style={styles.dashboard_text}>{data?.address}</Text>
      </View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>Mobile</Text>
        <Text style={styles.dashboard_text}>{data?.mobile}</Text>
      </View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>Country</Text>
        <Text style={styles.dashboard_text}>{data?.selectedCountryOption}</Text>
      </View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>State</Text>
        <Text style={styles.dashboard_text}>{data?.state}</Text>
      </View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>City</Text>
        <Text style={styles.dashboard_text}>{data?.city}</Text>
      </View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>Sex</Text>
        <Text style={styles.dashboard_text}>{data?.selectedGenderOption}</Text>
      </View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>Date of Birth</Text>
        <Text style={styles.dashboard_text}>{data?.dateOfBirth}</Text>
      </View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>Date of Joining</Text>
        <Text style={styles.dashboard_text}>{data?.dateOfJoining}</Text>
      </View>
      <View style={styles.dashboard_container}>
        <Text style={styles.dashboard_text}>Department</Text>
        <Text style={styles.dashboard_text}>
          {data?.selectedDepartmentOption}
        </Text>
      </View>
    </View>
  );
};

export default DashboardDetail;

const styles = StyleSheet.create({
  dashboard_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    marginVertical: 5,
    padding: 10,
    shadowColor: "#5c5555",
    borderRadius: 7,
    shadowOpacity: 0.55,
    shadowRadius: 3.84,
    elevation: 2,
  },
  dashboard_text: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 18,
  },
});
