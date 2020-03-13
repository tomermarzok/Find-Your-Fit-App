import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
  } from 'react-native';
  
  export default class App extends Component{
      constructor(props){
          super(props)
      }
      render(){
          console.log('check',this.props.navigation.state.params)
          return(
              <Text>{this.props.navigation.state.params}</Text>
          );
      }
  }
