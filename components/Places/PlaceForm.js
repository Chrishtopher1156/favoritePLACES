import { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText)
  }

  return (
    <ScrollView style={styles.rootForm}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput 
          onChangeText={changeTitleHandler}
          style={styles.input}
          value={enteredTitle}
        />
      </View>
    </ScrollView>
  );
   
};

export default PlaceForm;

const styles = StyleSheet.create({
  rootForm: {
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  }
})