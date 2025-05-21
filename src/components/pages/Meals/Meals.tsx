import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDatabase } from '../../../services/database';
import { useUser } from '../../../context/UserContext';
import { atoms } from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MealsList } from '../../organisms/dashboard';
import { Modal } from '../../organisms';
import { DateRangePicker } from '../../molecules/DateRangePicker';
import { NutritionChart } from '../../molecules/charts';
import { MealModal } from '../../molecules/meal';
import { MealType } from '../../../constants/mealTypes';

const { colors } = atoms;

const Meals: React.FC = () => {
  const { t } = useTranslation();
  const { databaseService } = useDatabase();
  const { calorieGoal } = useUser();
  const [meals, setMeals] = useState<any[]>([]);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isDateRangeActive, setIsDateRangeActive] = useState(false);

  // Load meals based on date range
  useEffect(() => {
    if (databaseService) {
      let mealsData;

      if (isDateRangeActive) {
        // Get meals in date range
        mealsData = databaseService.getMealsByDateRange(startDate, endDate);
      } else {
        // Get today's meals by default
        mealsData = databaseService.getTodayMeals();
      }

      const mealsArray = Array.from(mealsData);
      setMeals(mealsArray);
    }
  }, [databaseService, startDate, endDate, isDateRangeActive]);

  // Handle date range selection
  const handleDateRangeSelect = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    setIsDateRangeActive(true);
    setShowDatePickerModal(false);
  };

  // Reset to today's meals
  const resetToToday = () => {
    setIsDateRangeActive(false);
  };

  // Add a custom meal
  const addCustomMeal = (mealData: {
    key: string;
    calories: number;
    mealType: MealType;
    protein?: number;
    carbs?: number;
    fat?: number;
  }) => {
    if (!databaseService) return;

    const dbMealData = {
      _id: new Realm.BSON.ObjectId(),
      key: mealData.key,
      calories: mealData.calories,
      date: new Date(),
      mealType: mealData.mealType,
      protein: mealData.protein || 0,
      carbs: mealData.carbs || 0,
      fat: mealData.fat || 0,
    };

    // Add optional nutritional info if provided
    if (mealData.protein) {dbMealData.protein = mealData.protein;}
    if (mealData.carbs) {dbMealData.carbs = mealData.carbs;}
    if (mealData.fat) {dbMealData.fat = mealData.fat;}

    const newMeal = databaseService.createMeal(dbMealData);
    setMeals([...meals, newMeal]);
    setShowAddMealModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.emoji}>🍽️ </Text>
          {t('meals')}
        </Text>

        <View style={styles.dateFilterContainer}>
          {isDateRangeActive ? (
            <TouchableOpacity
              style={styles.dateRangeButton}
              onPress={resetToToday}
            >
              <Text style={styles.dateRangeText}>
                {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
              </Text>
              <Icon name="close" size={16} color={colors.primary.main} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowDatePickerModal(true)}
            >
              <Icon name="date-range" size={20} color={colors.primary.main} />
              <Text style={styles.filterButtonText}>{t('filterByDate')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MealsList
          meals={meals}
          onAddMeal={() => setShowAddMealModal(true)}
          isSmallScreen={false}
        />

        {meals.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="restaurant" size={48} color={colors.text.hint} />
            <Text style={styles.emptyStateText}>
              {isDateRangeActive
                ? t('noMealsInRange')
                : t('noMealsToday')}
            </Text>
          </View>
        )}

        {meals.length > 0 && (
          <NutritionChart
            data={meals}
            calorieGoal={calorieGoal}
          />
        )}
      </ScrollView>

      {/* Date Range Picker Modal */}
      <Modal
        visible={showDatePickerModal}
        onClose={() => setShowDatePickerModal(false)}
        title={`${t('selectDateRange')} 📅`}
        variant="form"
      >
        <DateRangePicker
          onSelectRange={handleDateRangeSelect}
          initialStartDate={startDate}
          initialEndDate={endDate}
        />
      </Modal>

      {/* Add Meal Modal */}
      <MealModal
        visible={showAddMealModal}
        onClose={() => setShowAddMealModal(false)}
        onAddMeal={addCustomMeal}
        isSmallScreen={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 22,
  },
  dateFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.paper,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  filterButtonText: {
    marginLeft: 6,
    color: colors.primary.main,
    fontWeight: '500',
  },
  dateRangeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.light + '20', // 20% opacity
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary.light,
  },
  dateRangeText: {
    color: colors.primary.dark,
    fontWeight: '500',
    marginRight: 8,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text.hint,
    textAlign: 'center',
  },
});

export default Meals;
