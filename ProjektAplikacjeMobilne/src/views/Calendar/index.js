import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Modal, TextInput, TouchableOpacity, FlatList, BackHandler, StyleSheet } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import axios from 'axios';
import { styles } from './style';
import { SettingsContext, useSettings } from "../../Context/settingsContext";


export function Calendar({ navigation }) {
  // usestaty dla uzytecznosci kalendarza
  const [selectedDate, setSelectedDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activityData, setActivityData] = useState({
    date: '',
    activity: '',
    distance: '',
    startTime: '',
    targetTime: '',
  });
  const [markedDates, setMarkedDates] = useState({});
  const [activitiesList, setActivitiesList] = useState([]);
  const {userID} = useContext(SettingsContext);


  // wstepne wczytywanie danych aby zaznaczyc kropki na kalendarzu
  // obsluga powrotu
  useEffect(() => {
    fetchAllActivities();
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  // pobiera wszystkie zaplanowane aktywnosci uzytkownika o danym ID
  const fetchAllActivities = () => {
    axios.get(`https://65ad4130adbd5aa31be071b7.mockapi.io/api/am/activities?userID=${userID}`)
      .then(response => {
        const activities = response.data;
        const newMarkedDates = {};
        activities.forEach(activity => {
          if (activity.date) {
            newMarkedDates[activity.date] = { marked: true, dotColor: 'red' };
          }
        });
        setMarkedDates(newMarkedDates); // dodanie markera=kropki przy datach z aktywnosciami
      })
  };

  // ustawia date na wybrany na kalendarzu dzien i aktualizuje liste aktywnosci dnia
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    retrieveActivityData(day.dateString);
  };

  // obsluga dodania aktywnosci, otwiera okno modalne ktore przyjmuje odpowiednie dane
  const handleAddActivity = () => {
    setShowModal(true); // ustawia pokazanie okna modalnego na true
    setActivityData({
      id: null, 
      date: selectedDate,
      activity: '',
      distance: '',
      startTime: '',
      targetTime: '',
    });
  };

  // zapisz aktywnosc na serwer
  const saveActivity = () => {
    // dane do wyslania
    const dataToSend = {
      userID: userID,
      date: activityData.date,
      activity: activityData.activity,
      distance: activityData.distance,
      startTime: activityData.startTime,
      targetTime: activityData.targetTime
    };
  
    let request;
    if (activityData.id) {
      // jesli dane id juz na serwerze to nadpisz dane
      request = axios.put(`https://65ad4130adbd5aa31be071b7.mockapi.io/api/am/activities/${activityData.id}`, dataToSend);
    } else {
      // jelsli nie ma takiego id, to dodaj aktywnosc
      request = axios.post('https://65ad4130adbd5aa31be071b7.mockapi.io/api/am/activities', dataToSend);
    }
    request.then(response => {
      setShowModal(false); // zamknij okno modalne po dodaniu aktywnosci
      fetchAllActivities(); // pobierz liste aktywnosci
    }).catch(error => {
      console.error('Error saving activity:', error);
    });
    refreshActivities(); // odswiez liste aktywnosci
  };

  // pobieranie danych usera o danym ID
  const retrieveActivityData = (date) => {
    axios.get(`https://65ad4130adbd5aa31be071b7.mockapi.io/api/am/activities?date=${date}&userID=${userID}`)
      .then(response => {
        setActivitiesList(response.data); // wypelnij liste aktywnosci
      })
      .catch(error => {
        console.log('No activities for given day');
        setActivitiesList([]); // wyczysc liste jesli nie ma danych
      });
  };


  const refreshActivities = async () => {
    try {
        fetchAllActivities(); // pobierz wszystkie aktywnosci danego uzytkownika
        retrieveActivityData(selectedDate); // pobierz pobierz wszystkie aktywnosci danego uzytkownika DLA DANEGO DNIA
    } catch (error) {
        console.log("no activities fetched"); // wiadomosc o braku aktywnosci (debug)
    }
};

  // usuwanie aktywnosci z listy i serwera
  const removeActivity = (activityId) => {
    axios.delete(`https://65ad4130adbd5aa31be071b7.mockapi.io/api/am/activities/${activityId}`)
      .then(response => {
        refreshActivities(); // odswiez liste aktywnosci dnia
      })
      .catch(error => {
        console.error('Error removing activity:', error); // blad usuwania aktywnosci
      });
  };

  // edituj zaplanowana aktywnosc
  const editActivity = (activity) => {
    setActivityData(activity); // wczytaj dane do edycji
    setShowModal(true); // pokaz okno modalne
    refreshActivities(); // odswiez liste
  };

  // odsswiez po zapisaniu
  const onActivitySaved = () => {
    refreshActivities();
  };


  // renderowanie boxow z informacjami o aktywnosci oraz przyciskow edit remove
  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityDetails}>
        <Text style={styles.activityText}>Date: {item.date}</Text>
        <Text style={styles.activityText}>Activity: {item.activity}</Text>
        <Text style={styles.activityText}>Distance: {item.distance}</Text>
        <Text style={styles.activityText}>Start Time: {item.startTime}</Text>
        <Text style={styles.activityText}>Target Pace: {item.targetTime}</Text>
      </View>
      <View style={styles.activityButtons}>
        <TouchableOpacity style={styles.editButton} onPress={() => editActivity(item)}>
          <Text>Edit</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeActivity(item.id)}>
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  // renderuje caly kalendarz, pokazuje przycisk dodania activity, pokazuje liste activities
  return (
    <View style={styles.mainContainer}>
    <Text style={styles.calendarTitle}> </Text>
    <View style={styles.calendarContainer}>
      <RNCalendar
        style={{ width: 300, height: 400 }}
        onDayPress={handleDayPress}
        markedDates={markedDates}
      />
    </View>

    {selectedDate && (
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddActivity}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    )}
    <Text style={styles.space}> </Text>

      {activitiesList.length > 0 ? (
        <FlatList
          data={activitiesList}
          renderItem={renderActivityItem}
          keyExtractor={item => item.id.toString()}
          style={styles.activitiesContainer}
        />
      ) : selectedDate && (
        <Text style={styles.noActivitiesText}>
          No activities planned for this day: {"\n"}{selectedDate}
        </Text>
      )}

      <Modal
        visible={showModal}
        transparent={true}
        animationType='slide'
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Plan Activity</Text>
            <Text style={styles.dateText}>Date: {selectedDate}</Text>
            <TextInput
              style={styles.input}
              placeholder='Activity'
              onChangeText={(text) => setActivityData({ ...activityData, activity: text })}
              value={activityData.activity}
            />
            <TextInput
              style={styles.input}
              placeholder='Distance (km)'
              onChangeText={(text) => setActivityData({ ...activityData, distance: text })}
              value={activityData.distance}
            />
            <TextInput
              style={styles.input}
              placeholder='Start Time'
              onChangeText={(text) => setActivityData({ ...activityData, startTime: text })}
              value={activityData.startTime}
            />
            <TextInput
              style={styles.input}
              placeholder='Target Pace (min/km)'
              onChangeText={(text) => setActivityData({ ...activityData, targetTime: text })}
              value={activityData.targetTime}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveActivity}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
