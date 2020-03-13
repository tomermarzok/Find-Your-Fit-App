/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flowx
 */
// debug - http://localhost:8081/debugger-ui/

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Text,
  View,
} from 'react-native';

import ViewContainer from './components/ViewContainer'
import Login from './scenes/Authentication/Login'
import Register from './scenes/Authentication/Register'
import Home from './scenes/Home'
import Root from './components/Root'
type Props = {};

const AppNavigator = StackNavigator({
  
  Login:{screen:Login},
  Root:{screen:Root},
  Register:{screen:Register},
  Home:{screen:Home},
  

},
  {
    initalRouteName:'Login',
  }
);

export default class App extends Component<Props> {


  render() {
     
      return( <AppNavigator/>);

  }
}
