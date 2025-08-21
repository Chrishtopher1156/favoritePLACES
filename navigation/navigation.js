import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import IconButton from "../components/UI/IconButton";
import AddPlace from "../screens/AddPlace";
import AllPlaces from "../screens/AllPlaces";

import { Colors } from  '../constants/Colors';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500},
            headerTintColor: Colors.primary100,
            headerShown: true,
            contentStyle: { backgroundColor: Colors.gray700}
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="plus"
                  color={tintColor}
                  size={20}
                  marginLeft={12}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />

          <Stack.Screen 
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add New Place'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default Navigation;