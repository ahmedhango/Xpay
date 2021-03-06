/**
 * @format
 */
 import 'react-native-gesture-handler';
 import React from 'react';
 import { AppRegistry } from 'react-native';
 import App from './App';
 import { name as appName } from './app.json';
 
 const HeadlessCheck = ({ isHeadless }) => {
     if (isHeadless) {
         return null
     }
     return <App />
 }
 
 AppRegistry.registerComponent(appName, () => HeadlessCheck);
 