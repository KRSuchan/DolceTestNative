import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  // 변하는 값 useState
  const [menu, setMenu] = useState("Loading...");
  const [bus, setBus] = useState("Loading...");
  let day = new Date();
  let rstrTime = "";
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
  // 시간이 14시 이후 이면 석식이 출력
  if (hours > 14) {
    rstrTime = "석식";
  } else {
    rstrTime = "중식";
  }
  const getInform = async () => {
    // firebase로 부터 요일, 중식 혹은 석식에 따라 json fetch
    let response = await fetch(
      `https://nwitter-52f77-default-rtdb.firebaseio.com/prof_menu/${week}/${rstrTime}.json`
    );
    let json = await response.json();
    setMenu(json);

    // firebase로 부터 금오공대로 오는 버스번호와 버스별 남은 정류장 json fetch
    response = await fetch(
      `https://nwitter-52f77-default-rtdb.firebaseio.com/busToKIT/bus.json`
    );
    json = await response.json();
    let buses =
      "금오공대로 오는 중인 버스들\n\n" +
      "버스번호" +
      "\t\t\t\t\t\t\t\t" +
      "남은 정류장 수\n";
    for (let index = 0; index < json.length; index++) {
      buses +=
        "\n" +
        json[index].routeno +
        "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
        json[index].arrprevstationcnt +
        "\n";
    }
    setBus(buses);
  };
  // 1초마다 업데이트
  useEffect(() => {
    let timer = setInterval(() => {
      getInform();
    }, 1000);
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
        <Text
          style={{
            textAlign: "center",
          }}>
          {bus}
        </Text>
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
    backgroundColor: "white",
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
