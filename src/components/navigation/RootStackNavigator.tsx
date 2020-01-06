import { Colors, IconButton } from 'react-native-paper';
import React, { ReactElement } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthCheck from '../screen/AuthCheck';
import BookingList from '../screen/BookingList';
import ChatScreen from '../screen/ChatScreen';
import Confirm from '../screen/Confirm';
import DropoffMap from '../screen/DropoffMap';
import ForgotPassword from '../screen/ForgotPasswordScreen';
import Home from '../screen/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from '../screen/Login';
import PhoneLogin from '../screen/PhoneLogin';
import PickupMap from '../screen/PickupMap';
import Preview from '../screen/Preview';
import Register from '../screen/RegisterScreen';
import SelectTable from '../screen/SelectTable';
import TripDetails from '../screen/TripDetails';
import TripList from '../screen/TripList';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { theme } from '../core/theme';

const AuthStack = createStackNavigator({
  Login: Login,
  PhoneLogin: PhoneLogin,
  Register: Register,
  ForgotPassword: ForgotPassword,
});

const BookingStack = createStackNavigator({
  TripList: {
    screen: TripList,
    navigationOptions: ({ navigation }) => ({
      title: 'TripList',
    }),
  },
  TripDetails: {
    screen: TripDetails,
    navigationOptions: ({ navigation }) => ({
      title: 'TripDetails', // `${navigation.state.params.name}'s Details'`,
    }),
  },
  PickupMap: {
    screen: PickupMap,
    navigationOptions: ({ navigation }) => ({
      title: 'PickupMap',
    }),
  },
  DropoffMap: {
    screen: DropoffMap,
    navigationOptions: ({ navigation }) => ({
      title: 'DropoffMap',
    }),
  },
  SelectTable: {
    screen: SelectTable,
    navigationOptions: ({ navigation }) => ({
      title: 'SelectTable',
    }),
  },
  Preview: {
    screen: Preview,
    navigationOptions: ({ navigation }) => ({
      title: 'Preview',
    }),
  },
  Confirm: {
    screen: Confirm,
    navigationOptions: ({ navigation }) => ({
      title: 'Confirm',
    }),
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'ChatScreen',
    }),
  },
});

const AppStack = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: (
        <IconButton icon="ticket" color={theme.colors.icon} size={20} />
      ),
    },
  },
  Booking: {
    screen: BookingStack,
    navigationOptions: {
      tabBarLabel: 'Booking',
      tabBarIcon: (
        <IconButton icon="bus-clock" color={theme.colors.icon} size={20} />
      ),
    },
  },
  History: {
    screen: BookingList,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: (
        <IconButton icon="history" color={theme.colors.icon} size={20} />
      ),
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
      AuthCheck: AuthCheck,
    },
    {
      initialRouteName: 'App', // 'AuthCheck',
    },
  ),
);
