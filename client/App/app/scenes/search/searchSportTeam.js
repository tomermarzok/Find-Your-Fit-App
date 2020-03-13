import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
  } from 'react-native';
  import {baseUrl} from '../../config/utils';
  import { Container, Icon,Title, Form,Left,Right, Label, Item, Input, Header, Content, Card, CardItem, Body, Text } from 'native-base';
  
  export default class SearchSportTeam extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            category: '',
            city: '',
            price: '',
            experience: '',
            searchResult:[],
            noResult:false
          }
    }  
    async _SreachPress() {
        try {
          let response = await fetch(`${baseUrl}/coachs/searchCoachs/`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.state.name,
              category: this.state.price,
              city: this.state.city,
    
            }),
          });
    
          let res = await response.json();
    
          
          
          if (response.status >= 200 && response.status < 300) {
            console.log("res success is:" + res);
    
            if (res.length>0){
              this.props.navigation.navigate('CoachsResult',{'result':res})
            }
            else{
              this.setState({noResult:true})
            }
            
    
          }
          else {
            let errors = res;
            throw errors;
          }
    
        } catch (error) {
          console.dir(error);
    
        }
    
      }
    render(){
          return(
            <Container>
           <Header>
           <Left/>
           <Body>
             <Title>Search Coach</Title>
           </Body>
           <Right />
         </Header>
        <Content>
          <Card style={styles.card}>
            <CardItem>
              <Body>

                <Item floatingLabel>

                  <Label>Search by Name</Label>
                  <Input>
                  </Input>
                </Item>

                <Item floatingLabel>
                  <Label>Search by specialitation</Label>
                  <Input >
                  </Input>
                </Item>

   

                <Item floatingLabel>
                  <Label>Search by price</Label>
                  <Input>
                  </Input>
                </Item>


                {/* <Item floatingLabel>
                        <Label>Search by Rank</Label>
                        <Input value={this.state} ></Input>
                      </Item> */}

          

              </Body>
            </CardItem>
            <Button  title="Search"></Button>
          </Card>
        </Content>
        
      </Container>
         
          );
      }
  }
