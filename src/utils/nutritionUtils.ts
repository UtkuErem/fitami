/**
 * Utility functions for nutrition calculations
 */

/**
 * Calculate calories from macronutrients
 * @param protein - Protein in grams
 * @param carbs - Carbohydrates in grams
 * @param fat - Fat in grams
 * @returns Calculated calories (rounded to nearest integer)
 */
export const calculateCalories = (protein: number, carbs: number, fat: number): number => {
  return Math.round((protein * 4) + (carbs * 4) + (fat * 9));
};
