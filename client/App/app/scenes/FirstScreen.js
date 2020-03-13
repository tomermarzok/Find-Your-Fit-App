import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TouchableOpacity
  } from 'react-native';

  import { Button,Container,Text} from 'native-base';

  export default class FirstScreen extends Component{
      constructor(props){
          super(props)
      }

      render(){
          return(

              <Container style={styles.viewContainer}>
                <Container style={styles.secondContainer}>
                  <Container style={styles.buttonContainer}>
                      <Text style={styles.headerText}>FIND MY FIT</Text>
                      <Button rounded info
                          style={styles.loginButton}
                          onPress={() => { this.props.navigation.navigate('Login') }}>
                          <Text style={styles.buttonText}>Login</Text>
                      </Button>

                      <Button rounded info
                          style={styles.loginButton}
                          onPress={() => { 
                              console.log(this.props.navigation)
                              this.props.navigation.navigate('Register');
                               }}
                      >
                          <Text style={styles.buttonText}>Sign Up</Text>
                      </Button>
                  </Container>
                  </Container>
              </Container>
              
          );
      }
  }

  const styles = StyleSheet.create({
    viewContainer:{
        backgroundColor:'#14171a',
   
    },
    secondContainer:{
        width:350,
        marginTop:80,
    },
    buttonContainer:{
        marginTop:5,
        width:350,
        marginLeft:30
    },
    headerText:{
        // color:'#aab8c2',
        color:'white',
        fontFamily:'Comfortaa',
        fontSize:50,
        paddingLeft:40,
        marginBottom:50,
        fontWeight:"bold",
        textDecorationLine: 'underline',
    },
    loginButton:{
        width:200,
        height:50,
        marginLeft:80,
        marginRight:80,
        marginTop:30,
        backgroundColor:'#00BFFF',
        
       
       
    },

    buttonText:{
        marginLeft:50,
        fontFamily:'Roboto',
        fontSize:18,
        fontWeight:"bold",
        
    }
  });

//   const styles = StyleSheet.create({
//     viewContainer:{
//         backgroundColor:'#808080',
   
//     },
//     secondContainer:{
//         width:300,
//         marginTop:150,
//     },
//     buttonContainer:{
//         marginTop:80,
//         width:300,
//         marginLeft:30
//     },
//     headerText:{
//         color:'#87CEFA',
//         fontFamily:'Comfortaa',
//         fontSize:50,
//         paddingLeft:40,
//         marginBottom:13,
//         fontWeight:"bold"
//     },
//     loginButton:{
//         width:200,
//         height:50,
//         marginLeft:80,
//         marginRight:80,
//         marginTop:30,
//         color:'#00BFFF',
       
//     },

//     buttonText:{
//         marginLeft:50,
//         fontFamily:'Roboto',
//         fontSize:18,
//     }
//   });