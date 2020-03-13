import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';
  
  export default class App extends Component{
      render(){
          return(
            <View style={styles.mainView}>
                <Text >Welcame Frined!</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}} style={styles.loginButtonText}>
                    <Text>Login</Text>
                </TouchableOpacity> 

                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Register')}} style={styles.loginButtonText}>
                    <Text>Register</Text>
                </TouchableOpacity> 
            </View>
          );
      }
  }



const styles = StyleSheet.create({
    mainView:{
        flex:1,
        paddingRight:50,
        fontWeight:'bold'
    },
    loginButtonText:{
        fontSize:14,
        paddingTop:3,
        fontWeight:'bold'
    },
  });