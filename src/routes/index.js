import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, Home, SplahScreen, DetailDonasi} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from '../Components/MyTabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="File" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="About" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={Home} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen
          name="SplashScreen"
          component={SplahScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailDonasi"
          component={DetailDonasi}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
