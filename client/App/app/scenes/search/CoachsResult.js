import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    
  } from 'react-native';
  import {Container,Content,Title,Right,Icon,Body,Button,Left,Header} from 'native-base'
  import CoachsCard from '../../components/CoachsCard'
  
  export default class CoachsResult extends Component{
      constructor(props){
          super(props);
          this.state={
            Coaches:[]
          }

      }

     componentWillMount(){
         const data = this.props.navigation.state.params.result;
       
         const Coaches = Object.keys(data).map(i => {
            return data[i] 
        });
        this.setState({Coaches:Coaches})


        
      }
      render(){
          return(
            <Container>
            <Header>
            <Left>
              <Button transparent>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Search Result</Title>
            </Body>
            <Right />
          </Header>
            <Content padder>
              <FlatList data={this.state.Coaches}
              renderItem={({item}) => <CoachsCard coach={item}/>}
              />
            </Content>
            </Container>
            
              
          );
      }
  }
