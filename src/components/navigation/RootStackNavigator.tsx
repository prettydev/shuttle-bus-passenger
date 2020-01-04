import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthCheck from '../screen/AuthCheck';
import BookingList from '../screen/BookingList';
import Confirm from '../screen/Confirm';
import DropoffMap from '../screen/DropoffMap';
import ForgotPassword from '../screen/ForgotPasswordScreen';
import Home from '../screen/Home';
import Login from '../screen/Login';
import PickupMap from '../screen/PickupMap';
import Preview from '../screen/Preview';
import Register from '../screen/RegisterScreen';
import SelectTable from '../screen/SelectTable';
import TripDetails from '../screen/TripDetails';
import TripList from '../screen/TripList';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
  ForgotPassword: ForgotPassword,
});

const TripStack = createStackNavigator({
  TripList: TripList,
  TripDetails: TripDetails,
  PickupMap: PickupMap,
  DropoffMap: DropoffMap,
  SelectTable: SelectTable,
  Preview: Preview,
  Confirm: Confirm,
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
