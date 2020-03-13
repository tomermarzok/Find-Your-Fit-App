import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
  } from 'react-native';

  export default class ViewContainer extends Component{
      render(){
          return(
              <View style={StyleSheet.ViewContainer}>
                {this.props.children}
              </View>
          );
      }
  }

  const styles = StyleSheet.create({
      ViewContainer:{
          flex:1,
          flexDirection:'column',
          justifyContent:'flex-start',
          alignItems:'stretch',
          
      }

  })
