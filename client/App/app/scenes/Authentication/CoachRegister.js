import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Picker
  } from 'react-native';
import { Container, Header,Button, Content, Form, Item, Input } from 'native-base';
import {baseUrl} from '../../config/utils';



const CATEGORIES =['FATBALL','BASKETBALL','TENNIS','GYM','TRX','RUNNIG','YOGA'];

  export default class CoachRegister extends Component{
      constructor(props){
          super(props);
          console.log('coach page')
            
          this.state={
            name:'',
            price:'',
            experience:'',
            certificates:'',
            specialitation:'Please choose specialitation',
           
          };

        //   const userId = this.props.navigation.state.params.userId;
          


          this._onPressRegister=this._onPressRegister.bind(this);
          this._onValueChange =this._onValueChange.bind(this);
        }

      _onValueChange(key,value){
         this.setState({specialitation:key})
      }
      
      async _onPressRegister() {
          console.log('this.userId',this.props.navigation.state);
        //   let userId=this.props.navigation.state.params.userId;

          try {
              let response = fetch(`${baseUrl}/users/${userId}/coach/`, {
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      name: this.state.name,
                      price: this.state.price,
                      experience: this.state.experience,
                      specialitation: this.state.specialitation,
                  }),
              });
              let res = await response;

              if(res.status>=200 && res.status <300){
                this.props.navigation.navigate('Home')
                console.log("res success is:" + JSON.parse(res));
                  
              }
              else{
                let errors =res;
                throw errors;
              }

          } catch (error) {
            console.dir(error);
            
          }
      }
      
      render(){
          return(
              <Container>
                  <Header />
                  <Content>
                      <Form>
                          <Item>
                              <Input placeholder="Name"
                                  onChangeText={(text) => this.setState({ name: text })}
                                  value={this.state.name} />
                          </Item>
                          <Item>
                              <Input placeholder="Price"
                                  onChangeText={(text) => this.setState({ price: text })}
                                  value={this.state.price} />
                          </Item>

                          <Item>
                              <Input placeholder="Certificates"
                                  onChangeText={(text) => this.setState({ certificates: text })}
                                  value={this.state.certificates} />
                          </Item>
                          
                          <Item last>
                              <Input placeholder="experience"
                                  onChangeText={(text) => this.setState({ experience: text })}
                                  value={this.state.experience} />

                          </Item>
                       
                          <Text>{this.state.specialitation}</Text>

                          <Picker selectedValue={this.state.specialitation}
                              onValueChange={this._onValueChange}>
                              {CATEGORIES.map((category,index) => {
                                  return <item label={category} key={index} value={category} />
                              })}

                          </Picker>

                          <Button onPress={this._onPressRegister}>
                              <Text>Register </Text>
                          </Button>
                      </Form>
                  </Content>
              </Container>

          );
      }
  }
 