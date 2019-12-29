import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthCheck from '../screen/AuthCheck';
import BookingList from '../screen/BookingList';
import DropoffMap from '../screen/DropoffMap';
import Home from '../screen/Home';
import Login from '../screen/Login';
import PickupMap from '../screen/PickupMap';
import TripDetails from '../screen/TripDetails';
import TripList from '../screen/TripList';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

const AuthStack = createStackNavigator({ Login: Login });

const TripStack = createStackNavigator({
  TripList: TripList,
  TripDetails: TripDetails,
  PickupMap: PickupMap,
  DropoffMap: DropoffMap,
});

const AppStack = createBottomTabNavigator({
  Home: Home,
  Trip: TripStack,
  BookingList: BookingList,
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
