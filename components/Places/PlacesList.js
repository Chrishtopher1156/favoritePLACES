import { FlatList, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import PlaceItem from '../Places/PlaceItem';
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }) => {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate('PlaceDetails', {
      placeId: id,
    })
  }


  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText} >No Places added yet - start adding some!</Text>
      </View>
    )
  }
  return (
    <FlatList 
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler}/>
      )}
      style={styles.list}
    />   
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 12,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary800,
  }
})