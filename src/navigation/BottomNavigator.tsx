import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {Tab1} from './Tab1';
import {Tab2} from './Tab2';
import {Tab3} from './Tab3';
import {ListHeader} from '../components/ListHeader';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'purple',
      }}
      screenOptions={{
        tabBarActiveTintColor: '#2bc48a',
        tabBarStyle: {
          backgroundColor: 'white',
        },
        headerShown: false,
        // header: props => <ListHeader />,
      }}>
      <Tab.Screen
        name="Tab1"
        component={Tab1}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="list-outline" />
          ),
          headerShown: false,
          // header: props => <ListHeader />,

          // header: props => <ListHeader />,
        }}
      />
      <Tab.Screen
        name="Tab3"
        component={Tab3}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="map-outline" />
          ),
        }}
      />

      <Tab.Screen
        name="Tab2"
        component={Tab2}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="person-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
