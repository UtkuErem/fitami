import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { atoms } from '../../../../theme';
import { Button } from '../../../atoms/buttons';
import { MealType, getMealTypeIcon } from '../../../../constants/mealTypes';

const { colors } = atoms;

interface Meal {
  _id: Realm.BSON.ObjectId;
  key: string; // Use key instead of name
  calories: number;
  date: Date;
  mealType: MealType;
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface MealsListProps {
  meals: Meal[];
  onAddMeal: () => void;
  onEditMeal?: (meal: Meal) => void;
  onDeleteMeal?: (mealId: Realm.BSON.ObjectId) => void;
  onViewMealDetails?: (meal: Meal) => void;
  isSmallScreen?: boolean;
}

const MealsList: React.FC<MealsListProps> = ({
  meals,
  onAddMeal,
  onEditMeal,
  onDeleteMeal,
  onViewMealDetails,
  isSmallScreen = false,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Icon name="silverware-fork-knife" size={24} color={colors.primary.main} />
          <Text style={styles.sectionTitle}>{t('todaysMeals')} 📝</Text>
        </View>
        <Button
          variant="primary"
          size="small"
          onPress={onAddMeal}
          style={styles.addMealButton}
        >
          {t('addMeal')}
        </Button>
      </View>

      {meals.length > 0 ? (
        <View style={styles.mealsList}>
          {meals.map((meal) => (
            <TouchableOpacity
              key={meal._id.toString()}
              style={[styles.mealItem, isSmallScreen && styles.mealItemSmall]}
              onPress={() => onViewMealDetails && onViewMealDetails(meal)}
              disabled={!onViewMealDetails}
            >
              <Icon
                name={getMealTypeIcon(meal.mealType)}
                size={20}
                color={colors.primary.main}
                style={styles.mealIcon}
              />
              <View style={[styles.mealDetails, isSmallScreen && styles.mealDetailsSmall]}>
                <Text style={styles.mealName}>{t(meal.key)}</Text>
                <Text style={styles.mealTime}>
                  {t(meal.mealType)} • {meal.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </Text>
              </View>
              <View style={[styles.mealNutrition, isSmallScreen && styles.mealNutritionSmall]}>
                <Text style={styles.mealCalories}>{meal.calories} {t('kcal')}</Text>
                {(meal.protein || meal.carbs || meal.fat) && (
                  <Text style={styles.mealMacros}>
                    {meal.protein ? `P: ${meal.protein}g ` : ''}
                    {meal.carbs ? `C: ${meal.carbs}g ` : ''}
                    {meal.fat ? `F: ${meal.fat}g` : ''}
                  </Text>
                )}
              </View>

              {(onEditMeal || onDeleteMeal) && (
                <View style={styles.mealActions}>
                  {onEditMeal && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => onEditMeal(meal)}
                    >
                      <Icon name="pencil" size={18} color={colors.primary.main} />
                    </TouchableOpacity>
                  )}
                  {onDeleteMeal && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => onDeleteMeal(meal._id)}
                    >
                      <Icon name="delete" size={18} color={colors.semantic.error} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.emptyMealsContainer}>
          <Icon name="food-off" size={40} color={colors.primary.main} style={{ marginBottom: 16 }} />
          <Text style={styles.emptyMealsText}>{t('noMealsYet')}</Text>
          <Button
            variant="primary"
            onPress={onAddMeal}
            style={styles.addFirstMealButton}
          >
            {t('addMeal')}
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  addMealButton: {
    borderRadius: 10,
  },
  mealsList: {
    backgroundColor: colors.neutral.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  mealItemSmall: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  mealIcon: {
    marginRight: 10,
  },
  mealDetails: {
    flex: 1,
  },
  mealDetailsSmall: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  mealName: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 12,
    color: colors.primary.main,
  },
  mealNutrition: {
    alignItems: 'flex-end',
  },
  mealNutritionSmall: {
    width: '100%',
    alignItems: 'flex-start',
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  mealMacros: {
    fontSize: 12,
    color: colors.primary.main,
    marginTop: 4,
  },
  emptyMealsContainer: {
    backgroundColor: colors.neutral.white,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  emptyMealsText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  addFirstMealButton: {
    borderRadius: 10,
  },
  mealActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.background.paper,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  deleteButton: {
    borderColor: colors.semantic.error + '40', // 40% opacity
  },
});

export default MealsList;
