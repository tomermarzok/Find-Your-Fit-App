import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Picker
  } from 'react-native';
  import { StackActions, NavigationActions } from 'react-navigation';
  
import ViewContainer from '../../components/ViewContainer'
import {styles} from './styles'
import {baseUrl} from '../../config/utils';

  export default class Register extends Component{
      constructor(props){
          super(props);

          
            console.log('navigate pass',this.props)
          this.state={
              email:'',
              password:'',
              name:'',
              userType:'',
              success:false,
              userId:'',
              error:''
          }

        //   this.continueToRegister = this.continueToRegister.bind(this);
      }

      continueToRegister(){
        switch(this.state.userType){
            case 'Traineer' :
                this.props.navigation.navigate('TraineerRegister',{userId:this.state.userId});
                break;

            case 'coach' :
                this.props.navigation.navigate('CoachRegister',{userId:this.state.userId});
                break;
        }
      }

      async _RegisterPress(){
        this.setState({error:''})
        try{
            
            let response = await fetch(`${baseUrl}/Authentication/signup`, {
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
            
            let res = await response.json();

            if(response.status>=200 && response.status <300){
                console.log("res success is:"+res.user);
                let userId = JSON.parse(res.user)._id;
                this.setState({success:true,userId:userId});

                
            }
            else{
                let errors =res;
                console.log(errors)
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
                  {this.state.success ?<View style={styles.registerSuccessView}>
                      <Text style={styles.SuccessText} >User Created!</Text>
                      <Text style={styles.SuccessText}>Please Continue To Fill Your {this.state.userType} Details</Text>
                      <TouchableOpacity  onPress={this.continueToRegister.bind(this)}>
                              <Text style={styles.SuccessText}>
                                  continue
                            </Text>
                          </TouchableOpacity>
                  </View>:null}


                  <Text style={styles.error}>
                      {this.state.success}
                  </Text>

                  {this.state.success ? null:<View style={styles.loginView}>
                      <TextInput
                          style={styles.textInput}
                          onChangeText={(text) => this.setState({ name: text })}
                          value={this.state.name}
                          placeholder='NAME'
                          placeholderTextColor="black"
                          autoCorrect={false}
                          returnKeyType='next'
                      />

                      <TextInput
                          style={styles.textInput}
                          onChangeText={(text) => this.setState({ email: text })}
                          value={this.state.email}
                          placeholder='EMAIL'
                          placeholderTextColor="black"
                          autoCorrect={false}
                          returnKeyType='next'
                      />


                      <TextInput
                          style={styles.textInput}
                          onChangeText={(text) => this.setState({ password: text })}
                          value={this.state.password}
                          placeholder='PASSWORD'
                          secureTextEntry={true}
                          placeholderTextColor="black"
                          autoCorrect={false}
                          returnKeyType='go'
                      />
                      <Picker
                          selectedValue={this.state.userType}
                          style={{ height: 50, width: 120 }}
                          onValueChange={(itemValue, itemIndex) => this.setState({ userType: itemValue })}>
                          <Picker.Item label="User Type" value="" />
                          <Picker.Item label="Coach" value="coach" />
                          <Picker.Item label="Traineer" value="Traineer" />
                      </Picker>

                      <View style={styles.login}>
                          <TouchableOpacity style={styles.loginButton} onPress={this._RegisterPress.bind(this)}>
                              <Text style={styles.loginButtonText} >
                                  create account
                            </Text>
                          </TouchableOpacity>

                          <Text style={styles.error}>
                              {this.state.error}
                          </Text>
                      </View>
                      
                  </View>}
              </ViewContainer> 
             
          
          );
      }
  }

 