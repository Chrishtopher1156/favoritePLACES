import { useState } from "react";
import { View, Alert, Image, Text, StyleSheet, Linking } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { Colors } from '../../constants/Colors';
import OutlinedButton from "../UI/OutlineButton";

function ImagePicker({onTakeImage}) {
  const [pickedImage, setPickedImage] = useState(null);
  const [cameraPermissionInformation, requestPermission] =useCameraPermissions();


  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    } 

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permisions to use this app.', 
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings', 
            onPress:()=> Linking.openSettings(),
          }
        ]
      );
      return false;
    }

    return true;
  }

  //////////////////////////////////////
  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
      quality: 0.5,
    });
    
    if (!image.canceled && image.assets?.length > 0) {
      const imageUri = image.assets[0].uri;
      setPickedImage(imageUri);
      onTakeImage(imageUri);
    }

  }

  ///////////////////////////////////////// 


  let imagePreview = <Text style={styles.fallbackText}>No Image taken yet.</Text>
  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }}  style={styles.image}/>
  }
  return(
    <View>
      <View style={styles.imagePreview} >
        { imagePreview }
      </View>
      <OutlinedButton icon='camera' onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  )
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary200,
    borderRadius: 8, 
    overflow: 'hidden',   
  },
  image: {
    width: '100%',
    height: "100%"
  }, 
  fallbackText: {
    fontSize: 12,
    color: 'black',
  }
})