import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import LeaveHistory from "../screens/LeaveHistory";
import DashboardScreen from "../screens/DashboardScreen";
import ViewSalaryScreen from "../screens/ViewSalaryScreen";
import ApplyLeaveScreen from "../screens/ApplyLeaveScreen";
import LoginScreen from "../screens/LoginScreen";
import { COLORS } from "../constants/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        // tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
          tabBarLabel: "Dashboard",
          headerStyle: {
            backgroundColor: COLORS.primary,
            height: 100,
          },

          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: "600",
            fontSize: 24,
          },

          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="View Salary"
        component={ViewSalaryScreen}
        options={{
          tabBarLabel: "View Salary",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },

          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: "400",
            fontSize: 24,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="monetization-on" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Apply Leave"
        component={ApplyLeaveScreen}
        options={{
          tabBarLabel: "Apply Leave",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },

          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: "400",
            fontSize: 24,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="reply" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Leave History"
        component={LeaveHistory}
        options={{
          tabBarLabel: "Leave History",
          headerStyle: {
            backgroundColor: COLORS.primary,
          },

          headerTitleStyle: {
            color: COLORS.white,
            fontWeight: "400",
            fontSize: 24,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function ScreenNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Home" component={BottomNavigator} />
    </Stack.Navigator>
  );
}
export default ScreenNavigator;
