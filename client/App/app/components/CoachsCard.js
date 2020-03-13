import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View
  } from 'react-native';
  import { Container, Header,Right,Title,Button,Icon, Content, Card,Left, CardItem, Body, Text } from 'native-base';
  
  export default class CoachsCard extends Component{
      constructor(props){
          super(props);
      }
      render(){
        {console.log(this.props)}
          return(
       
 
            <Content padder>
              <Card>
                <CardItem header bordered>
                  <Text>{this.props.coach.name}</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>Specialitation:</Text>
                    <Text>{this.props.coach.specialitation}</Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>City:{this.props.coach.city}</Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>Price:{this.props.coach.price}</Text>
                  </Body>
                </CardItem>
                <CardItem footer bordered>
                <Body>
                  <Text>Experience:{this.props.coach.experience}</Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
   
  

              
          );
      }
  }
//   <Card>
//   <CardItem>
//     <Body>
//       <Text>Name:{this.props.coach.name}</Text>
//       <Text>specialitation:{this.props.coach.specialitation}</Text>
//       <Text>city:{this.props.coach.city}</Text>
//       <Text>price:{this.props.coach.price}</Text>
//       <Text>experience:{this.props.coach.experience}</Text>
//     </Body>
//   </CardItem>
// </Card>