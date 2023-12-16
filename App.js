// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './src/components/WelcomePage';
import WeatherScreen from './src/components/WeatherScreen';

 import LoginForm from './src/components/LoginForm';
 import SignUpForm from './src/components/SignUpForm';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="SignUpForm" component={SignUpForm} />
        <Stack.Screen name="WeatherScreen" component={WeatherScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
