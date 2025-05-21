import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDatabase } from '../../../services/database';
import { atoms } from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Modal } from '../../organisms';
import { WorkoutChart } from '../../molecules/charts';

const { colors } = atoms;

// Workout type interface
interface WorkoutItem {
  _id: Realm.BSON.ObjectId;
  type: string;
  duration: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}

const Workouts: React.FC = () => {
  const { t } = useTranslation();
  const { databaseService } = useDatabase();
  const [workouts, setWorkouts] = useState<WorkoutItem[]>([]);
  const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    type: 'running',
    duration: 30,
    caloriesBurned: 300,
    notes: ''
  });

  // Load workouts from database
  useEffect(() => {
    if (databaseService) {
      const dbWorkouts = databaseService.getWorkouts();
      setWorkouts(Array.from(dbWorkouts));
    }
  }, [databaseService]);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get icon for workout type
  const getWorkoutIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'running':
        return 'directions-run';
      case 'cycling':
        return 'directions-bike';
      case 'swimming':
        return 'pool';
      case 'walking':
        return 'directions-walk';
      case 'yoga':
        return 'self-improvement';
      case 'weightlifting':
        return 'fitness-center';
      default:
        return 'fitness-center';
    }
  };

  // Add a new workout
  const addWorkout = () => {
    if (!databaseService) return;

    const workoutData = {
      type: newWorkout.type,
      duration: newWorkout.duration,
      caloriesBurned: newWorkout.caloriesBurned,
      date: new Date(),
      notes: newWorkout.notes
    };

    const createdWorkout = databaseService.createWorkout(workoutData);
    setWorkouts([createdWorkout, ...workouts]);
    setShowAddWorkoutModal(false);

    // Reset form
    setNewWorkout({
      type: 'running',
      duration: 30,
      caloriesBurned: 300,
      notes: ''
    });
  };

  // Render a workout item
  const renderWorkoutItem = ({ item }: { item: WorkoutItem }) => (
    <View style={styles.workoutCard}>
      <View style={styles.workoutIconContainer}>
        <Icon name={getWorkoutIcon(item.type)} size={24} color={colors.primary.contrast} />
      </View>

      <View style={styles.workoutDetails}>
        <Text style={styles.workoutType}>{t(item.type.toLowerCase())}</Text>
        <Text style={styles.workoutDate}>{formatDate(item.date)}</Text>

        <View style={styles.workoutStats}>
          <View style={styles.workoutStat}>
            <Icon name="timer" size={16} color={colors.primary.main} />
            <Text style={styles.workoutStatText}>{item.duration} {t('minutes')}</Text>
          </View>

          <View style={styles.workoutStat}>
            <Icon name="local-fire-department" size={16} color={colors.primary.main} />
            <Text style={styles.workoutStatText}>{item.caloriesBurned} {t('kcal')}</Text>
          </View>
        </View>

        {item.notes && (
          <Text style={styles.workoutNotes}>{item.notes}</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.emoji}>🏋️‍♂️ </Text>
          {t('workouts')}
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddWorkoutModal(true)}
        >
          <Icon name="add" size={24} color={colors.primary.contrast} />
        </TouchableOpacity>
      </View>

      {workouts.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {workouts.map(item => renderWorkoutItem({ item }))}

          {/* Workout Statistics */}
          <View style={styles.chartContainer}>
            <WorkoutChart data={workouts} />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="fitness-center" size={48} color={colors.text.hint} />
          <Text style={styles.emptyStateText}>{t('noWorkoutsYet')}</Text>
          <TouchableOpacity
            style={styles.emptyStateButton}
            onPress={() => setShowAddWorkoutModal(true)}
          >
            <Text style={styles.emptyStateButtonText}>{t('addFirstWorkout')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add Workout Modal */}
      <Modal
        visible={showAddWorkoutModal}
        onClose={() => setShowAddWorkoutModal(false)}
        title={`${t('addWorkout')} 🏋️‍♂️`}
        variant="form"
        primaryButtonText={t('add')}
        primaryButtonAction={addWorkout}
        secondaryButtonText={t('cancel')}
        secondaryButtonAction={() => setShowAddWorkoutModal(false)}
      >
        <View style={styles.formContainer}>
          {/* Workout Type Selection */}
          <Text style={styles.formLabel}>{t('workoutType')}</Text>
          <View style={styles.workoutTypeContainer}>
            {['running', 'cycling', 'swimming', 'walking', 'yoga', 'weightlifting'].map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.workoutTypeButton,
                  newWorkout.type === type && styles.workoutTypeButtonActive
                ]}
                onPress={() => setNewWorkout({...newWorkout, type})}
              >
                <Icon
                  name={getWorkoutIcon(type)}
                  size={24}
                  color={newWorkout.type === type ? colors.primary.contrast : colors.primary.main}
                />
                <Text
                  style={[
                    styles.workoutTypeText,
                    newWorkout.type === type && styles.workoutTypeTextActive
                  ]}
                >
                  {t(type)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Duration Selector */}
          <Text style={styles.formLabel}>{t('duration')} ({t('minutes')})</Text>
          <View style={styles.durationContainer}>
            {[15, 30, 45, 60, 90].map(duration => (
              <TouchableOpacity
                key={duration}
                style={[
                  styles.durationButton,
                  newWorkout.duration === duration && styles.durationButtonActive
                ]}
                onPress={() => setNewWorkout({
                  ...newWorkout,
                  duration,
                  // Estimate calories based on duration and type
                  caloriesBurned: Math.round(duration * (
                    newWorkout.type === 'running' ? 10 :
                    newWorkout.type === 'cycling' ? 8 :
                    newWorkout.type === 'swimming' ? 11 :
                    newWorkout.type === 'walking' ? 5 :
                    newWorkout.type === 'yoga' ? 4 :
                    newWorkout.type === 'weightlifting' ? 6 : 7
                  ))
                })}
              >
                <Text
                  style={[
                    styles.durationText,
                    newWorkout.duration === duration && styles.durationTextActive
                  ]}
                >
                  {duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Calories Display */}
          <View style={styles.caloriesContainer}>
            <Text style={styles.formLabel}>{t('estimatedCalories')}</Text>
            <Text style={styles.caloriesValue}>{newWorkout.caloriesBurned} {t('kcal')}</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  emoji: {
    fontSize: 22,
  },
  addButton: {
    backgroundColor: colors.primary.main,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutsList: {
    padding: 16,
  },
  scrollContent: {
    padding: 16,
  },
  workoutCard: {
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  workoutIconContainer: {
    backgroundColor: colors.primary.main,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutDetails: {
    flex: 1,
    padding: 16,
  },
  workoutType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  workoutStats: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutStatText: {
    marginLeft: 4,
    color: colors.text.secondary,
    fontSize: 14,
  },
  workoutNotes: {
    fontSize: 14,
    color: colors.text.secondary,
    fontStyle: 'italic',
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
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: colors.primary.contrast,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  workoutTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  workoutTypeButton: {
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.primary.main,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    width: '30%',
  },
  workoutTypeButtonActive: {
    backgroundColor: colors.primary.main,
  },
  workoutTypeText: {
    color: colors.primary.main,
    marginTop: 4,
    fontSize: 12,
  },
  workoutTypeTextActive: {
    color: colors.primary.contrast,
  },
  durationContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  durationButton: {
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.primary.main,
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 50,
  },
  durationButtonActive: {
    backgroundColor: colors.primary.main,
  },
  durationText: {
    color: colors.primary.main,
    fontWeight: 'bold',
  },
  durationTextActive: {
    color: colors.primary.contrast,
  },
  caloriesContainer: {
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  caloriesValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary.main,
  },
  chartContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});

export default Workouts;
