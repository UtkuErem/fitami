import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getTranslatedFoodItems } from '../../../constants/foodData';
import { FoodListItem } from '../../../components/molecules';
import { EmptyState } from '../../../components/molecules';
import { calculateCalories } from '../../../utils';
import styles from './styles';

interface FoodListProps {
  onSelectFood?: (food: {
    name: string;
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    key: string;
  }) => void;
  showTitle?: boolean;
}

const FoodList: React.FC<FoodListProps> = ({ onSelectFood, showTitle = true }) => {
  const { t } = useTranslation();
  const translatedFoodItems = getTranslatedFoodItems(t);

  const handleSelectFood = (item: any) => {
    if (onSelectFood) {
      const calories = calculateCalories(item.protein, item.carbohydrate, item.fat);
      onSelectFood({
        name: item.name,
        calories,
        protein: item.protein,
        carbs: item.carbohydrate,
        fat: item.fat,
        key: item.key
      });
    }
  };

  const renderFoodItem = ({ item }: { item: any }) => (
    <FoodListItem
      item={item}
      onSelect={handleSelectFood}
    />
  );

  return (
    <View style={styles.container}>
      {showTitle && <Text style={styles.title}>{t('todaysMeals')}</Text>}
      {translatedFoodItems.length === 0 ? (
        <EmptyState
          iconName="food-off"
          message={t('noFoodItems')}
        />
      ) : (
        <FlatList
          data={translatedFoodItems}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContent}
          style={{ height: '100%' }}
        />
      )}
    </View>
  );
};

export default FoodList;
