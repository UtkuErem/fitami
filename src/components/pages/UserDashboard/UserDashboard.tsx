import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  useWindowDimensions,
  Alert
} from 'react-native';
import { useUser } from '../../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { useDatabase } from '../../../services/database';
import { MealInput } from '../../../services/database';
import { getTranslatedFoodItems } from '../../../constants/foodData';
import { atoms } from '../../../theme';
import { MealType } from '../../../constants/mealTypes';
import { Modal } from '../../organisms';
import {
  CalorieCard,
  QuickEntrySection,
  MealsList,
  AddMealForm,
  MealDetails
} from '../../organisms/dashboard';
import { calculateCalories } from '../../../utils';

const { colors } = atoms;

const UserDashboard: React.FC = () => {
  const { userData, calorieGoal } = useUser();
  const { t } = useTranslation();
  const { databaseService, isLoading } = useDatabase();
  const { width } = useWindowDimensions();
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [meals, setMeals] = useState<{ _id: Realm.BSON.ObjectId; key: string; calories: number; date: Date; mealType: MealType; protein?: number; carbs?: number; fat?: number; }[]>([]);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [showMealDetailsModal, setShowMealDetailsModal] = useState(false);
  const [showEditMealModal, setShowEditMealModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const addMealFormSubmitRef = useRef<(() => void) | null>(null);
  const editMealFormSubmitRef = useRef<(() => void) | null>(null);

  // Determine if we're on a small screen
  const isSmallScreen = width < 375;

  // Get translated food items for quick entries
  const translatedFoodItems = getTranslatedFoodItems(t);

  // Select a subset of food items for quick entries
  const quickEntryFoods = translatedFoodItems.filter(item =>
    ['apple', 'banana', 'egg', 'plainYogurt', 'toastedBread', 'coffee'].includes(item.key)
  );

  // Load meals from database
  useEffect(() => {
    if (databaseService) {
      const dbMeals = databaseService.getTodayMeals();
      const mealsArray = Array.from(dbMeals);
      setMeals(mealsArray);

      // Calculate total consumed calories
      const totalCalories = mealsArray.reduce((total, meal) => total + meal.calories, 0);
      setConsumedCalories(totalCalories);
    }
  }, [databaseService]);

  // Animation effect when component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Add a quick entry food to the meals list
  const addQuickEntryFood = (food: any) => {
    if (!databaseService) return;

    // Calculate calories from macronutrients if not provided
    const calories = food.calories || calculateCalories(food.protein, food.carbohydrate, food.fat);

    const mealData: MealInput = {
      key: food.key,
      calories: calories,
      date: new Date(),
      mealType: MealType.SNACK
    };

    // Add nutritional info if available
    if (food.protein) {
      mealData.protein = food.protein;
    }

    if (food.carbohydrate) {
      mealData.carbs = food.carbohydrate;
    }

    if (food.fat) {
      mealData.fat = food.fat;
    }

    const newMeal = databaseService.createMeal(mealData);
    setMeals([...meals, newMeal]);
    setConsumedCalories(consumedCalories + calories);
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

    const dbMealData: MealInput = {
      key: mealData.key,
      calories: mealData.calories,
      date: new Date(),
      mealType: mealData.mealType
    };

    // Add optional nutritional info if provided
    if (mealData.protein) dbMealData.protein = mealData.protein;
    if (mealData.carbs) dbMealData.carbs = mealData.carbs;
    if (mealData.fat) dbMealData.fat = mealData.fat;

    const newMeal = databaseService.createMeal(dbMealData);
    setMeals([...meals, newMeal]);
    setConsumedCalories(consumedCalories + mealData.calories);
    setShowAddMealModal(false);
  };

  // View meal details
  const viewMealDetails = (meal: any) => {
    setSelectedMeal(meal);
    setShowMealDetailsModal(true);
  };

  // Edit a meal
  const editMeal = (meal: any) => {
    setSelectedMeal(meal);
    setShowEditMealModal(true);
  };

  // Update a meal
  const updateMeal = (mealData: {
    key: string;
    calories: number;
    mealType: MealType;
    protein?: number;
    carbs?: number;
    fat?: number;
  }) => {
    if (!databaseService || !selectedMeal) return;

    const oldCalories = selectedMeal.calories;
    const dbMealData: Partial<MealInput> = {
      key: mealData.key,
      calories: mealData.calories,
      mealType: mealData.mealType
    };

    // Add optional nutritional info if provided
    if (mealData.protein) dbMealData.protein = mealData.protein;
    if (mealData.carbs) dbMealData.carbs = mealData.carbs;
    if (mealData.fat) dbMealData.fat = mealData.fat;

    const updatedMeal = databaseService.updateMeal(selectedMeal._id, dbMealData);

    if (updatedMeal) {
      // Update the meals array with the updated meal
      const updatedMeals = meals.map(meal =>
        meal._id.equals(selectedMeal._id) ? updatedMeal : meal
      );
      setMeals(updatedMeals);

      // Update consumed calories
      setConsumedCalories(consumedCalories - oldCalories + mealData.calories);
    }

    setShowEditMealModal(false);
    setSelectedMeal(null);
  };

  // Delete a meal
  const deleteMeal = (mealId: Realm.BSON.ObjectId) => {
    if (!databaseService) return;

    // Find the meal to get its calories
    const mealToDelete = meals.find(meal => meal._id.equals(mealId));

    if (!mealToDelete) return;

    // Confirm deletion
    Alert.alert(
      t('deleteMeal'),
      t('confirmDelete'),
      [
        {
          text: t('cancel'),
          style: 'cancel'
        },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => {
            // Delete the meal from the database
            const success = databaseService.deleteMeal(mealId);

            if (success) {
              // Update the meals array
              const updatedMeals = meals.filter(meal => !meal._id.equals(mealId));
              setMeals(updatedMeals);

              // Update consumed calories
              setConsumedCalories(consumedCalories - mealToDelete.calories);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, isSmallScreen && styles.scrollContentSmall]}>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.greeting}>
            <Text style={styles.emoji}>✨ </Text>
            {t('hello')} {userData.name}! <Text style={styles.emoji}>🌿</Text>
          </Text>
          <Text style={styles.calorieGoal}>
            {t('dailyCalorieGoal')} <Text style={styles.calorieNumber}>{calorieGoal} {t('kcal')}</Text>
          </Text>
        </Animated.View>

        <Animated.View style={{
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0]
            })
          }]
        }}>
          <CalorieCard
            calorieGoal={calorieGoal}
            consumedCalories={consumedCalories}
            isSmallScreen={isSmallScreen}
          />
        </Animated.View>

        <Animated.View style={{
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0]
            })
          }]
        }}>
          <QuickEntrySection
            foodItems={quickEntryFoods}
            onAddFood={addQuickEntryFood}
            isSmallScreen={isSmallScreen}
          />
        </Animated.View>

        <Animated.View style={{
          opacity: fadeAnim,
          transform: [{
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 0]
            })
          }]
        }}>
          <MealsList
            meals={meals}
            onAddMeal={() => setShowAddMealModal(true)}
            onViewMealDetails={viewMealDetails}
            onEditMeal={editMeal}
            onDeleteMeal={deleteMeal}
            isSmallScreen={isSmallScreen}
          />
        </Animated.View>

        {/* Add Meal Modal */}
        <Modal
          visible={showAddMealModal}
          onClose={() => setShowAddMealModal(false)}
          title={`${t('addMeal')} 🍲`}
          variant="form"
          primaryButtonText={t('add')}
          primaryButtonAction={() => {
            if (addMealFormSubmitRef.current) addMealFormSubmitRef.current();
          }}
          secondaryButtonText={t('cancel')}
          secondaryButtonAction={() => setShowAddMealModal(false)}
        >
          <AddMealForm
            onAddMeal={addCustomMeal}
            isSmallScreen={isSmallScreen}
            onSubmitRef={addMealFormSubmitRef}
          />
        </Modal>

        {/* Meal Details Modal */}
        <Modal
          visible={showMealDetailsModal}
          onClose={() => setShowMealDetailsModal(false)}
          title={`${t('mealDetails')} 🍽️`}
          variant="form"
          primaryButtonText={t('close')}
          primaryButtonAction={() => setShowMealDetailsModal(false)}
        >
          {selectedMeal && <MealDetails meal={selectedMeal} />}
        </Modal>

        {/* Edit Meal Modal */}
        <Modal
          visible={showEditMealModal}
          onClose={() => setShowEditMealModal(false)}
          title={`${t('editMeal')} ✏️`}
          variant="form"
          primaryButtonText={t('save')}
          primaryButtonAction={() => {
            if (editMealFormSubmitRef.current) editMealFormSubmitRef.current();
          }}
          secondaryButtonText={t('cancel')}
          secondaryButtonAction={() => setShowEditMealModal(false)}
        >
          {selectedMeal && (
            <AddMealForm
              onAddMeal={updateMeal}
              isSmallScreen={isSmallScreen}
              onSubmitRef={editMealFormSubmitRef}
              initialValues={selectedMeal}
            />
          )}
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    width: '100%',
  },
  scrollContentSmall: {
    padding: 10,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  calorieGoal: {
    fontSize: 18,
    color: colors.text.secondary,
  },
  calorieNumber: {
    fontWeight: 'bold',
    color: colors.primary.main,
  },
});

export default UserDashboard;
