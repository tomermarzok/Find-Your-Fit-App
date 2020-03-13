
import { Left,Icon,Container, Header } from 'native-base';
import FontAwesome from 'react-native-vector-icons/Feather';

const MyHeader=(props)=>(
    <Container>
    <Header>
    <Left>
        <Icon name="menu" onPress={()=>this.props.navigation.navigate('DrawerOpen')}/>
    </Left>
  
    
</Header> 
</Container>
);

export default MyHeader;