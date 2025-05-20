import { TFunction } from 'i18next';

// Define the type for a food item
export interface FoodItem {
  key: string;
  fat: number;
  protein: number;
  carbohydrate: number;
  icon?: string;
}

// Define the food items with translation keys
const foodItems: FoodItem[] = [
  { key: "apple", fat: 0.2, protein: 0.3, carbohydrate: 14, icon: "food-apple" },
  { key: "pear", fat: 0.1, protein: 0.4, carbohydrate: 15, icon: "fruit-pear" },
  { key: "banana", fat: 0.3, protein: 1.3, carbohydrate: 27, icon: "food-banana" },
  { key: "plainYogurt", fat: 3.3, protein: 3.5, carbohydrate: 4.7, icon: "cup" },
  { key: "rice", fat: 0.3, protein: 2.7, carbohydrate: 28, icon: "rice" },
  { key: "chickenBreast", fat: 3.6, protein: 31, carbohydrate: 0, icon: "food-drumstick" },
  { key: "beef", fat: 15, protein: 26, carbohydrate: 0, icon: "food-steak" },
  { key: "egg", fat: 5, protein: 6, carbohydrate: 0.6, icon: "egg" },
  { key: "blackBeans", fat: 0.5, protein: 8.9, carbohydrate: 23.7, icon: "seed" },
  { key: "tofu", fat: 4.8, protein: 8.1, carbohydrate: 1.9, icon: "cube-outline" },
  { key: "salmon", fat: 13, protein: 20, carbohydrate: 0, icon: "fish" },
  { key: "sweetPotato", fat: 0.1, protein: 1.6, carbohydrate: 20, icon: "potato" },
  { key: "cassava", fat: 0.3, protein: 1.4, carbohydrate: 38, icon: "root" },
  { key: "paoDeQueijo", fat: 4.2, protein: 2.2, carbohydrate: 13.6, icon: "bread-slice" },
  { key: "feijoada", fat: 12, protein: 21, carbohydrate: 25, icon: "bowl-mix" },
  { key: "turkeyBreast", fat: 1, protein: 29, carbohydrate: 0, icon: "food-turkey" },
  { key: "dumplings", fat: 6, protein: 10, carbohydrate: 30, icon: "food" },
  { key: "stirFriedNoodles", fat: 10, protein: 8, carbohydrate: 35, icon: "noodles" },
  { key: "mapoTofu", fat: 13, protein: 15, carbohydrate: 10, icon: "bowl" },
  { key: "greenSalad", fat: 0.2, protein: 1.5, carbohydrate: 3.6, icon: "leaf" },
  { key: "carrot", fat: 0.2, protein: 0.9, carbohydrate: 9.6, icon: "carrot" },
  { key: "broccoli", fat: 0.4, protein: 2.8, carbohydrate: 7, icon: "tree" },
  { key: "brownRice", fat: 1.8, protein: 2.6, carbohydrate: 23, icon: "rice" },
  { key: "milk", fat: 8, protein: 8, carbohydrate: 12, icon: "cup-water" },
  { key: "cheese", fat: 33, protein: 25, carbohydrate: 1.3, icon: "cheese" },
  { key: "toastedBread", fat: 1.1, protein: 2.5, carbohydrate: 12, icon: "toast" },
  { key: "avocado", fat: 15, protein: 2, carbohydrate: 9, icon: "fruit-pear" },
  { key: "pumpkin", fat: 0.1, protein: 1, carbohydrate: 7.5, icon: "food-apple-outline" },
  { key: "yakisoba", fat: 10, protein: 7, carbohydrate: 40, icon: "noodles" },
  { key: "cornOnTheCob", fat: 2, protein: 4, carbohydrate: 27, icon: "corn" },
  { key: "quinoa", fat: 1.9, protein: 4.1, carbohydrate: 21.3, icon: "grain" },
  { key: "lentils", fat: 0.4, protein: 9, carbohydrate: 20, icon: "seed" },
  { key: "oatmeal", fat: 3.6, protein: 6, carbohydrate: 27, icon: "bowl" },
  { key: "peanutButter", fat: 16, protein: 8, carbohydrate: 6, icon: "peanut" },
  { key: "granolaBar", fat: 5, protein: 3, carbohydrate: 17, icon: "candy-bar" },
  { key: "cabbage", fat: 0.1, protein: 1, carbohydrate: 6, icon: "leaf" },
  { key: "spinach", fat: 0.4, protein: 3, carbohydrate: 3.7, icon: "leaf" },
  { key: "pasta", fat: 1.1, protein: 5.8, carbohydrate: 25, icon: "noodles" },
  { key: "misoSoup", fat: 2, protein: 3, carbohydrate: 6, icon: "bowl" },
  { key: "chickpeas", fat: 2.6, protein: 8.9, carbohydrate: 27, icon: "seed" },
  { key: "hamburger", fat: 17, protein: 14, carbohydrate: 31, icon: "hamburger" },
  { key: "hotDog", fat: 13, protein: 7, carbohydrate: 2, icon: "food-hot-dog" },
  { key: "frenchFries", fat: 17, protein: 3.4, carbohydrate: 48, icon: "french-fries" },
  { key: "orange", fat: 0.1, protein: 1.2, carbohydrate: 15.4, icon: "fruit-citrus" },
  { key: "grapes", fat: 0.2, protein: 0.6, carbohydrate: 17, icon: "fruit-grapes" },
  { key: "watermelon", fat: 0.2, protein: 0.6, carbohydrate: 8, icon: "fruit-watermelon" },
  { key: "strawberries", fat: 0.3, protein: 0.8, carbohydrate: 7.7, icon: "fruit-cherries" },
  { key: "pineapple", fat: 0.1, protein: 0.5, carbohydrate: 13, icon: "pine-tree" }
];

// Function to get translated food items
export const getTranslatedFoodItems = (t: TFunction) => {
  return foodItems.map(item => ({
    name: t(item.key),
    fat: item.fat,
    protein: item.protein,
    carbohydrate: item.carbohydrate,
    key: item.key,
    icon: item.icon
  }));
};

export default foodItems;
