import React, { Component } from 'react';
import {
    StyleSheet,

} from 'react-native';
import { Container, Header, Content, Input, Card, CardItem,
     Item, Text, Body, Thumbnail,Button } from 'native-base';
     import {baseUrl} from '../config/utils';
     
export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Age: '',
            Wegiht: '',
            Height: '',
            // _id:''

        }

        this.updateProfile =this.updateProfile.bind(this);
    }



    async componentDidMount() {

        let response = await fetch(`${baseUrl}//trainers/userProfile/5b210feb4abcc50004f05bc2`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let res = await response.json();
        console.log(response)
        if (response.status >= 200 && response.status < 300) {
            console.log("res success is:" + res[0]);
            let profile = res[0];
            this.setState(
                { Name: profile.Name, Age: profile.Age,
                  Wegiht: profile.Wegiht, Height: profile.Height
                });
        }
        else {
            let errors = res;
            throw errors;
        }

    }
    async updateProfile(){
        
        let body = await this.state;
        try {
            let response = fetch('http://10.0.2.2:3000/trainers/5af5ec21d0a9ac45cf0445ff', {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            let res = await response;

            if(res.status>=200 && res.status <300){
                console.log("res success is:" + res);
            }
            else{
              let errors =res;
              throw errors;
            }

        } catch (error) {
          console.dir(error);
          
        }
    }
    cencelButton(){

    }
    render() {

        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return (
            <Container >
                <Header />
                <Content padder>
                    <Card>
                        <CardItem style={styles.container} bordered>
                            <Thumbnail onPress={() => { console.log('click pic') }} large source={{ uri: uri }} />
                        </CardItem>
                        <CardItem>
                            <Text style={styles.lable}>Name:</Text>
                            <Item style={styles.row} rounded>
                                <Input value={this.state.Name}
                                    onChangeText={(Name) => this.setState({ Name })} />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Text style={styles.lable}>Age:</Text>
                            <Item style={styles.row} rounded>
                                <Input value={this.state.Age}
                                    onChangeText={(Age) => this.setState({ Age })} />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Text style={styles.lable}>Wegiht:</Text>
                            <Item style={styles.row} rounded>
                                <Input value={this.state.Wegiht}
                                    onChangeText={(Wegiht) => this.setState({ Wegiht })} />
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Text style={styles.lable}>Height:</Text>
                            <Item style={styles.row} rounded>
                                <Input value={this.state.Height}
                                    onChangeText={(Height) => this.setState({ Height })} />
                            </Item>
                        </CardItem>
                    </Card>
                </Content>
                <Button style={styles.saveButton} onPress={this.updateProfile} rounded success>
                    <Text style={styles.saveButtonText}>Save</Text>
                </Button>
                <Button style={styles.saveButton} rounded danger>
                    <Text style={styles.saveButtonText}>cencel</Text>
                </Button>
            </Container>

        );
    }
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#1dcaff'
    },
    row: {
        width: 280,
    },
    lable: {
        marginRight: 5,
        fontSize: 20
    },
    imageProfie: {
        marginLeft: 140
    },
    saveButton:{
        width:120,
        height:40,
        marginLeft:100,
        paddingBottom:20
    },
    saveButtomText:{
        paddingRight:15,
        
    }
});



