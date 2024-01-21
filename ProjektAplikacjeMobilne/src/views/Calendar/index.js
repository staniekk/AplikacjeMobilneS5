import React, { useState, useEffect } from 'react';
import { ScrollView, BackHandler, Text,Image,  View, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { styles } from './style';


export function Calendar({ navigation }) {
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
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);


  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    if (markedDates[day.dateString]) {
      const savedActivity = retrieveActivityData(day.dateString);
      setActivityData(savedActivity);
    } else {
      setActivityData({
        date: day.dateString,
        activity: '',
        distance: '',
        startTime: '',
        targetTime: '',
      });
      
    }
    setShowModal(true);
  };

  // Function to save activity data and update marked dates
  const saveActivity = () => {
    setMarkedDates({
      ...markedDates,
      [selectedDate]: { marked: true, dotColor: 'red' },
    });

    saveActivityData(selectedDate, activityData);
    setShowModal(false);
  };

  const retrieveActivityData = (date) => {
    return {};
  };

  const saveActivityData = (date, data) => {
  
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#11B5E4',
      }}
    >
       <Image style={styles.logo} source={require('../../img/logo/Logo.png')}/>
      <Text style={styles.calendarTitle}>Calendar</Text>
      <View style={styles.calendarContainer}>
        <RNCalendar
          style={{ width: 300, height: 400 }}
          onDayPress={handleDayPress}
          markedDates={markedDates}
        />
      </View>

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
    </ScrollView>
  );
}
