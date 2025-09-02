import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/db";


function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();


  useEffect(()=>{
    async function loadPlaces() {
      const places = await fetchPlaces();

      setLoadedPlaces(places);
    }
    
    if (isFocused) {
      loadPlaces();
    }
  },[isFocused]);

  return(
    <View style={styles.rootContainer}>
      <PlacesList places={loadedPlaces}/>
    </View>
  );
}

export default AllPlaces;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  }
})