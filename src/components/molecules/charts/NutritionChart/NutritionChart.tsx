import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { atoms } from '../../../../theme';

const { colors } = atoms;
const { width } = Dimensions.get('window');

interface NutritionChartProps {
  data: {
    date: Date;
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  }[];
  calorieGoal: number;
}

const NutritionChart: React.FC<NutritionChartProps> = ({ data, calorieGoal }) => {
  const { t } = useTranslation();

  // Group data by date
  const groupedData = data.reduce((acc, item) => {
    const dateStr = item.date.toISOString().split('T')[0];
    if (!acc[dateStr]) {
      acc[dateStr] = {
        date: item.date,
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };
    }
    acc[dateStr].calories += item.calories;
    acc[dateStr].protein += item.protein || 0;
    // Add carbs value if available
    acc[dateStr].carbs += item.carbs || 0;
    acc[dateStr].fat += item.fat || 0;
    return acc;
  }, {} as Record<string, { date: Date; calories: number; protein: number; carbs: number; fat: number }>);

  // Convert grouped data to array and sort by date
  const chartData = Object.values(groupedData).sort((a, b) => a.date.getTime() - b.date.getTime());

  // Get the last 7 days of data
  const last7Days = chartData.slice(-7);

  // Find the maximum calorie value for scaling
  const maxCalories = Math.max(...last7Days.map(d => d.calories), calorieGoal);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: 'short' });
  };

  // Calculate average daily calories
  const averageCalories = last7Days.length > 0
    ? Math.round(last7Days.reduce((sum, day) => sum + day.calories, 0) / last7Days.length)
    : 0;

  // Calculate average macronutrient distribution
  const averageMacros = last7Days.length > 0
    ? {
        protein: Math.round(last7Days.reduce((sum, day) => sum + day.protein, 0) / last7Days.length),
        carbs: Math.round(last7Days.reduce((sum, day) => sum + day.carbs, 0) / last7Days.length),
        fat: Math.round(last7Days.reduce((sum, day) => sum + day.fat, 0) / last7Days.length),
      }
    : { protein: 0, carbs: 0, fat: 0 };

  // Calculate total macronutrient grams
  const totalMacroGrams = averageMacros.protein + averageMacros.carbs + averageMacros.fat;

  // Calculate macronutrient percentages
  const macroPercentages = totalMacroGrams > 0
    ? {
        protein: Math.round((averageMacros.protein / totalMacroGrams) * 100),
        carbs: Math.round((averageMacros.carbs / totalMacroGrams) * 100),
        fat: Math.round((averageMacros.fat / totalMacroGrams) * 100),
      }
    : { protein: 0, carbs: 0, fat: 0 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('nutritionSummary')}</Text>

      {/* Calorie Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{t('calorieIntake')} - {t('last7Days')}</Text>

        <View style={styles.chartGrid}>
          {/* Goal Line */}
          <View style={[styles.goalLine, { top: `${100 - (calorieGoal / maxCalories) * 100}%` }]}>
            <Text style={styles.goalText}>{t('goal')}: {calorieGoal} {t('kcal')}</Text>
          </View>

          {/* Bars */}
          <View style={styles.barsContainer}>
            {last7Days.map((day, index) => (
              <View key={index} style={styles.barColumn}>
                <View style={styles.barLabelContainer}>
                  <Text style={styles.barValue}>{day.calories}</Text>
                </View>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${(day.calories / maxCalories) * 100}%`,
                        backgroundColor: day.calories > calorieGoal ? colors.semantic.error : colors.primary.main
                      }
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{formatDate(day.date)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.averageContainer}>
          <Text style={styles.averageLabel}>{t('averageDaily')}:</Text>
          <Text style={styles.averageValue}>{averageCalories} {t('kcal')}</Text>
        </View>
      </View>

      {/* Macronutrient Distribution */}
      {totalMacroGrams > 0 && (
        <View style={styles.macroContainer}>
          <Text style={styles.chartTitle}>{t('macroDistribution')}</Text>

          <View style={styles.macroBarContainer}>
            {macroPercentages.protein > 0 && (
              <View
                style={[
                  styles.macroBarSegment,
                  styles.proteinBar,
                  { flex: macroPercentages.protein }
                ]}
              />
            )}
            {macroPercentages.carbs > 0 && (
              <View
                style={[
                  styles.macroBarSegment,
                  styles.carbsBar,
                  { flex: macroPercentages.carbs }
                ]}
              />
            )}
            {macroPercentages.fat > 0 && (
              <View
                style={[
                  styles.macroBarSegment,
                  styles.fatBar,
                  { flex: macroPercentages.fat }
                ]}
              />
            )}
          </View>

          <View style={styles.macroLegend}>
            <View style={styles.macroLegendItem}>
              <View style={[styles.macroLegendColor, styles.proteinBar]} />
              <Text style={styles.macroLegendText}>{t('protein')}: {macroPercentages.protein}%</Text>
              <Text style={styles.macroLegendSubtext}>({averageMacros.protein}g)</Text>
            </View>
            <View style={styles.macroLegendItem}>
              <View style={[styles.macroLegendColor, styles.carbsBar]} />
              <Text style={styles.macroLegendText}>{t('carbs')}: {macroPercentages.carbs}%</Text>
              <Text style={styles.macroLegendSubtext}>({averageMacros.carbs}g)</Text>
            </View>
            <View style={styles.macroLegendItem}>
              <View style={[styles.macroLegendColor, styles.fatBar]} />
              <Text style={styles.macroLegendText}>{t('fat')}: {macroPercentages.fat}%</Text>
              <Text style={styles.macroLegendSubtext}>({averageMacros.fat}g)</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 12,
  },
  chartGrid: {
    height: 200,
    position: 'relative',
    marginBottom: 8,
  },
  goalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.semantic.warning,
    zIndex: 1,
  },
  goalText: {
    position: 'absolute',
    right: 0,
    top: -16,
    fontSize: 12,
    color: colors.semantic.warning,
    backgroundColor: colors.background.paper,
    paddingHorizontal: 4,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barLabelContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'center',
  },
  barValue: {
    fontSize: 10,
    color: colors.text.secondary,
  },
  barWrapper: {
    width: '60%',
    height: '90%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    backgroundColor: colors.primary.main,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  averageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  averageLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginRight: 8,
  },
  averageValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary.main,
  },
  macroContainer: {
    marginTop: 16,
  },
  macroBarContainer: {
    height: 24,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
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
  macroLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  macroLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  macroLegendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  macroLegendText: {
    fontSize: 14,
    color: colors.text.primary,
    marginRight: 4,
  },
  macroLegendSubtext: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});

export default NutritionChart;
