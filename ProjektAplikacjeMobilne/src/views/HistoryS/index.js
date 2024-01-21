import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { styles } from "./style";
import { SettingsContext } from '../../Context/settingsContext';

// Użyj tej samej nazwy, co w definicji komponentu, zgodnie z konwencją
const HistoryS = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasHistory, setHasHistory] = useState(false);
  const {userID} = useContext(SettingsContext)

  //Pobieranie danych z bazy danych
  useEffect(() => {
    try{
    axios.get(`https://65a40329a54d8e805ed451eb.mockapi.io/api/am/history?userID=${userID}`)
    .then(response => {
      setHasHistory(true);
      setHistory(response.data);
      setLoading(false);
    })
    .catch(error => {
      setHasHistory(false);
      console.log("Baza danych historii jest pusta ", error);
      setLoading(false);
    });}
    catch(error){
      console.log('Error', error);
      setHasHistory(false);
    }
    
  }, []);


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  const content = hasHistory ? (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Image style={styles.logo} source={require('../../img/logo/Logo.png')}/>
   {history.map((entry) => (
       <View key={entry.id} style={styles.historyInfo}>
           <View key={entry.id} style={styles.historyInfo2}>
           <Image style={styles.runner} source={require('../../img/logo/runner.png')}/>
           <View style={{flex: 1}}>
           <Text style={styles.historyInfoText}>
             {entry.dist} km - {entry.date} 
           </Text>
           <Text style={styles.historyInfoText2}>
             Czas: {entry.time} h - Kroki: {entry.steps}
           </Text>
           </View>
       </View>
     </View>
   ))}
   </View>

  ) : 
  (
    
    <View style ={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
  <View  style={styles.historyInfo}>
           <View  style={styles.historyInfo2}>
           <Text>
          You have no history
        </Text>
    
    </View>
    </View>
    </View>
  );

  return (
    <ScrollView style={styles.mainContainer}>
    
      {content}

    

    </ScrollView>
  );
};
export { HistoryS }; 


