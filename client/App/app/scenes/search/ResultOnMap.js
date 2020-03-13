import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    Text,
    View,
    Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Bubbles } from 'react-native-loader';

const RADIOS_TYPES = { GYM: 'gym', PARKS: 'parks', POOLS: 'pools', STREET_GYM: 'street_gym' };
const pools = require('../../asset/PoolPoint.json');
const gym_street = require('../../asset/GymParkPoint2.json');
// const gym_street = require('../../asset/GymPark.json');

const {width,height} = Dimensions.get('window');
const SCREEN_WIDTH =width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = width/height;
const LATTITUDE_DELTA =0.0922;
const LONGTITUDE_DELTA=LATTITUDE_DELTA*ASPECT_RATIO;


export default class ResultOnMap extends Component {
    constructor(props) {
        super(props);
        const PARAMS = this.props.navigation.state.params;
        this.API_KEY = 'AIzaSyB0uXi4RwJPIyzwMxFBm3PHTL3cTtyDUA4'
        // lat: parseFloat(PARAMS.lat),
        // lon: parseFloat(PARAMS.lon),
        // lat: 31.797078,
        // lon: 34.653241,
        this.watchID=null;
        this.state = {
            isLoading:true,
            initialPosition:null,
            lat: 0,
            lon: 0,
            places: null,
            type: PARAMS.type,
            radius: PARAMS.radius,
            show:false,
            markerPosition:{
                latitude:0,
                longitude:0
            }
        }
        // this.getUrlWithParamters = this.getUrlWithParamters.bind(this);
        this.getGymOrParkLocations = this.getGymOrParkLocations.bind(this);
        this.getPools = this.getPools.bind(this);
        this.getParks=this.getParks.bind(this);
        this._onPress = this._onPress.bind(this);
    }   
    
   
      componentDidMount() {

         navigator.geolocation.getCurrentPosition((position) => {
            let lat = parseFloat(position.coords.latitude);
            let lon = parseFloat(position.coords.longitude);
           
            let initialRegion={
                latitude:lat,
                longitude:lon,
                latitudeDelta:LATTITUDE_DELTA,
                longitudeDelta:LONGTITUDE_DELTA
            }
            console.log('initialRegion',initialRegion)
            this.setState({lat,lat})
            this.setState({initialPosition:initialRegion})
            // this.setState({ lat:lat, lon:lon ,initialPosition:initialRegion,markerPosition:initialRegion});
            // this.setState({ initialPosition, initialRegion });
            this.setState({ markerPosition: initialRegion,isLoading:false });

        },(error)=>alert(JSON.stringify(error)),
        { enableHighAccuracy: true,  timeout: 25000, maximumAge: 3600000})
            
            this.watchID = navigator.geolocation.watchPosition((position)=>{
                
                let lat =parseFloat(position.coords.latitude);
                let lon = parseFloat(position.coords.longitude);
                let lastRegion={
                    latitude:lat,
                    longitude:lon,
                    latitudeDelta:LATTITUDE_DELTA,
                    longitudeDelta:LONGTITUDE_DELTA
                }

                this.setState({initialPosition:lastRegion});
                this.setState({markerPosition:lastRegion});
            })



        switch (this.state.type) {

            case RADIOS_TYPES.PARKS:
                this.getParks(gym_street);
                break;

            case RADIOS_TYPES.GYM:
                this.getGymOrParkLocations();
                break;

            case RADIOS_TYPES.POOLS:
                this.getPools(pools);
                break;

            case RADIOS_TYPES.STREET_GYM:
                this.getLocationsFromFiles(gym_street.features);
                break;
        }

    }

    componentWillUnmount(){
            navigator.geolocation.clearWatch(this.watchID)
    }

    async _onPress(e){
        console.log('prss')
        await this.setState({show:true})
    }
    async getParks(locations) {
        const Facilities = (props) => {
            return(
              <View>
                  {props.props.map((obj,index) =>{
                     return <Text key={index}>{obj}</Text>
                  })}
              </View>
            )
          };

        let arrayMarkers = [];
        locations.features.forEach(function(element,index){
            arrayMarkers.push(
                <MapView.Marker
                    key={index}
                    coordinate={{
                         latitude: element.geometry.coordinates[1],
                         longitude: element.geometry.coordinates[0]      
                    }}
                    onCalloutPress={this._onPress}
                >
                    <Callout style={styles.calloutParks} onPress={this._onPress}>
                        <View>

                            <Text>שם:{element.properties.name}</Text>
                            <Text>רחוב:{element.properties.street}</Text>
                            <Facilities props={element.facilities.arr}/>
                        </View>
                    </Callout>
                </MapView.Marker>
                 
                );
        }, this);   
        await this.setState({ places: arrayMarkers });
    }
    
    async getPools(locations) {
        console.log(locations)
        let arrayMarkers = [];
        locations.features.forEach(function(element,index){
            arrayMarkers.push(
                <MapView.Marker
                    key={index}
                    coordinate={{
                         latitude: element.geometry.coordinates[1],
                         longitude: element.geometry.coordinates[0] 
                    }}
                >
                <Callout style={styles.calloutParks} onPress={this._onPress}>
                        <View>

                            <Text>שם:{element.properties.name}</Text>
                            <Text>רחוב:{element.properties.street}</Text>
                            
                        </View>
                    </Callout>
                    </MapView.Marker>
                 
                );
        }, this);   
        await console.log('arrayMarkers file:',arrayMarkers)
        await this.setState({ places: arrayMarkers });

    }



    async getGymOrParkLocations() {
        try {
            let response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=31.783705,%2034.648394&radius=4000&type=${this.state.type}&key=AIzaSyB0uXi4RwJPIyzwMxFBm3PHTL3cTtyDUA4`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            });

            let res = await response.json();
            let arrayMarkers = [];
            res.results.map((element, index) => {
                console.log(element);

                arrayMarkers.push(
                    <MapView.Marker
                        key={index}
                        coordinate={{
                            latitude: element.geometry.location.lat,
                            longitude: element.geometry.location.lng
                        }}
                    >
                     <Callout>
                            <View>
                                <Text>{element.name}</Text>
                            </View>
                        </Callout>
                    </MapView.Marker>);

            });

             await this.setState({ places: arrayMarkers });
            
            await console.log('arrayMarkers gogle:',arrayMarkers[0])
        } catch (error) {
            console.log(error);
        }
    }
    // getUrlWithParamters() {
    //     const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    //     const LOCATION = `location=${this.state.lat},${this.state.lon}&radius=${this.state.radius}&types=${this.state.type}&key=${this.API_KEY}`;
    //     return `${URL}${LOCATION}`
    // }


    render() {
        return (
            <View style={styles.container}>
            {this.state.markerPosition.latitude===0?null:
                <MapView
                    provider={null}
                    style={styles.map}
                    region={{
                        latitude:31.7983,
                        longitude:34.6516,
                        latitudeDelta:0.0922,
                        longitudeDelta:0.05606756756756757
                        }}
                >
                
                    <MapView.Marker coordinate={this.state.markerPosition}>
                        <View style={styles.radius}>
                            <View style={styles.Marker}/>
                        </View>
                    </MapView.Marker>
                {this.state.places}
                </MapView>}
           
                
            </View>
        );
    }
}
                /* {this.state.places} */


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 600,
        width: 600,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    calloutParks:{
        borderRadius:20
    },
    radius:{
        height:50,
        width:50,
        borderRadius:50/2,
        overflow:'hidden',
        backgroundColor:'rgba(0,122,255,0.1)',
        borderWidth:1,
        borderColor: 'rgba(0,112,255,0.3)',
        alignItems:'center',
        justifyContent: 'center'
    },
    Marker:{
        height:20,
        width:20,
        borderWidth:3,
        borderColor: 'white',
        borderRadius:20/2,
        backgroundColor:'#007AFF'
    }
   
    
});