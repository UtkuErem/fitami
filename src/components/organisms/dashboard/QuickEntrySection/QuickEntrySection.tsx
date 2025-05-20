import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { atoms } from '../../../../theme';
import { calculateCalories } from '../../../../utils';

const { colors } = atoms;

interface FoodItem {
  name: string;
  calories?: number;
  protein?: number;
  carbohydrate?: number;
  fat?: number;
  key: string;
  icon?: string;
}

interface QuickEntrySectionProps {
  foodItems: FoodItem[];
  onAddFood: (food: FoodItem) => void;
  isSmallScreen?: boolean;
}

const QuickEntrySection: React.FC<QuickEntrySectionProps> = ({
  foodItems,
  onAddFood,
  isSmallScreen = false,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Icon name="food-fork-drink" size={24} color={colors.primary.main} />
        <Text style={styles.sectionTitle}>{t('quickEntry')} 🍽️</Text>
      </View>
      <View style={styles.quickEntryContainer}>
        {foodItems.map((food, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickEntryButton, isSmallScreen && styles.quickEntryButtonSmall]}
            onPress={() => onAddFood(food)}
          >
            {food.icon && (
              <Icon
                name={food.icon}
                size={24}
                color={colors.primary.main}
                style={styles.quickEntryIcon}
              />
            )}
            <Text style={styles.quickEntryText}>{food.name}</Text>
            <Text style={styles.quickEntryCalories}>
              {food.calories || calculateCalories(food.protein, food.carbohydrate, food.fat)} {t('kcal')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
    marginLeft: 8,
  },
  quickEntryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickEntryButton: {
    width: '48%',
    backgroundColor: colors.neutral.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  quickEntryButtonSmall: {
    width: '100%',
  },
  quickEntryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  quickEntryCalories: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  quickEntryIcon: {
    marginBottom: 8,
  },
});

export default QuickEntrySection;
