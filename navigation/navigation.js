import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllPlaces from '../screens/AllPlaces';
import AddPlace from '../screens/AddPlace';

import { Colors } from '../constants/Colors';
import Map from '../screens/Map';
import PlaceDetails from '../screens/PlaceDetails';

const BottomTab = createBottomTabNavigator();

function MyStack() {

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary700 },
          tabBarStyle: { backgroundColor: Colors.primary500},
          tabBarActiveTintColor: Colors.accent500,
          tabBarInactiveTintColor: Colors.primary200,
          headerTintColor: Colors.primary100,
        }}
      >
      <BottomTab.Screen    
        name="AllPlaces" 
        component={AllPlaces}
        options={{
          title: "All Placess"
        }}
      />
      <BottomTab.Screen name="AddPlace" component={AddPlace}  />
      <BottomTab.Screen name='Map' component={Map}/>
      <BottomTab.Screen name='PlaceDetails' component={PlaceDetails} options={{
        title: 'Loading Place...'
      }}/>
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;