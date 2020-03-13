import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,

    View,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/Feather';



import { Button,Content,Icon, Container, Text, Left, Right, Body, Grid, Title, Row, Header } from 'native-base';

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
            
                    <Header>
                        <Left>
                            <Icon name="menu" onPress={()=>this.props.navigation.navigate('DrawerOpen')}/>
                        </Left>
                    </Header> 
                    <Container style={styles.viewContainer} >
                    <Button rounded
                        onPress={() => { this.props.navigation.navigate('SearchFacilities',{ 'navigate': this.props.navigate }) }}
                        style={styles.button}>
                        <Text style={styles.textButton}>Search Facilities</Text>
                    </Button>
                    <Button rounded
                        onPress={() => { this.props.navigation.navigate('SearchCoachs', { 'navigate': this.props.navigate }) }}
                        style={styles.button}>
                        <Text style={styles.textButton}>SEARCH COACHS</Text>
                    </Button>

                    <Button rounded
                        onPress={() => { this.props.navigation.navigate('SearchSportTeam') }}
                        style={styles.button}>
                        <Text style={styles.textButton}>SEARCH SPORT GROUPS</Text>
                    </Button>
                    <Button rounded
                        onPress={() => { this.props.navigation.navigate('Weather') }}
                        style={styles.button}>
                        <Text style={styles.textButton}>CHECK WEATHER</Text>
                    </Button>
                    <Button rounded
                        onPress={() => { this.props.navigation.navigate('UserProfile') }}
                        style={styles.button}>
                        <Text style={styles.textButton}>YOUR PROFILE</Text>
                    </Button>
                    <Button rounded
                        onPress={() => { this.props.navigation.navigate('AddSportTeam') }}
                        style={styles.button}>
                        <Text style={styles.textButton}>OPEN SPORT TEAM</Text>
                    </Button>
                  
            </Container>
            </Container>
            

        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        // paddingTop: 120,
        // paddingBottom: 120,
        paddingLeft: 80,
        marginTop:0,
        backgroundColor: '#dcebef'
    },
    button: {
        width: 200,
        marginTop: 10,
        backgroundColor: '#00aced'

    },
    textButton: {
        marginLeft: 30,

    }
});