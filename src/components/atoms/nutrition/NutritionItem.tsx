import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { atoms } from '../../../theme';

interface NutritionItemProps {
  iconName: string;
  value: number | string;
  unit?: string;
  color?: string;
}

/**
 * A component to display a nutrition value with an icon
 */
const NutritionItem: React.FC<NutritionItemProps> = ({
  iconName,
  value,
  unit = 'g',
  color = atoms.colors.text.secondary,
}) => {
  return (
    <View style={styles.nutritionItem}>
      <Icon
        name={iconName}
        size={16}
        color={color}
        style={styles.nutritionIcon}
      />
      <Text style={[styles.nutritionText, { color }]}>
        {value}{unit !== 'none' ? unit : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nutritionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: atoms.spacing.spacing.xs,
    marginBottom: atoms.spacing.spacing.xxs,
  },
  nutritionIcon: {
    marginRight: atoms.spacing.spacing.xxs,
  },
  nutritionText: {
    ...atoms.typography.variant.body2,
  },
});

export default NutritionItem;
