//index.js
import { AppRegistry } from 'react-native';
import App from '../App';  // Vérifiez si le chemin est correct
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
