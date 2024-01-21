import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#11B5E4',
  },

  calendarContainer: {
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#013442', 
    padding: 10,
    borderRadius: 5,
    width: '45%', 
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#aaa', 
    padding: 10,
    borderRadius: 5,
    width: '45%', 
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white', 
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16, 
    fontWeight: 'bold',
    marginBottom: 10, 
    color: '#333',
  },
  calendarTitle: {
    fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: 'white',
  },
  activitiesContainer: {
    padding: 10,
  },
  activityItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    width: '90%', 
  },

  activityDetails: {
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#007bff', 
    padding: 10,
    borderRadius: 5,
    margin: -45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 5,
  },
  noActivitiesText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#666',
    fontStyle: 'italic',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityDetails: {
    flex: 1,
  },
  activityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#8ed8f5',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  removeButton: {
    backgroundColor: '#8ed8f5', 
    padding: 5,
    borderRadius: 5,
  },
  activityItem: {
    backgroundColor: '#fff', 
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, 
  },
  activityDetails: {
    flex: 1,
  },
  addButtonContainer: {
    alignItems: 'flex-end', 
    marginRight: 35, 
    marginTop: -45,
  },
  addButton: {
    backgroundColor: '#007bff', 
    padding: 8,
    borderRadius: 15,
    width: 40, 
    height: 40, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  space: {
    fontSize: 10,

  },
  
});
