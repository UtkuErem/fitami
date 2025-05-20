import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const NextButton = ({ ...props }) => (
  <TouchableOpacity
    style={styles.nextButton}
    {...props}
  >
    <Text style={styles.nextButtonText}>Next</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  nextButton: {
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 20,
    backgroundColor: '#4CAF50',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NextButton;
