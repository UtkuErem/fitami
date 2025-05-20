import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { atoms } from '../../../../theme';
import { MealType, getMealTypeIcon } from '../../../../constants/mealTypes';

const { colors } = atoms;

interface Meal {
  _id: Realm.BSON.ObjectId;
  key: string;
  calories: number;
  date: Date;
  mealType: MealType;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface MealDetailsProps {
  meal: Meal;
}

const MealDetails: React.FC<MealDetailsProps> = ({ meal }) => {
  const { t } = useTranslation();

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate macronutrient percentages
  const calculateMacroPercentage = () => {
    if (!meal.protein && !meal.carbs && !meal.fat) return null;

    const totalGrams = (meal.protein || 0) + (meal.carbs || 0) + (meal.fat || 0);
    if (totalGrams === 0) return null;

    return {
      protein: meal.protein ? Math.round((meal.protein / totalGrams) * 100) : 0,
      carbs: meal.carbs ? Math.round((meal.carbs / totalGrams) * 100) : 0,
      fat: meal.fat ? Math.round((meal.fat / totalGrams) * 100) : 0
    };
  };

  const macroPercentages = calculateMacroPercentage();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name={getMealTypeIcon(meal.mealType)}
          size={24}
          color={colors.primary.main}
          style={styles.mealIcon}
        />
        <Text style={styles.mealName}>{t(meal.key)}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('mealType')}:</Text>
          <Text style={styles.infoValue}>{t(meal.mealType)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{t('dateTime')}:</Text>
          <Text style={styles.infoValue}>{formatDate(meal.date)}</Text>
        </View>
      </View>

      <View style={styles.nutritionSection}>
        <Text style={styles.sectionTitle}>{t('nutritionalInfo')}</Text>

        <View style={styles.calorieBox}>
          <Text style={styles.calorieValue}>{meal.calories}</Text>
          <Text style={styles.calorieLabel}>{t('kcal')}</Text>
        </View>

        {(meal.protein || meal.carbs || meal.fat) && (
          <>
            <View style={styles.macrosContainer}>
              {meal.protein && (
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{meal.protein}g</Text>
                  <Text style={styles.macroLabel}>{t('protein')}</Text>
                  {macroPercentages && (
                    <Text style={styles.macroPercentage}>{macroPercentages.protein}%</Text>
                  )}
                </View>
              )}

              {meal.carbs && (
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{meal.carbs}g</Text>
                  <Text style={styles.macroLabel}>{t('carbs')}</Text>
                  {macroPercentages && (
                    <Text style={styles.macroPercentage}>{macroPercentages.carbs}%</Text>
                  )}
                </View>
              )}

              {meal.fat && (
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{meal.fat}g</Text>
                  <Text style={styles.macroLabel}>{t('fat')}</Text>
                  {macroPercentages && (
                    <Text style={styles.macroPercentage}>{macroPercentages.fat}%</Text>
                  )}
                </View>
              )}
            </View>

            {macroPercentages && (
              <View style={styles.macroBarContainer}>
                {meal.protein && macroPercentages.protein > 0 && (
                  <View
                    style={[
                      styles.macroBarSegment,
                      styles.proteinBar,
                      { flex: macroPercentages.protein }
                    ]}
                  />
                )}
                {meal.carbs && macroPercentages.carbs > 0 && (
                  <View
                    style={[
                      styles.macroBarSegment,
                      styles.carbsBar,
                      { flex: macroPercentages.carbs }
                    ]}
                  />
                )}
                {meal.fat && macroPercentages.fat > 0 && (
                  <View
                    style={[
                      styles.macroBarSegment,
                      styles.fatBar,
                      { flex: macroPercentages.fat }
                    ]}
                  />
                )}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  mealIcon: {
    marginRight: 12,
  },
  mealName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  infoSection: {
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  nutritionSection: {
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  calorieBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  calorieValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.primary.main,
  },
  calorieLabel: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  macroLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  macroPercentage: {
    fontSize: 12,
    color: colors.primary.main,
    marginTop: 2,
  },
  macroBarContainer: {
    height: 12,
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
  },
  macroBarSegment: {
    height: '100%',
  },
  proteinBar: {
    backgroundColor: '#FF6B6B', // Red for protein
  },
  carbsBar: {
    backgroundColor: '#4ECDC4', // Teal for carbs
  },
  fatBar: {
    backgroundColor: '#FFD166', // Yellow for fat
  },
});

export default MealDetails;
