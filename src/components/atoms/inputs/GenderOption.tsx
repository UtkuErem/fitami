import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface GenderOptionProps {
  label: string;
  icon: string; // emoji or icon name
  selected: boolean;
  onPress: () => void;
  accentColor: string;
}

const GenderOption: React.FC<GenderOptionProps> = ({ label, icon, selected, onPress, accentColor }) => {
  return (
    <TouchableOpacity
      style={[styles.option, selected && { borderColor: accentColor, backgroundColor: accentColor + '22', shadowColor: accentColor }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconContainer}>
        <Text style={[styles.icon, selected && { color: accentColor }]}>{icon}</Text>
      </View>
      <Text style={[styles.label, selected && { color: accentColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 4,
  },
  icon: {
    fontSize: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
});

export default GenderOption;

