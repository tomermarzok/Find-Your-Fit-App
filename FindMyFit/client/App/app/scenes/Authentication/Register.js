import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    View
  } from 'react-native';

import ViewContainer from '../../components/ViewContainer'
import {styles} from './styles'

  export default class Register extends Component{
      constructor(props){
          super(props);

          this.state={
              email:'',
              password:'',
              name:'',
              success:'',
              error:''
          }
      }


      async _RegisterPress(){
        this.setState({error:''})
        try{
            
            let response = await fetch('http://10.0.3.2:3000/Authentication/signup', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: this.state.email,
                  password: this.state.password,
                  name:this.state.name
                }),
              });

            let res = await response.text();

            if(response.status>=200 && response.status <300){
                this.setState({success:'Register Success!'})
                console.log("res success is:"+res);
            }
            else{
                let errors =res;
                throw errors;
            }

        }catch(errors){
                let error = JSON.parse(errors);
                this.setState({error:error.details[0].message})
            }
            console.log('err:'+error);

      }

      render(){
          return(


            <ViewContainer>
                <Text style={styles.error}>
                    {this.state.success}
                </Text>
                <View style={styles.loginView}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text)=>this.setState({name:text})}
                        value={this.state.name}
                        placeholder='NAME'
                        placeholderTextColor="black"
                        autoCorrect={false}
                        returnKeyType='next'
                        />

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
                        <TouchableOpacity style={styles.loginButton} onPress={this._RegisterPress.bind(this)}>
                            <Text style={styles.loginButtonText} >
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

