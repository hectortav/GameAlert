/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import GetList from './components/List';
import Prefs from './components/Prefs';
import Main from './components/Main';

AppRegistry.registerComponent(appName, () => Main);
