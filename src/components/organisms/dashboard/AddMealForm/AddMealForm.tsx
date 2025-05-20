import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { atoms } from '../../../../theme';
import { InputGroup } from '../../../atoms/inputs';
import FoodList from '../../../pages/FoodList';
import { MealType, getMealTypeIcon } from '../../../../constants/mealTypes';

const { colors } = atoms;

interface AddMealFormProps {
  onAddMeal: (mealData: {
    key: string;
    calories: number;
    mealType: MealType;
    protein?: number;
    carbs?: number;
    fat?: number;
  }) => void;
  isSmallScreen?: boolean;
  onSubmitRef?: React.MutableRefObject<(() => void) | null>;
  initialValues?: {
    key: string;
    calories: number;
    mealType: MealType;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

const AddMealForm: React.FC<AddMealFormProps> = ({
  onAddMeal,
  isSmallScreen = false,
  onSubmitRef,
  initialValues,
}) => {
  const { t } = useTranslation();
  const [showFoodList, setShowFoodList] = useState(false);
  const [newMealName, setNewMealName] = useState(initialValues?.key ? t(initialValues.key) : '');
  const [newMealKey, setNewMealKey] = useState(initialValues?.key || '');
  const [newMealCalories, setNewMealCalories] = useState(initialValues?.calories ? initialValues.calories.toString() : '');
  const [newMealProtein, setNewMealProtein] = useState(initialValues?.protein ? initialValues.protein.toString() : '');
  const [newMealCarbs, setNewMealCarbs] = useState(initialValues?.carbs ? initialValues.carbs.toString() : '');
  const [newMealFat, setNewMealFat] = useState(initialValues?.fat ? initialValues.fat.toString() : '');
  const [newMealType, setNewMealType] = useState<MealType>(initialValues?.mealType || MealType.SNACK);

  // Handle food selection from FoodList
  const handleFoodSelect = (food: {
    name: string;
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    key: string;
  }) => {
    setNewMealName(food.name);
    setNewMealKey(food.key); // Save the key
    setNewMealCalories(food.calories.toString());
    if (food.protein) setNewMealProtein(food.protein.toString());
    if (food.carbs) setNewMealCarbs(food.carbs.toString());
    if (food.fat) setNewMealFat(food.fat.toString());
    setShowFoodList(false);
  };

  // Add a custom meal
  const handleAddMeal = () => {
    if ((newMealName.trim() || newMealKey.trim()) && newMealCalories.trim()) {
      const calories = parseInt(newMealCalories);
      if (!isNaN(calories) && calories > 0) {
        const mealData = {
          key: newMealKey || newMealName.trim().toLowerCase().replace(/\s+/g, '_'), // Use key if available, else generate from name
          calories: calories,
          mealType: newMealType,
        } as any;

        // Add optional nutritional info if provided
        if (newMealProtein.trim()) {
          mealData.protein = parseFloat(newMealProtein);
        }

        if (newMealCarbs.trim()) {
          mealData.carbs = parseFloat(newMealCarbs);
        }

        if (newMealFat.trim()) {
          mealData.fat = parseFloat(newMealFat);
        }

        onAddMeal(mealData);

        // Reset form fields
        setNewMealName('');
        setNewMealKey('');
        setNewMealCalories('');
        setNewMealProtein('');
        setNewMealCarbs('');
        setNewMealFat('');
        setNewMealType(MealType.SNACK);
        setShowFoodList(false);
      }
    }
  };

  // Set the onSubmitRef to the handleAddMeal function
  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = handleAddMeal;
    }
  }, [onSubmitRef, newMealName, newMealKey, newMealCalories, newMealProtein, newMealCarbs, newMealFat, newMealType]);

  // Update form fields when initialValues changes
  useEffect(() => {
    if (initialValues) {
      setNewMealName(initialValues.key ? t(initialValues.key) : '');
      setNewMealKey(initialValues.key || '');
      setNewMealCalories(initialValues.calories ? initialValues.calories.toString() : '');
      setNewMealProtein(initialValues.protein ? initialValues.protein.toString() : '');
      setNewMealCarbs(initialValues.carbs ? initialValues.carbs.toString() : '');
      setNewMealFat(initialValues.fat ? initialValues.fat.toString() : '');
      setNewMealType(initialValues.mealType || MealType.SNACK);
    }
  }, [initialValues, t]);

  return (
    <View>
      {/* Toggle between manual entry and food list */}
      <View style={[styles.toggleContainer, isSmallScreen && styles.toggleContainerSmall]}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !showFoodList && styles.toggleButtonSelected,
            isSmallScreen && styles.toggleButtonSmall
          ]}
          onPress={() => setShowFoodList(false)}
        >
          <Icon
            name="pencil"
            size={16}
            color={!showFoodList ? colors.neutral.white : colors.primary.main}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[
              styles.toggleButtonText,
              !showFoodList && styles.toggleButtonTextSelected
            ]}
          >
            {t('manual')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            showFoodList && styles.toggleButtonSelected,
            isSmallScreen && styles.toggleButtonSmall
          ]}
          onPress={() => setShowFoodList(true)}
        >
          <Icon
            name="food-apple"
            size={16}
            color={showFoodList ? colors.neutral.white : colors.primary.main}
            style={{ marginRight: 6 }}
          />
          <Text
            style={[
              styles.toggleButtonText,
              showFoodList && styles.toggleButtonTextSelected
            ]}
          >
            {t('foodList')}
          </Text>
        </TouchableOpacity>
      </View>

      {showFoodList ? (
        <View style={[styles.foodListContainer, isSmallScreen && styles.foodListContainerSmall]}>
          <FoodList onSelectFood={handleFoodSelect} showTitle={false} />
        </View>
      ) : (
        <>
          <InputGroup
            label={t('mealName')}
            icon={<Icon name="food" size={18} color={colors.primary.main} style={{ marginRight: 6 }} />}
            placeholder={t('mealName')}
            value={newMealName}
            onChangeText={setNewMealName}
          />

          <InputGroup
            label={t('calories')}
            icon={<Icon name="fire" size={18} color={colors.primary.main} style={{ marginRight: 6 }} />}
            placeholder={t('calories')}
            value={newMealCalories}
            onChangeText={setNewMealCalories}
            keyboardType="numeric"
          />

          {/* Nutritional information */}
          <View style={[styles.nutritionRow, isSmallScreen && styles.nutritionRowSmall]}>
            <View style={[styles.nutritionItem, isSmallScreen && styles.nutritionItemSmall]}>
              <InputGroup
                label={t('protein')}
                icon={<Icon name="arm-flex" size={18} color={colors.primary.main} style={{ marginRight: 6 }} />}
                placeholder={t('grams')}
                value={newMealProtein}
                onChangeText={setNewMealProtein}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.nutritionItem, isSmallScreen && styles.nutritionItemSmall]}>
              <InputGroup
                label={t('carbs')}
                icon={<Icon name="bread-slice" size={18} color={colors.primary.main} style={{ marginRight: 6 }} />}
                placeholder={t('grams')}
                value={newMealCarbs}
                onChangeText={setNewMealCarbs}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.nutritionItem, isSmallScreen && styles.nutritionItemSmall]}>
              <InputGroup
                label={t('fat')}
                icon={<Icon name="oil" size={18} color={colors.primary.main} style={{ marginRight: 6 }} />}
                placeholder={t('grams')}
                value={newMealFat}
                onChangeText={setNewMealFat}
                keyboardType="numeric"
              />
            </View>
          </View>
        </>
      )}

      {/* Meal type selection */}
      <Text style={styles.mealTypeLabel}>{t('mealType')}</Text>
      <View style={[styles.mealTypeContainer, isSmallScreen && styles.mealTypeContainerSmall]}>
        {Object.values(MealType).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.mealTypeButton,
              newMealType === type && styles.mealTypeButtonSelected,
              isSmallScreen && styles.mealTypeButtonSmall
            ]}
            onPress={() => setNewMealType(type)}
          >
            <Icon
              name={getMealTypeIcon(type)}
              size={16}
              color={newMealType === type ? colors.neutral.white : colors.primary.main}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.mealTypeText,
                newMealType === type && styles.mealTypeTextSelected
              ]}
            >
              {t(type)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nutritionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  nutritionRowSmall: {
    flexDirection: 'column',
  },
  nutritionItem: {
    flexGrow: 1,
    flexBasis: '30%',
    minWidth: 100,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  nutritionItemSmall: {
    flexBasis: '100%',
    minWidth: '100%',
    marginHorizontal: 0,
  },
  mealTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mealTypeContainerSmall: {
    flexDirection: 'column',
  },
  mealTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.light,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    width: '48%',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  mealTypeButtonSmall: {
    width: '100%',
  },
  mealTypeButtonSelected: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  mealTypeText: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  mealTypeTextSelected: {
    color: colors.neutral.white,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toggleContainerSmall: {
    flexDirection: 'column',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.light,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '48%',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  toggleButtonSmall: {
    width: '100%',
    marginBottom: 8,
  },
  toggleButtonSelected: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  toggleButtonTextSelected: {
    color: colors.neutral.white,
  },
  foodListContainer: {
    height: 300,
    maxHeight: 300,
  },
  foodListContainerSmall: {
    height: 250,
    maxHeight: 250,
  },
});

export default AddMealForm;
