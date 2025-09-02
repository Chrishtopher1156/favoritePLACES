import { useEffect, useState } from "react";
import { Alert, Image, Linking, StyleSheet, Text, View } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";

import OutlinedButton from "../UI/OutlineButton";
import { Colors } from "../../constants/Colors";
import { getAddress, getMapPreview }  from '../../util/location';
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";



const LocationPicker = ({onPickLocation}) => {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(()=>{
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat, 
        lng: route.params.pickedLng
      };
      setPickedLocation(mapPickedLocation);
    }
  },[route, isFocused]);


  useEffect(()=>{
    async function handleLocation() {   
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat, 
          pickedLocation.lng
        );
        onPickLocation({...pickedLocation, address: address})
      }
    }

    handleLocation();

  },[pickedLocation, onPickLocation]);



  async function verifyPermission() {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permission!',
        'You need to grant location permission to use this app.',
        [
          { text: 'Cancel', style: 'cancel'},
          {
            text: 'Settings',
            onPress: () => Linking.openSettings(),
          }
        ]
      );
      return false;
    }
    return true;
  }

  useEffect(()=>{
    verifyPermission();
  },[]);

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }



  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    locationPreview =  <Image 
      style={styles.image}
      source={{
        uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)
      }}
    />
  }

  return (
    <View>
      <View style={styles.mapPreview}>
          {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
        <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary200,
    borderRadius: 8,   
    overflow: 'hidden'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  }
});