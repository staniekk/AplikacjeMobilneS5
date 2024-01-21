import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Modal, TextInput, TouchableOpacity, FlatList, BackHandler, StyleSheet } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import axios from 'axios';
import { styles } from './style';
import { SettingsContext, useSettings } from "../../Context/settingsContext";

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
  const [activitiesList, setActivitiesList] = useState([]);
  const {userID} = useContext(SettingsContext);

  useEffect(() => {
    fetchAllActivities();

    const backAction = () => true;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

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
        setMarkedDates(newMarkedDates);
      })
      .catch(error => {
        console.error('Error fetching all activities:', error);
      });
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    retrieveActivityData(day.dateString);
  };

  const handleAddActivity = () => {
    setShowModal(true);
    setActivityData({
      date: selectedDate,
      activity: '',
      distance: '',
      startTime: '',
      targetTime: '',
    });
  };

  const saveActivity = () => {
    const dataToSend = {
      userID: userID,
      date: selectedDate,
      activity: activityData.activity,
      distance: activityData.distance,
      startTime: activityData.startTime,
      targetTime: activityData.targetTime
    };

    axios.post('https://65ad4130adbd5aa31be071b7.mockapi.io/api/am/activities', dataToSend)
      .then(response => {
        console.log('Activity saved successfully:', response.data);
        setMarkedDates({
          ...markedDates,
          [selectedDate]: { marked: true, dotColor: 'red' },
        });
        fetchAllActivities(); // Refresh the marked dates and activities list
      })
      .catch(error => {
        console.error('Error saving activity:', error);
      });

    setShowModal(false);
  };

  const retrieveActivityData = (date) => {
    axios.get(`https://65ad4130adbd5aa31be071b7.mockapi.io/api/am/activities?date=${date}&userID=${userID}`)
      .then(response => {
        setActivitiesList(response.data);
      })
      .catch(error => {
        console.log('No activities for given day', error);
        setActivitiesList([]); // Clear list if no activities are found or in case of error
      });
  };

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <Text style={styles.activityText}>Date: {item.date}</Text>
      <Text style={styles.activityText}>Activity: {item.activity}</Text>
      <Text style={styles.activityText}>Distance: {item.distance}</Text>
      <Text style={styles.activityText}>Start Time: {item.startTime}</Text>
      <Text style={styles.activityText}>Target Pace: {item.targetTime}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.calendarTitle}>Calendar</Text>
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
            <Text style={styles.addButtonText}>Add Activity</Text>
          </TouchableOpacity>
        </View>
      )}

      {activitiesList.length > 0 ? (
        <FlatList
          data={activitiesList}
          renderItem={renderActivityItem}
          keyExtractor={item => item.id.toString()}
          style={styles.activitiesContainer}
        />
      ) : selectedDate && (
        <Text style={styles.noActivitiesText}>No activities planned for this day</Text>
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
