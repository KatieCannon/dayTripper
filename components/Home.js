// In App.js in a new project

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './Login';
import SignUpScreen from './SignUp';
import ProfileScreen from './Profile.js';
import DashBoardScreen from './DashBoard';
import PlanScreen from './Plan';
import PreferencesScreen from './Preferences';
import HistoryScreen from './History';
import SavedMapsScreen from './SavedMaps';
import ItineraryScreen from './Itinerary';
import MapScreen from './Map.js';
import BgImg from '../assets/bgImgDT.png';
import Floppy from '../assets/iconfinder_floppy.png';
import Preferences from '../assets/preferences.png';

class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
  };
  render() {
    return (
      <View elevation={5} style={styles.container}>
        <Image source={BgImg} style={styles.backgroundImage} />
        <Image
          source={require('../assets/logo.png')}
          style={{ height: 140, width: 200 }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(0, 112, 149)',
            borderRadius: 10,
            borderColor: 'black',
            marginVertical: 8,
            alignItems: 'center',
            borderWidth: 1,
            width: 200,
            paddingBottom: 10,
            paddingTop: 10,
          }}
          title="Login"
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text
            style={{
              fontFamily: 'KohinoorDevanagari-Semibold',
              fontSize: 18,
              color: 'white',
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(0, 112, 149,0.6)',
            borderRadius: 10,
            borderColor: 'black',
            marginVertical: 8,
            alignItems: 'center',
            borderWidth: 1,
            width: 200,
            paddingBottom: 10,
            paddingTop: 10,
            // marginLeft: 29
          }}
          title="Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text
            style={{
              fontFamily: 'KohinoorDevanagari-Semibold',
              fontSize: 18,
              color: 'white',
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const RootStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        drawerLabel: 'Home',
        drawerIcon: () => (
          <Image source={require('../assets/home.png')} style={[styles.icon]} />
        ),
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        title: 'Login',
      }),
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => ({
        title: '',
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        title: '',
        // drawerIcon: () => (
        // <Image
        //   source={require('../assets/profile.png')}
        //   style={[styles.icon]}
        // />
        // ),
      }),
    },
    DashBoard: {
      screen: DashBoardScreen,
      navigationOptions: () => ({
        title: 'Dashboard',
      }),
    },
    Plan: {
      screen: PlanScreen,
      navigationOptions: () => ({
        title: 'Location',
        drawerIcon: () => (
          <Image
            source={require('../assets/location.png')}
            style={[styles.icon]}
          />
        ),
      }),
    },
    Preferences: {
      screen: PreferencesScreen,
      navigationOptions: () => ({
        title: 'Preferences',
        drawerIcon: () => <Image source={Preferences} style={[styles.icon]} />,
      }),
    },
    SavedMaps: {
      screen: SavedMapsScreen,
      navigationOptions: () => ({
        title: 'SavedMaps',
        drawerIcon: () => <Image source={Floppy} style={[styles.icon]} />,
      }),
    },
    Itinerary: {
      screen: ItineraryScreen,
      navigationOptions: () => ({
        title: 'Itinerary',
        drawerIcon: () => (
          <Image
            source={require('../assets/itinerary.png')}
            style={[styles.icon]}
          />
        ),
      }),
    },
    Map: {
      screen: MapScreen,
      navigationOptions: () => ({
        title: 'Map',
        drawerIcon: () => (
          <Image source={require('../assets/map.png')} style={[styles.icon]} />
        ),
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        title: '',
      }),
    },
  },
  {
    initialRootName: 'Home',
    order: [
      'Home',
      'Preferences',
      'Plan',
      'Itinerary',
      'Map',
      'SavedMaps',
      'Login',
      'SignUp',
      'Profile',
    ],
    contentOptions: {
      activeBackgroundColor: 'rgba(0, 112, 149, 1)',
      activeTintColor: 'white',
      itemsContainerStyle: {
        marginVertical: 30,
      },
    },
    drawerPosition: 'right',
    drawerWidth: 175,
    drawerType: 'slide',
  },
);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createAppContainer(RootStack);
