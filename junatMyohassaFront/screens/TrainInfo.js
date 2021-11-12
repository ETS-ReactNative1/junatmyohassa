import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Button } from "react-native";
import { styles } from "../styles/Styles";
import Map from "../components/Map";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton, Colors } from 'react-native-paper';


export default function TrainInfo({ route }) {
  const { ID, trainNr, title } = route.params;

  //Funktio, jonka kutsuu nappula, joka lisää train numberin async storageen
 // Tämän voi toteuttaa samanlailla kuin EditUserInfo.js tehdään aseman kohdalla
 const storeData = async () => {
   let value = trainNr.toString();

  try {
    await AsyncStorage.setItem('train', value)
    const kikkeli = await AsyncStorage.getItem('train');
    console.log(kikkeli);
  } catch (e) {
    console.log(e);
    // saving error
  }
}

  return (
    <View>
      {/* Tähän nappula josta painamalla käyttäjä valitsee junan suosikkeihin */}
  
      <IconButton
        icon="heart"
        color={Colors.red500}
        size={24}
        onPress={storeData}
      /><Text>Lisää juna suosikkeihin</Text>
      <View>
        <Text>{ID}</Text>
        <Text>{trainNr}</Text>
        <Text>{title.timeTableRows[0].differenceInMinutes}</Text>
        <Text>{title.timeTableRows[0].scheduledTime.slice(11, 16)}</Text>
      </View>
      <Map data={title} />
    </View>
  );
}
