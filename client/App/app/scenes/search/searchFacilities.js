import React, { Component } from 'react';
import {
    Container, Header, Content, ListItem, Text, Radio, Right, Left,
    Body, Title,Icon, Button
} from 'native-base';
import { Slider, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/Feather';

const RADIOS_TYPES = { GYM: 'GYM', PARKS: 'PARKS', POOLS: 'POOLS', STREET_GYM: 'STREET_GYM' };



export default class SearchFacilities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showToast: false,
            radioType: '',
            Radius: 0,
            lat: null,
            lon: null


        }


    }


    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = parseFloat(position.coords.latitude);
            const lon = parseFloat(position.coords.longitude);

            this.setState({ lat, lon });
        });



    }

    async _onSearchClick() {

        const { navigate } = this.props.navigation;
        const lat = this.state.lat;
        const lon = this.state.lon;

        this.props.navigation.navigate({
            routeName: 'ResultOnMap',
            params: {
                type: this.state.radioType.toLocaleLowerCase(),
                radius: this.state.Radius,
                lat: lat,
                lon: lon,
                navigate: navigate
            }
        });


    }
    render() {
        return (

            <Container>
                <Header>
                    <Left>
                        <Icon name="menu" onPress={() => this.props.navigation.navigate('DrawerOpen')} />
                    </Left>
                </Header>
                <Content >
                    <ListItem>

                        <Text style={styles.slider_text}>{RADIOS_TYPES.PARKS}</Text>
                        <Right>
                            <Radio onPress={() => { this.setState({ radioType: RADIOS_TYPES.PARKS }) }}
                                selected={this.state.radioType === RADIOS_TYPES.PARKS} />
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Text style={styles.slider_text}>{RADIOS_TYPES.GYM}</Text>
                        <Right>
                            <Radio onPress={() => { this.setState({ radioType: RADIOS_TYPES.GYM }) }}
                                selected={this.state.radioType === RADIOS_TYPES.GYM} />
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Text style={styles.slider_text}>{RADIOS_TYPES.POOLS}</Text>
                        <Right>
                            <Radio onPress={() => { this.setState({ radioType: RADIOS_TYPES.POOLS }) }}
                                selected={this.state.radioType === RADIOS_TYPES.POOLS} />
                        </Right>
                    </ListItem>
   
                    {/* <Body>
                        <Text style={styles.radios_text} >Radios: {this.state.Radius}</Text>
                        <Slider
                            style={styles.slider}
                            maximumValue={5000}
                            minimumValue={0}
                            step={500}
                            value={this.state.Radius}
                            maximumTrackTintColor={'blue'}
                            thumbTintColor={'blue'}
                            onValueChange={val => { this.setState({ Radius: val }) }} />
                    </Body> */}
                    <Button full style={styles.search_button} onPress={() => { this.state.radioType === '' ? null : this._onSearchClick() }}>
                        <Text>SEARCH</Text>
                    </Button>

                </Content>
            </Container>


        );
    }
}
const styles = StyleSheet.create({
    slider_text: {
        color: 'blue'
    },
    slider: {
        width: 300,
        marginTop: 60,
        marginLeft: 50
    },
    radios_text: {
        color: 'red'
    },
    search_button: {
        marginTop: 50
    }
});




{/* <ListItem>
<Text style={styles.slider_text}>{RADIOS_TYPES.STREET_GYM}</Text>
<Right>
    <Radio onPress={() => { this.setState({ radioType: RADIOS_TYPES.STREET_GYM }) }}
        selected={this.state.radioType === RADIOS_TYPES.STREET_GYM} />
</Right>
</ListItem> */}