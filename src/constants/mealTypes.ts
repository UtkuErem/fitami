// Enum for meal types
export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
}

// Enum for common meal names
export enum MealName {
  // Breakfast items
  APPLE = 'apple',
  BANANA = 'banana',
  COFFEE = 'coffee',
  EGG = 'egg',
  YOGURT = 'yogurt',
  TOAST = 'toast',
  OATMEAL = 'oatmeal',

  // Lunch/Dinner items
  CHICKEN_BREAST = 'chickenBreast',
  RICE = 'rice',
  SALMON = 'salmon',
  PASTA = 'pasta',
  SALAD = 'greenSalad',

  // Snacks
  PEANUT_BUTTER = 'peanutButter',
  GRANOLA_BAR = 'granolaBar',

  // Add more as needed
}

// Helper function to get meal icon based on meal type
export const getMealTypeIcon = (mealType: MealType): string => {
  switch (mealType) {
    case MealType.BREAKFAST:
      return 'coffee';
    case MealType.LUNCH:
      return 'food';
    case MealType.DINNER:
      return 'food-turkey';
    case MealType.SNACK:
      return 'cookie';
    default:
      return 'food';
  }
};
