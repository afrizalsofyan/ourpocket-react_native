/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/helpers/NotifService';

AppRegistry.registerComponent(appName, () => App);
