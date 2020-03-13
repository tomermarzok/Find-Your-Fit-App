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
    // this.setState({ markerPosition, initialRegion });

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

    android:value="AIzaSyBVcf_nSp8ZEiHA2am8E1bsR0KpnTubXuo"/>
    signingConfig signingConfigs.release