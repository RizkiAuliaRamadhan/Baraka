import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, Home, SplahScreen, DetailDonasi, DetailSedekah, ZakatPertanian, ZakatUang, ZakatEmas, Catatan, About} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from '../Components/MyTabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Catatan" component={Catatan} options={{headerShown: false}} />
      <Tab.Screen name="About" component={About} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={Register} options={{headerShown: false}} />
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
        <Stack.Screen
          name="DetailSedekah"
          component={DetailSedekah}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pertanian"
          component={ZakatPertanian}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Uang"
          component={ZakatUang}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Emas"
          component={ZakatEmas}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
