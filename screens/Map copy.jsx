import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map () {
const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  function selectLocationHandler(e) {
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng});
  }

  return (
    <SafeAreaView style={styles.areaView}>
      <View style={styles.container}>
        <MapView style={styles.mapView} initialRegion={region} onPress={selectLocationHandler}>
          {selectedLocation && (
            <Marker 
              coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng}} 
              title="Picked Location"
            />
          )}
        </MapView>
      </View>
    </SafeAreaView>
  )
}

export default Map;
  
const styles = StyleSheet.create({
  areaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  //   width: '100%',
  //   height: '100%',
  },
  mapView: {
    flex: 1,
  }
})