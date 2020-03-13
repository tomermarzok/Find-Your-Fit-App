import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    AsyncStorage,
    View
  } from 'react-native';

import ViewContainer from '../../components/ViewContainer'
import {styles} from './styles'

const ACCESS_TOKEN = 'access_token'
const UnauthorizedError= 'Unauthorized'

  export default class Login extends Component{
      constructor(props){
          super(props);

          this.state={
              email:'',
              password:'',
              error:''

          }

       
      }

    async storeToken(accessToken){
        try{
             await AsyncStorage.setItem(ACCESS_TOKEN,accessToken);
           
            this.getToken();

        }catch(error){
            console.log('sonething went wrong token not stored');
        }
    }

    async getToken(){
        try{
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            console.log("token is:"+token);

        }catch(error){
            console.log('sonething went wrong,can get token');
        }
    }

    async _LoginPress(){
        this.setState({error:''})
        try{
            
            let response = await fetch('http://10.0.3.2:3000/Authentication/signin', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: this.state.email,
                  password: this.state.password,
                }),
              });

            let res = await response.text();
            let accessToken = res;

            this.storeToken(accessToken);

            if(response.status>=200 && response.status <300){
                console.log("res success is:"+res);
                this.props.navigation.navigate(accessToken ? 'Home' : 'Login',accessToken);
            }
            else{
                let errors =res;
                throw errors;
            }

        }catch(errors){
            if (errors==UnauthorizedError)
                {
                    this.setState({error:errors})
                }
            else{
                let error = JSON.parse(errors);
                this.setState({error:error.details[0].message})
            }
            console.log('err:'+error);

        }


      }


      render(){
          return(

            <ViewContainer>
                <View style={styles.loginView}>
                    <TextInput
                     style={styles.textInput}
                     onChangeText={(text)=>this.setState({email:text})}
                     value={this.state.email}
                     placeholder='EMAIL'
                     placeholderTextColor="black"
                     autoCorrect={false}
                     returnKeyType='next'
                     />


                    <TextInput 
                    style={styles.textInput}
                    onChangeText={(text)=>this.setState({password:text})}
                    value={this.state.password}
                    placeholder='PASSWORD'
                    secureTextEntry={true}
                    placeholderTextColor="black"
                    autoCorrect={false}
                    returnKeyType='go'
                    />  

                    <View style={styles.login}>
                        <TouchableOpacity style={styles.loginButton} onPress={this._LoginPress.bind(this)}>
                            <Text style={styles.loginButtonText} >
                                Login
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Register')}} style={styles.register}>
                            <Text>
                                create acount
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.error}>
                            {this.state.error}
                        </Text>
                    </View>
                </View>
            </ViewContainer>              
          
          );
      }
  }

