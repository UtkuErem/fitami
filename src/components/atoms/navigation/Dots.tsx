import React from 'react';
import { View } from 'react-native';

const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? '#4CAF50' : '#E0E0E0';
  return (
    <View
      style={{
        width: selected ? 20 : 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
        backgroundColor,
        transition: 'all 0.3s ease',
      }}
    />
  );
};

export default Dots;
