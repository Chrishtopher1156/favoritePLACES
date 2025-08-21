import { Pressable, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const IconButton = ({ icon, color, size, onPress, margin }) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <FontAwesome6 name={icon} color={color} size={size} marginLeft={margin} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
