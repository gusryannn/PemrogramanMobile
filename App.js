import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import Home from './Home';
import Explore from './Explore';
import About from './About';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#1F2937',
          },
          tabBarActiveTintColor: '#0284C7',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E5E7EB',
            height: 62,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarIcon: ({ focused }) => {
            let icon = '🏠';
            if (route.name === 'Home') icon = '🏠';
            else if (route.name === 'Explore') icon = '🧭';
            else if (route.name === 'About') icon = '👤';

            return <Text style={{ fontSize: focused ? 22 : 18 }}>{icon}</Text>;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ title: 'Beranda' }} />
        <Tab.Screen name="Explore" component={Explore} options={{ title: 'Eksplorasi' }} />
        <Tab.Screen name="About" component={About} options={{ title: 'Tentang' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
