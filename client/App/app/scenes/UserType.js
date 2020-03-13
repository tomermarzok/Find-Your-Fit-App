import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    Text,
    View
  } from 'react-native';
  

  export default class UserType extends Component{
    constructor(props){
        super(props);
        
        const { navigate } = this.props.navigation;

        this.state={
            navigate:navigate       
        }
        this._onPress1 = this._onPress1.bind(this);
        this._onPress2 = this._onPress2.bind(this);
    }
    _onPress1(){
        this.state.navigate('TraineerRegister',this.state.navigate)
    }
    _onPress2(){
        this.state.navigate('CoachRegister',this.state.navigate)
    }


      render(){
          return(

              <View>
                  <Text style={styles.header} >אנא בחר את סוג המשתמש שאתה</Text>
                  <View style={styles.buttons}>
                      <Button onPress={this._onPress1}  title="מתאמן"></Button>
                      <Button onPress={this._onPress2} style={styles.button1} title="מאמן"></Button>
                  </View>
              </View>
              
          );
        }

 }
const styles = StyleSheet.create({
      header:{
        alignSelf:'center',
        paddingTop:200,
        fontSize:20
      },
      buttons:{
          margin:50
      }
  });