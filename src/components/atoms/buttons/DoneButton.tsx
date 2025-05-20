import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const DoneButton = ({ ...props }) => (
  <TouchableOpacity
    style={styles.doneButton}
    {...props}
  >
    <Text style={styles.doneButtonText}>Get Started</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  doneButton: {
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 20,
    backgroundColor: '#4CAF50',
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DoneButton;
