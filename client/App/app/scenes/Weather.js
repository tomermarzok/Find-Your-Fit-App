import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    Text,
    View
} from 'react-native';
import { Bubbles } from 'react-native-loader';
import {WeatherData} from './WeatherData';
// import { MaterialCommunityIcons } from 'react-native-vector-icons';

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state={
            lat:'',
            lon:'',
            temp:'',
            humidity:'',
            isLoading: true
        }
       this.get =this.get.bind(this);
    }

    async componentDidMount() {
           navigator.geolocation.getCurrentPosition(this.get)

    }
    async get(position){
        const lat = position.coords.latitude.toString();
        const lon = position.coords.longitude.toString();
      

        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=f749afa7958771b7f7592c2f2ac0c63d`
            , {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            });
            let res = await response.json();
            console.log(res)
            let temp = `${res.main.temp} C`;
            let humidity = `${res.main.humidity} %`;
            let description = res.weather[0].description;
            let name = res.name;
            let main =res.weather[0].main;
            let icon = res.weather[0].icon;
            this.setState({icon:icon,temp:temp,humidity:humidity,name:name,main:main,description:description,isLoading:false});

        }catch(err){
            console.log(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
            {this.state.isLoading ? null:
            <View>
                <WeatherData weather={this.state}/>
                {/* <Text>Humidity:{this.state.humidity}</Text>
                <Text>Temp:{this.state.temp}</Text>
                <Text>{this.state.description}</Text>
                <Text>{this.state.name}</Text>  */}
            </View> }
                {this.state.isLoading ? 
                <View> 
                    <Bubbles size={10} color="#FDAAFF"/>
                    <Text>Getting The Weather...</Text>
                </View>:null}
        
               


            </View>
        );

    }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});