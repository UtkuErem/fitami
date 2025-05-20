import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { atoms } from '../../../../theme';

const { colors } = atoms;

interface CalorieCardProps {
  calorieGoal: number;
  consumedCalories: number;
  isSmallScreen?: boolean;
}

const CalorieCard: React.FC<CalorieCardProps> = ({
  calorieGoal,
  consumedCalories,
  isSmallScreen = false,
}) => {
  const { t } = useTranslation();

  // Calculate remaining calories
  const remainingCalories = calorieGoal - consumedCalories;

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View style={styles.calorieCard}>
      <View style={[styles.calorieRow, isSmallScreen && styles.calorieRowSmall]}>
        <View style={[styles.calorieItem, isSmallScreen && styles.calorieItemSmall]}>
          <Icon name="flag-checkered" size={24} color={colors.primary.main} style={styles.calorieIcon} />
          <Text style={styles.calorieLabel}>{t('goal')}</Text>
          <Text style={styles.calorieValue}>{formatNumber(calorieGoal)}</Text>
        </View>
        <View style={[styles.calorieItem, isSmallScreen && styles.calorieItemSmall]}>
          <Icon name="food-apple" size={24} color={colors.primary.main} style={styles.calorieIcon} />
          <Text style={styles.calorieLabel}>{t('consumed')}</Text>
          <Text style={styles.calorieValue}>{formatNumber(consumedCalories)}</Text>
        </View>
        <View style={[styles.calorieItem, isSmallScreen && styles.calorieItemSmall]}>
          <Icon name="calculator" size={24} color={colors.primary.main} style={styles.calorieIcon} />
          <Text style={styles.calorieLabel}>{t('remaining')}</Text>
          <Text style={[
            styles.calorieValue,
            remainingCalories < 0 ? styles.negativeCalories : null
          ]}>
            {formatNumber(remainingCalories)}
          </Text>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${Math.min(100, (consumedCalories / calorieGoal) * 100)}%` }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calorieCard: {
    backgroundColor: colors.neutral.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calorieRowSmall: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  calorieItem: {
    alignItems: 'center',
  },
  calorieItemSmall: {
    marginBottom: 16,
  },
  calorieIcon: {
    marginBottom: 8,
  },
  calorieLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  calorieValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  negativeCalories: {
    color: colors.semantic.error,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.border.light,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 8,
  },
});

export default CalorieCard;
