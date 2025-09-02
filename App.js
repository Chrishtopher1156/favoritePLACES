import { StatusBar } from "expo-status-bar";
import * as SplashScreen from  'expo-splash-screen';
import Navigation from "./navigation/navigation";
import { useState, useEffect } from "react";
import { init } from "./util/db";
import { ActivityIndicator, StyleSheet, View } from "react-native";


SplashScreen.preventAutoHideAsync();


function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(()=>{
    async function appLoading() {
      try {
        await init(); // initialise databae
        setDbInitialized(true);
        await SplashScreen.hideAsync(); // hide splash after db ready
      } catch (err) {
        console.log('DB init error', err);
      }
    }
    appLoading();

  },[]);

  if (!dbInitialized) {
    return(
      <View style={styles.lodaing}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Navigation />
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  lodaing: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
