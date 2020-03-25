import { AppRegistry, YellowBox } from 'react-native';
import { decode, encode } from 'base-64';
import App from './src/App';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
/**
 * React Native 0.54 warning message ignore.
 */
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader',
]);

AppRegistry.registerComponent('shuttlebus', () => App);
