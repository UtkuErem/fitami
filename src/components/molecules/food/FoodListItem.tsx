import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NutritionItem } from '../../../components/atoms';
import { calculateCalories } from '../../../utils';
import { atoms } from '../../../theme';

interface FoodItemProps {
  item: {
    key: string;
    name: string;
    icon?: string;
    protein: number;
    carbohydrate: number;
    fat: number;
  };
  onSelect?: (item: any) => void;
}

/**
 * A component to display a food item with its nutritional information
 */
const FoodListItem: React.FC<FoodItemProps> = ({ item, onSelect }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;

  const handlePress = () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={handlePress}
      disabled={!onSelect}
    >
      <View style={styles.foodHeader}>
        {item.icon && (
          <Icon
            name={item.icon}
            size={24}
            color={atoms.colors.primary.main}
            style={styles.foodIcon}
          />
        )}
        <Text style={styles.foodName}>{item.name}</Text>
      </View>

      <View style={isSmallScreen ? styles.nutritionInfoColumn : styles.nutritionInfo}>
        <NutritionItem
          iconName="fire"
          value={calculateCalories(item.protein, item.carbohydrate, item.fat)}
          unit="none"
        />

        <NutritionItem
          iconName="arm-flex"
          value={item.protein}
        />

        <NutritionItem
          iconName="bread-slice"
          value={item.carbohydrate}
        />

        <NutritionItem
          iconName="oil"
          value={item.fat}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    backgroundColor: atoms.colors.background.default,
    borderRadius: atoms.spacing.borderRadius.md,
    padding: atoms.spacing.spacing.md,
    marginBottom: atoms.spacing.spacing.sm,
    shadowColor: atoms.colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: atoms.colors.border.light,
  },
  foodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: atoms.spacing.spacing.sm,
  },
  foodIcon: {
    marginRight: atoms.spacing.spacing.xs,
  },
  foodName: {
    ...atoms.typography.variant.subtitle1,
    color: atoms.colors.text.primary,
    flex: 1,
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  nutritionInfoColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default FoodListItem;
