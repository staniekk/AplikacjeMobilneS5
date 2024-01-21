import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { styles } from "./style";
import { SettingsContext } from '../../Context/settingsContext';

// Użyj tej samej nazwy, co w definicji komponentu, zgodnie z konwencją
const HistoryS = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userID} = useContext(SettingsContext)
  //Pobieranie danych z bazy danych
  useEffect(() => {
    axios.get(`https://65a40329a54d8e805ed451eb.mockapi.io/api/am/history?userID=${userID}`)
      .then(response => {
        setHistory(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Wystąpił błąd podczas pobierania danych historii", error);
        console.error("ID" + userID);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
   
    //Wyświetla wszystkie znalezione rekordy z bazy danych
    //Dla każdego rekordu wyświetla jego dane
    <ScrollView style={styles.mainContainer}>
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Image style={styles.logo} source={require('../../img/logo/Logo.png')}/>
      {history && history.map((entry) => (
        <View key={entry.id} style={styles.historyInfo}>
          <View key={entry.id} style={styles.historyInfo2}>
          <Image style={styles.runner} source={require('../../img/logo/runner.png')}/>
          <View style={{flex: 1}}>
          <Text style={styles.historyInfoText}>
            {entry.dist} km - {entry.data} 
          </Text>
          <Text style={styles.historyInfoText2}>
            Czas: {entry.time} h - Kroki: {entry.steps}
          </Text>
        </View>
        </View>
        </View>
      ))}
      </View>
    </ScrollView>
    
  );
};
export { HistoryS }; 


