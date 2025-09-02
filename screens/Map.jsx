import React, { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";

export default function Map({navigation,route}) {
   const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  } ;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

 
  // Initial map region
  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78825,
    longitude: initialLocation ? initialLocation.lng : -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Handler for tapping on the map
  const selectLocationHandler = (event) => {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  };

 const savePickedLocationHandler = useCallback(() =>{
    if(!selectedLocation) {
      Alert.alert(
        'No location picked',
        'You have to pick a location (by tapping on the map) first!',
      );

      return;
    }
    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.latitude,
      pickedLng: selectedLocation.longitude,
    });
  },[navigation, selectedLocation])


  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor}) =>(
        <IconButton 
          icon="save" 
          size={24} 
          color={tintColor} 
          onPress={savePickedLocationHandler}
        />
      )
    })
  },[navigation, savePickedLocationHandler, initialLocation])

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
            title="Picked Location"
          />
        )}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full screen
  },
  map: {
    flex: 1, // Fill the SafeAreaView
  },
});
