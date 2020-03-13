
import React from "react";
// import { Platform, StatusBar } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from "react-navigation";



import ViewContainer from './components/ViewContainer';
import Login from './scenes/Authentication/Login';
import Register from './scenes/Authentication/Register';
import FirstScreen from './scenes/FirstScreen';
import Home from './scenes/Home';
import Root from './components/Root';
import Map from './components/Map';
import UserProfile from './components/UserProfile';
import SearchFacilities from './scenes/search/searchFacilities';
import UserType from './scenes/UserType';
import CoachRegister from './scenes/Authentication/CoachRegister';
import TraineerRegister from './scenes/Authentication/TraineerRegister';
import SearchCoachs from './scenes/search/searchCoachs';
import CoachsCard from './components/CoachsCard';
import CoachsResult from './scenes/search/CoachsResult';
import ResultOnMap from './scenes/search/ResultOnMap';


export const SignedOut = StackNavigator({
    SignUp: {
      screen: Register,
      navigationOptions: {
        title: "Sign Up",
        headerStyle
      }
    },
    SignIn: {
      screen: Login,
      navigationOptions: {
        title: "Sign In",
        headerStyle
      }
    }
  });
  

  export const SignedIn = TabNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="home" size={30} color={tintColor} />
          )
        }
      },
      Profile: {
        screen: UserProfile,
        navigationOptions: {
          tabBarLabel: "Profile",
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="user" size={30} color={tintColor} />
          )
        }
      }
    },
    {
      tabBarOptions: {
        style: {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }
      }
    }
  );


  export const createRootNavigator = (signedIn = false) => {
    return SwitchNavigator(
      {
        SignedIn: {
          screen: SignedIn
        },
        SignedOut: {
          screen: SignedOut
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    );
  };