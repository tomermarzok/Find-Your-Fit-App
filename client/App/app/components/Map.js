import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geojson from 'react-native-geojson';

// const geo = require('../asset/points')
// gan yavne location = 31.782676, 34.702986
// google plcae api =https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=AIzaSyB0uXi4RwJPIyzwMxFBm3PHTL3cTtyDUA4
import items from '../asset/points'
  export default class Map extends Component{


      render(){

          return(
          <View style ={styles.container}>
            <MapView style={styles.map}
            initialRegion={{
              latitude: 31.798875,
              longitude: 34.651587,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
           

          {<Geojson geojson={items} />}
          
          </MapView>
          </View>
          );
      }
  }

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });


