import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { atoms } from '../../../../theme';

const { colors } = atoms;
const { width } = Dimensions.get('window');

interface WorkoutChartProps {
  data: {
    _id: Realm.BSON.ObjectId;
    type: string;
    duration: number;
    caloriesBurned: number;
    date: Date;
    notes?: string;
  }[];
}

const WorkoutChart: React.FC<WorkoutChartProps> = ({ data }) => {
  const { t } = useTranslation();

  // Group data by date
  const groupedData = data.reduce((acc, item) => {
    const dateStr = item.date.toISOString().split('T')[0];
    if (!acc[dateStr]) {
      acc[dateStr] = {
        date: item.date,
        caloriesBurned: 0,
        duration: 0,
        workouts: 0,
      };
    }
    acc[dateStr].caloriesBurned += item.caloriesBurned;
    acc[dateStr].duration += item.duration;
    acc[dateStr].workouts += 1;
    return acc;
  }, {} as Record<string, { date: Date; caloriesBurned: number; duration: number; workouts: number }>);

  // Convert grouped data to array and sort by date
  const chartData = Object.values(groupedData).sort((a, b) => a.date.getTime() - b.date.getTime());

  // Get the last 7 days of data
  const last7Days = chartData.slice(-7);

  // Find the maximum values for scaling
  const maxCaloriesBurned = Math.max(...last7Days.map(d => d.caloriesBurned), 1);
  const maxDuration = Math.max(...last7Days.map(d => d.duration), 1);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: 'short' });
  };

  // Calculate totals and averages
  const totalCaloriesBurned = last7Days.reduce((sum, day) => sum + day.caloriesBurned, 0);
  const totalDuration = last7Days.reduce((sum, day) => sum + day.duration, 0);
  const totalWorkouts = last7Days.reduce((sum, day) => sum + day.workouts, 0);

  const avgCaloriesBurned = last7Days.length > 0 ? Math.round(totalCaloriesBurned / last7Days.length) : 0;
  const avgDuration = last7Days.length > 0 ? Math.round(totalDuration / last7Days.length) : 0;

  // Count workout types
  const workoutTypes = data.reduce((acc, workout) => {
    const type = workout.type.toLowerCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort workout types by count
  const sortedWorkoutTypes = Object.entries(workoutTypes)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 3); // Get top 3

  // Get color for workout type
  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case 'running': return '#FF6B6B'; // Red
      case 'cycling': return '#4ECDC4'; // Teal
      case 'swimming': return '#1A91FF'; // Blue
      case 'walking': return '#FFD166'; // Yellow
      case 'yoga': return '#A78BFA'; // Purple
      case 'weightlifting': return '#F97316'; // Orange
      default: return colors.primary.main;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('workoutSummary')}</Text>

      {/* Calories Burned Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{t('caloriesBurned')} - {t('last7Days')}</Text>

        <View style={styles.chartGrid}>
          {/* Bars */}
          <View style={styles.barsContainer}>
            {last7Days.map((day, index) => (
              <View key={index} style={styles.barColumn}>
                <View style={styles.barLabelContainer}>
                  <Text style={styles.barValue}>{day.caloriesBurned}</Text>
                </View>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${(day.caloriesBurned / maxCaloriesBurned) * 100}%`,
                        backgroundColor: colors.secondary.main
                      }
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{formatDate(day.date)}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Workout Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalWorkouts}</Text>
          <Text style={styles.statLabel}>{t('totalWorkouts')}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalDuration} {t('min')}</Text>
          <Text style={styles.statLabel}>{t('totalDuration')}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalCaloriesBurned}</Text>
          <Text style={styles.statLabel}>{t('totalCalories')}</Text>
        </View>
      </View>

      {/* Average Stats */}
      <View style={styles.averageContainer}>
        <Text style={styles.sectionSubtitle}>{t('averages')}</Text>
        <View style={styles.averageRow}>
          <Text style={styles.averageLabel}>{t('avgCaloriesBurned')}:</Text>
          <Text style={styles.averageValue}>{avgCaloriesBurned} {t('kcal')}</Text>
        </View>
        <View style={styles.averageRow}>
          <Text style={styles.averageLabel}>{t('avgDuration')}:</Text>
          <Text style={styles.averageValue}>{avgDuration} {t('min')}</Text>
        </View>
      </View>

      {/* Most Common Workouts */}
      {sortedWorkoutTypes.length > 0 && (
        <View style={styles.workoutTypesContainer}>
          <Text style={styles.sectionSubtitle}>{t('mostCommonWorkouts')}</Text>

          {sortedWorkoutTypes.map(([type, count], index) => (
            <View key={index} style={styles.workoutTypeRow}>
              <View style={styles.workoutTypeInfo}>
                <View
                  style={[
                    styles.workoutTypeColor,
                    { backgroundColor: getWorkoutTypeColor(type) }
                  ]}
                />
                <Text style={styles.workoutTypeName}>{t(type)}</Text>
              </View>
              <Text style={styles.workoutTypeCount}>{count} {count === 1 ? t('session') : t('sessions')}</Text>
            </View>
          ))}
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
    backgroundColor: colors.secondary.main,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.background.light,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary.main,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  averageContainer: {
    marginBottom: 24,
    backgroundColor: colors.background.light,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  averageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  averageLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  averageValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
  },
  workoutTypesContainer: {
    backgroundColor: colors.background.light,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  workoutTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  workoutTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutTypeColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  workoutTypeName: {
    fontSize: 14,
    color: colors.text.primary,
  },
  workoutTypeCount: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});

export default WorkoutChart;
