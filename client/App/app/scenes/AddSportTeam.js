import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';
import { Container, Icon, Header, Content, Body, Left, Right, Title, Form, Item, Input, Label, Textarea, Picker } from 'native-base';
import { baseUrl } from '../config/utils';
import { AppNavigator } from '../App';
import FontAwesome from 'react-native-vector-icons/Feather';

const CATEGORIES = ['FATBALL', 'BASKETBALL', 'TENNIS', 'GYM', 'TRX', 'RUNNIG', 'YOGA'];

export default class AddSportTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            catergory: 'Catergory',
            details: '',
            price: '',
            costOptions: false,
            done:true
        }


        this._onCatergoryChange = this._onCatergoryChange.bind(this);
        this._onCostOptionsChange = this._onCostOptionsChange.bind(this);
        this.onPress = this.onPress.bind(this);
    }
    // static navigationOptions = {
    //     title: 'Home',

    //   };
    _onCatergoryChange(value) {
        this.setState({ catergory: value })
    }
    _onCostOptionsChange(key, value) {
        this.setState({ costOptions: key })
    }


    async onPress() {

        console.log('press,state:' + JSON.stringify(this.state))
        //let userId=this.props.navigation.state.params.userId;
        let userId = '5b204dc9e5934800048d2290';
        try {
            let response = fetch(`${baseUrl}/sportTeam/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    catergory: this.state.catergory,
                    details: this.state.details,
                    cost: this.costOptions,
                    price: this.state.price,
                    owner: userId,
                }),
            });
            let res = await response;

            if (res.status >= 200 && res.status < 300) {
                console.log("res success is:" + res);
                this.setState({done:false})
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
                            {/* <Text style={{color:'white'}}>open sport Team</Text> */}
                            <Left >
                                <Icon name="menu" onPress={() => this.props.navigation.navigate('DrawerOpen')} />
                            </Left>
                        </Header>
                {this.state.done?<Content>
            
                    <Form>
                        <Item fixedLabel>
                            <Label>Team Name :</Label>
                            <Input
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.name} />
                        </Item>
                        <Picker style={styles.picker} selectedValue={this.state.catergory}
                            onValueChange={this._onCatergoryChange}>
                            {CATEGORIES.map((category, index) => {
                                return <item label={category} key={index} value={category} />
                            })}
                        </Picker>
                        <Item fixedLabel>

                        </Item>
                        <Picker style={styles.picker} selectedValue={this.state.costOptions} onValueChange={this._onCostOptionsChange}>
                            <Picker.Item label="With Cost" value={true} />
                            <Picker.Item label="No Cost" value={false} />
                        </Picker>
                        <Item >

                        </Item>
                        {this.state.costOptions ? <Item>
                            <Label>Cost of participation</Label>
                            <Input onChangeText={(text) => this.setState({ price: text })} value={this.state.price} ></Input>
                        </Item> : null}
                        <Item>
                            <Form style={styles.textAreaForm}>
                                <Textarea style={styles.textArea}
                                    rowSpan={5}
                                    bordered placeholder="Details"
                                    onChangeText={(text) => this.setState({ details: text })} />
                            </Form>
                        </Item>
                    </Form>
                    <Container style={styles.doneButton}>
                        <Button onPress={this.onPress} title={'Done'}></Button>
                    </Container>
                    
                </Content>:<Text>You Have New Sport Team!</Text>}
               
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textAreaForm: {
        width: 300,
        marginLeft: 10
    },
    textArea: {
        marginTop: 10,
        borderRadius: 20,
        marginBottom: 4
    },
    picker: {
        marginTop: 10,
        marginLeft: 9
    },
    doneButton: {
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20

    },
    header: {
        width: 20
    }
});

