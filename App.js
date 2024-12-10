import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Animated,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Material from "react-native-vector-icons/MaterialCommunityIcons";

export default function App() {
  const [reloadAnimation, setReloadAnimation] = useState();
  const animation = useRef(new Animated.Value(0)).current;

  const handleAnimated = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: false,
    }).start();
  };

  const animatedProgress = {
    width: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp",
    }),
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(247,247, 247,1)", "rgba(1,175,103,1)"],
      extrapolate: "clamp",
    }),
  };
  const animatedTitle = {
    color: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(1,175,103,0.7)", "rgba(255,255,255,1) "],
      extrapolate: "clamp",
    }),
  };
  const animatedIcon = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0.9, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        }),
      },
    ],
  };
  useEffect(() => {
    handleAnimated();
  }, [reloadAnimation]);

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#F29F58" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Toca el botón para ver la animación.</Text>
        <View style={styles.buttonContainer}>
          <Animated.View style={[styles.progress, animatedProgress]} />
          <View style={styles.content}>
            <Animated.Text style={[styles.text, animatedTitle]}>
              Pago exitoso
            </Animated.Text>
            <Animated.View style={[styles.icon, animatedIcon]}>
              <Material name={"check-bold"} size={16} color={"#fff"} />
            </Animated.View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.reloadAnimation}
          onPress={() => {
            setReloadAnimation((prev) => !prev);
          }}
        >
          <Text style={styles.reloadAnimationText}>Recargar animación</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>@Diegoberrio1601</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1833",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 22,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    height: 50,
    alignSelf: "stretch",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "baseline",
    backgroundColor: "rgba(1, 175, 103, 0.1)",
    borderWidth: 0.5,
    borderColor: "#dadada",
    overflow: "hidden",
  },
  progress: {
    flex: 1,
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 15,
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 50,
  },
  reloadAnimation: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#F29F58",
  },
  reloadAnimationText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
