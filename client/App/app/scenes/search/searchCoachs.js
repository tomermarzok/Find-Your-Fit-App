import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Button

} from 'react-native';
import { Container, Icon,Title, Form,Left,Right, Label, Item, Input, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import CoachsCard from '../../components/CoachsCard'
import {baseUrl} from '../../config/utils';

export default class SearchCoachs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      specialitation: '',
      city: '',
      price: '',
      experience: '',
      searchResult:[],
      noResult:false
    }
    
    this._SreachPress = this._SreachPress.bind(this);
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
          price: this.state.price,
          experience: this.state.experience,
          specialitation: this.state.specialitation,
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
  render() {
    return (

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
                  <Input
                    onChangeText={(text) => this.setState({ name: text })} >
                  </Input>
                </Item>

                <Item floatingLabel>
                  <Label>Search by specialitation</Label>
                  <Input
                    onChangeText={(text) => {
                      text = text.toUpperCase();
                      this.setState({ specialitation: text })
                    }
                    } >
                  </Input>
                </Item>

                <Item floatingLabel>
                  <Label>Search by city</Label>
                  <Input
                    onChangeText={(text) => this.setState({ city: text })}  >
                  </Input>
                </Item>

                <Item floatingLabel>
                  <Label>Search by price</Label>
                  <Input
                    onChangeText={(text) => this.setState({ price: text })}  >
                  </Input>
                </Item>


                {/* <Item floatingLabel>
                        <Label>Search by Rank</Label>
                        <Input value={this.state} ></Input>
                      </Item> */}

                <Item floatingLabel>
                  <Label>Search by experience</Label>
                  <Input value={this.state.experience}
                    onChangeText={(text) => this.setState({ experience: text })}  >
                  </Input>
                </Item>

              </Body>
            </CardItem>
            <Button onPress={this._SreachPress} style={styles.button} title="Search"></Button>
            {this.state.noResult ? <Text style={styles.noResult}>No Results</Text> : null}
          </Card>
        </Content>
        
      </Container>

    );
  }
}
const styles = StyleSheet.create({
  card: {
    height: 600,
    marginTop:25,
    marginLeft:4,
    marginRight:4
  },
  button: {
    marginTop: 20
  },
  noResult:{
    fontSize:30,
    color:'red',
    paddingLeft:140,
    paddingBottom:200 ,
  
  }
})