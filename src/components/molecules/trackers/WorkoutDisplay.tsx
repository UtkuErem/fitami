import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const WorkoutDisplay = () => {
  return (
    <View style={styles.workoutContainer}>
      <View style={styles.workoutCircle}>
        <Text style={styles.workoutText}>30</Text>
        <Text style={styles.workoutUnit}>min</Text>
      </View>
      <Text style={styles.workoutTitle}>Daily Workout</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  workoutContainer: {
    alignItems: 'center',
  },
  workoutCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  workoutText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  workoutUnit: {
    fontSize: 16,
    color: 'white',
  },
  workoutTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default WorkoutDisplay;
