import { Colors, IconButton } from 'react-native-paper';
import React, { ReactElement } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthCheck from '../screen/AuthCheck';
import BookingList from '../screen/BookingList';
import ChatScreen from '../screen/ChatScreen';
import Confirm from '../screen/Confirm';
import DropoffMap from '../screen/DropoffMap';
import ForgotPassword from '../screen/ForgotPasswordScreen';
import HelpScreen from '../screen/HelpScreen';
import Home from '../screen/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from '../screen/Login';
import PaymentScreen from '../screen/PaymentScreen';
import PhoneLogin from '../screen/PhoneLogin';
import PickupMap from '../screen/PickupMap';
import Preview from '../screen/Preview';
import Register from '../screen/RegisterScreen';
import ReviewScreen from '../screen/ReviewScreen';
import SelectTable from '../screen/SelectTable';
import TrackingScreen from '../screen/TrackingScreen';
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
      title: 'Trip list',
    }),
  },
  TripDetails: {
    screen: TripDetails,
    navigationOptions: ({ navigation }) => ({
      title: 'Trip details', // `${navigation.state.params.name}'s Details'`,
    }),
  },
  PickupMap: {
    screen: PickupMap,
    navigationOptions: ({ navigation }) => ({
      title: 'Select pickup place',
    }),
  },
  DropoffMap: {
    screen: DropoffMap,
    navigationOptions: ({ navigation }) => ({
      title: 'Select dropoff place',
    }),
  },
  SelectTable: {
    screen: SelectTable,
    navigationOptions: ({ navigation }) => ({
      title: 'Select a seat',
    }),
  },
  Preview: {
    screen: Preview,
    navigationOptions: ({ navigation }) => ({
      title: 'Confirm your booking',
    }),
  },
  Confirm: {
    screen: Confirm,
    navigationOptions: ({ navigation }) => ({
      title: 'Finish',
    }),
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Chat with driver',
    }),
  },
  TrackingScreen: {
    screen: TrackingScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Tracking a bus',
    }),
  },
});

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Current Booking',
    }),
  },
  Payment: {
    screen: PaymentScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Payment',
    }),
  },
  Review: {
    screen: ReviewScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Give driver reviews and ratings',
    }),
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Chat with driver',
    }),
  },
  TrackingScreen: {
    screen: TrackingScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Tracking a bus',
    }),
  },
});

const HistoryStack = createStackNavigator({
  History: {
    screen: BookingList,
    navigationOptions: ({ navigation }) => ({
      title: 'Total bookings',
    }),
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Chat with driver',
    }),
  },
  TrackingScreen: {
    screen: TrackingScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Tracking a bus',
    }),
  },
});

const AppStack = createBottomTabNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: (
        <IconButton icon="ticket" color={theme.colors.icon} size={20} />
      ),
    },
  },
  BookingStack: {
    screen: BookingStack,
    navigationOptions: {
      tabBarLabel: 'Booking',
      tabBarIcon: (
        <IconButton icon="bus-clock" color={theme.colors.icon} size={20} />
      ),
    },
  },
  History: {
    screen: HistoryStack,
    navigationOptions: {
      tabBarLabel: 'My rides',
      tabBarIcon: (
        <IconButton icon="history" color={theme.colors.icon} size={20} />
      ),
    },
  },
  Help: {
    screen: HelpScreen,
    navigationOptions: {
      tabBarLabel: 'Help',
      tabBarIcon: (
        <IconButton
          icon="account-question-outline"
          color={theme.colors.icon}
          size={20}
        />
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
      initialRouteName: 'AuthCheck',
    },
  ),
);
