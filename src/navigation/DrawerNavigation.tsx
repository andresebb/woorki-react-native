import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  useWindowDimensions,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {BottomNavigator} from './BottomNavigator';
import {MapScreen} from '../screens/MapScreen';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      screenOptions={{
        // drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        swipeEdgeWidth: 120,
        headerShown: false,
      }}
      drawerContent={props => <MenuInterno {...props} />}>
      <Drawer.Screen name="BottomNavigator" component={BottomNavigator} />
      <Drawer.Screen name="MapScreen" component={MapScreen} />
    </Drawer.Navigator>
  );
};

const MenuInterno = ({navigation}: any) => {
  const {signOutFirebase} = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={styles.avatarContainer}>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
        <Text
          style={{
            fontSize: 20,
            marginVertical: 14,
            fontWeight: 'bold',
            opacity: 0.8,
          }}>
          Andres Betancourt
        </Text>
      </View>

      {/* Opciones de menú */}
      <View style={styles.menuContainer}>
        <View style={styles.line} />
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            style={styles.menuBoton}
            onPress={() => console.log('hola')}>
            <Icon name="person-outline" size={24} color="black" />
            <Text style={styles.menuTexto}>Profile Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBoton}
            onPress={() => navigation.navigate('SettingScreen')}>
            <Icon color="black" size={24} name="build-outline" />
            <Text style={styles.menuTexto}>Work Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBoton}
            onPress={() => navigation.navigate('SettingScreen')}>
            <Icon color="black" size={24} name="lock-open-outline" />
            <Text style={styles.menuTexto}>Security Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBoton}
            onPress={() => navigation.navigate('SettingScreen')}>
            <Icon color="black" size={24} name="warning-outline" />
            <Text style={styles.menuTexto}>Danger Zone</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 10,
          marginBottom: 12,
        }}
        onPress={() => signOutFirebase()}>
        <Text style={{...styles.menuTexto, marginRight: 5}}>Sign Out</Text>
        <Icon color="#2bc48a" size={24} name="chevron-forward-outline" />
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  avatarContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  menuContainer: {
    // marginVertical: 20,
    flex: 1,
  },
  menuBoton: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTexto: {
    fontSize: 18,
    marginLeft: 12,
    color: 'black',
  },

  line: {
    height: 0.5,
    backgroundColor: '#b5b5b5',
  },
});
