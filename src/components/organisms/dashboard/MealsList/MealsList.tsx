import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { atoms } from '../../../../theme';
import { Button } from '../../../atoms/buttons';
import { MealCard } from '../../../molecules/cards';
import { MealType } from '../../../../constants/mealTypes';

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
            <MealCard
              key={meal._id.toString()}
              meal={meal}
              onPress={onViewMealDetails ? () => onViewMealDetails(meal) : undefined}
              onEdit={onEditMeal ? () => onEditMeal(meal) : undefined}
              onDelete={onDeleteMeal ? () => onDeleteMeal(meal._id) : undefined}
              isSmallScreen={isSmallScreen}
            />
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
});

export default MealsList;
