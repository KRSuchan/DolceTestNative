import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import flood from "./assets/floodInKIT.png";
import { useEffect, useState } from "react";

export default function App() {
  const [menu, setMenu] = useState("Loading...");
  var day = new Date();
  var rstrTime = "";
  const WEEKDAY = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  let week = WEEKDAY[day.getDay()];
  let hours = day.getHours();
  if (hours > 14) {
    rstrTime = "석식";
  } else {
    rstrTime = "중식";
  }
  const getMenu = async () => {
    const response = await fetch(
      `https://nwitter-52f77-default-rtdb.firebaseio.com/prof_menu/${week}/${rstrTime}.json`
    );
    const json = await response.json();
    setMenu(json);
  };

  useEffect(() => {
    getMenu();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          ...styles.univMark,
          borderWidth: 10,
          borderColor: "#30960096",
          borderRadius: 10,
          margin: 50,
        }}>
        <Image source={flood} style={styles.mainImg} />
      </View>
      <View
        style={{
          ...styles.menuComponent,
          borderWidth: 10,
          borderColor: "#30969696",
          borderRadius: 10,
          margin: 50,
        }}>
        <Text
          style={{
            fontSize: 30,
            margin: 10,
          }}>
          {rstrTime}
        </Text>
        <Text
          style={{
            margin: 0,
          }}>
          {menu}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  univMark: {
    flex: 0.5,
    backgroundColor: "#30960099",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 90,
  },
  menuComponent: {
    flex: 0.4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 90,
  },
  menuInsider: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 90,
  },
  mainImg: {
    width: "100%",
    height: "100%",
  },
});
