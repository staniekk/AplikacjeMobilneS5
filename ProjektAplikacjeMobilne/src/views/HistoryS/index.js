import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { styles } from "./style";

// Użyj tej samej nazwy, co w definicji komponentu, zgodnie z konwencją
const HistoryS = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://65a40329a54d8e805ed451eb.mockapi.io/api/am/history')
      .then(response => {
        setHistory(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Wystąpił błąd podczas pobierania danych historii", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
   
    <ScrollView style={styles.mainContainer}>
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {history.map((entry) => (
        <View key={entry.id} style={styles.historyInfo}>
          <Text style={styles.historyInfoText}>
            Dystans: {entry.dist} km - Prędkość: {entry.speed} km/h
          </Text>
          <Text style={styles.historyInfoText2}>
            Czas: {entry.time} h - Kroki: {entry.steps}
          </Text>
        </View>
      ))}
      </View>
    </ScrollView>
    
  );
};
export { HistoryS }; 


