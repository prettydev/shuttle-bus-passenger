import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthCheck from '../screen/AuthCheck';
import BookingList from '../screen/BookingList';
import Home from '../screen/Home';
import Login from '../screen/Login';

import { NavigationNativeContainer } from '@react-navigation/native';
import React from 'react';
import TripList from '../screen/TripList';
// import { createStackNavigator } from '@react-navigation/stack';
import { createStackNavigator } from 'react-navigation-stack';

import { useThemeContext } from '@dooboo-ui/native-theme';

// const Stack = createStackNavigator();
// function RootNavigator(): React.ReactElement {
//   const { theme } = useThemeContext();
//   return (
//     <NavigationNativeContainer>
//       <Stack.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: theme.background,
//           },
//           headerTitleStyle: { color: theme.fontColor },
//           headerTintColor: theme.tintColor,
//         }}
//       >
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="TripList" component={TripList} />
//         <Stack.Screen name="BookingList" component={BookingList} />
//       </Stack.Navigator>
//     </NavigationNativeContainer>
//   );
// }
// export default RootNavigator;

const AuthStack = createStackNavigator({ Login: Login });
const AppStack = createStackNavigator({
  Home: Home,
  TripList: TripList,
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
      initialRouteName: 'Auth',
    },
  ),
);
