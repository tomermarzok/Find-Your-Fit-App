/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flowx
 */
// debug - 

//Api_google_maps : AIzaSyAm4pWOwM3RCPTtEKTIkxrEe4qOQdvVu_M'
//rrr@gmail.com:123







// import React from "react";
// import { createRootNavigator } from "./router";
// import { isSignedIn } from "./auth";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       signedIn: false,
//       checkedSignIn: false
//     };
//   }

//   componentDidMount() {
//     isSignedIn()
//       .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
//       .catch(err => alert("An error occurred"));
//   }

//   render() {
//     const { checkedSignIn, signedIn } = this.state;

//     // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
//     if (!checkedSignIn) {
//       return null;
//     }

//     const Layout = createRootNavigator(signedIn);
//     return <Layout />;
//   }
// }



import React, { Component } from 'react';
import { StackNavigator,DrawerNavigator,DrawerItems } from 'react-navigation';
import {
  Text,
  View,
  Image,
  AppRegistry
} from 'react-native';
import { Container, Header, Content,Body, Title, Button } from 'native-base';

import ViewContainer from './components/ViewContainer'
import Login from './scenes/Authentication/Login'
import Register from './scenes/Authentication/Register'
import FirstScreen from './scenes/FirstScreen'
import Home from './scenes/Home'
import Root from './components/Root'
import Map from './components/Map'
import UserProfile from './components/UserProfile'
import SearchFacilities from './scenes/search/searchFacilities'
import UserType from './scenes/UserType'
import CoachRegister from './scenes/Authentication/CoachRegister'
import TraineerRegister from './scenes/Authentication/TraineerRegister'
import SearchCoachs from './scenes/search/searchCoachs'
import CoachsCard from './components/CoachsCard'
import CoachsResult from './scenes/search/CoachsResult'
import ResultOnMap from './scenes/search/ResultOnMap'
import AddSportTeam from './scenes/AddSportTeam'
import Weather from './scenes/Weather'
import SearchSportTeam from './scenes/search/searchSportTeam'


type Props = {};
console.disableYellowBox = true;


const CustomDrawerContent =(props)=>(
  <Container style={{backgroundColor:'white'}}>
    <Header style={{height:200,width:200}}>
      <Body>
        <Image source={require('./asset/logo.png')}/>
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props}/>
      </Content>
  </Container>
);

const AppNavigator = DrawerNavigator({
  Home:{screen:Home},
  AddSportTeam:{screen:AddSportTeam},
  FirstScreen:{screen:FirstScreen},
  SearchFacilities:{screen:SearchFacilities},  
  UserProfile:{screen:UserProfile},  
  Login:{screen:Login},
  Root:{screen:Root},
  Register:{screen:Register},
  CoachsCard:{screen:CoachsCard},
  Map:{screen:Map},
  Weather:{screen:Weather},
  SearchSportTeam:{screen:SearchSportTeam},  
  
  CoachRegister:{screen:CoachRegister},
  TraineerRegister:{screen:TraineerRegister},
  UserType:{screen:UserType},
  SearchCoachs:{screen:SearchCoachs},
  CoachsResult:{screen:CoachsResult},
  ResultOnMap:{screen:ResultOnMap}
},
  {
    initalRouteName:'Hone',
    contentComponent:CustomDrawerContent,
    drawerOpenRoute:"DrawerOpen",
    drawerCloseRoute:"DrawerClose",
    drawerToggleRoute:"DrawerToggel"

},
  {
    initalRouteName:'Hone',
    drawerPosition:'left',
    contentComponent:CustomDrawerContent,
    drawerOpenRoute:"DrawerOpen",
    drawerCloseRoute:"DrawerClose",
    drawerToggleRoute:"DrawerToggel"


  }
);


// const AppNavigator = DrawerNavigator({
//   Home:{screen:Home},
//   AddSportTeam:{screen:AddSportTeam},
//   FirstScreen:{screen:FirstScreen},
//   SearchFacilities:{screen:SearchFacilities},  
//   UserProfile:{screen:UserProfile},  
//   Login:{screen:Login},
//   Root:{screen:Root},
//   Register:{screen:Register},
//   CoachsCard:{screen:CoachsCard},
//   Map:{screen:Map},
//   Weather:{screen:Weather},
  
//   CoachRegister:{screen:CoachRegister},
//   TraineerRegister:{screen:TraineerRegister},
//   UserType:{screen:UserType},
//   SearchCoachs:{screen:SearchCoachs},
//   CoachsResult:{screen:CoachsResult},
//   ResultOnMap:{screen:ResultOnMap}
// },
//   {
//     initalRouteName:'Hone',
//     contentComponent:CustomDrawerContent,
//     drawerOpenRoute:"DrawerOpen",
//     drawerCloseRoute:"DrawerClose",
//     drawerToggleRoute:"DrawerToggel"


//   }
// );

export default class App extends Component<Props> {



  render() {
     
      return(
         <AppNavigator/>
    );

  }
}

AppRegistry.registerComponent('App',()=>AppNavigator);