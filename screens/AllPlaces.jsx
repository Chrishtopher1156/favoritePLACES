import { View, Text, StyleSheet } from "react-native";
import PlacesList from "../components/Places/PlacesList";


function AllPlaces() {
  return(
    <View style={styles.rootContainer}>
      <PlacesList places={[]}/>
    </View>
  );
}

export default AllPlaces;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  }
})