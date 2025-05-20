import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const CalorieTracker = () => {
  return (
    <View style={styles.calorieTracker}>
      <Text style={styles.calorieTitle}>Calorie Tracker</Text>
      <View style={styles.calorieBar}>
        <View style={styles.calorieProgress} />
      </View>
      <Text style={styles.calorieText}>1200 / 2000 kcal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  calorieTracker: {
    width: 220,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  calorieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  calorieBar: {
    width: '100%',
    height: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  calorieProgress: {
    width: '60%',
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  calorieText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default CalorieTracker;
