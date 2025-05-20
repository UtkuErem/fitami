import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MoodTracker = () => {
  return (
    <View style={styles.mentalHealthContainer}>
      <View style={styles.moodCircle}>
        <Text style={styles.moodText}>😊</Text>
      </View>
      <Text style={styles.moodTitle}>Feeling Great</Text>
      <View style={styles.moodOptions}>
        <View style={styles.moodOption}><Text>😊</Text></View>
        <View style={styles.moodOption}><Text>😐</Text></View>
        <View style={styles.moodOption}><Text>😔</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mentalHealthContainer: {
    alignItems: 'center',
  },
  moodCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  moodText: {
    fontSize: 40,
  },
  moodTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  moodOptions: {
    flexDirection: 'row',
    marginTop: 20,
  },
  moodOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default MoodTracker;
