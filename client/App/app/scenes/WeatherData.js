import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Button,
    Text,
    View,Image
} from 'react-native';
import {weatherConditions} from './WeatherConditions';


export const WeatherData = (weather) => {
  const data =weather.weather;
    return (
      <View style={[styles.weatherContainer,{ backgroundColor: weatherConditions[data.main].color }]}>
        <Image
          style={{width: 70, height: 70}}
          source={{uri: `http://openweathermap.org/img/w/${data.icon}.png`}}
        />
        <View style={styles.headerContainer}>
      

          <Text style={styles.tempText}>{`${data.temp}˚`}</Text>
          <Text style={styles.subtitle}>{data.name}</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherConditions[data.main].title}</Text>
          <Text style={styles.subtitle}>{weatherConditions[data.main].subtitle}</Text>
        </View>
      </View>
    );
  };


  const styles = StyleSheet.create({
    weatherContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
      
     
    },
    headerContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    tempText: {
      fontSize: 72,
      color: '#fff'
    },
    bodyContainer: {
      flex: 2,
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      paddingLeft: 25,
      marginBottom: 40
    },
    title: {
      fontSize: 60,
      color: '#fff'
    },
    subtitle: {
      fontSize: 24,
      color: '#fff'
    }
  });