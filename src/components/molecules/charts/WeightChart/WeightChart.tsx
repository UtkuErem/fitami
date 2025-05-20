import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { atoms } from '../../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { colors } = atoms;

interface WeightEntry {
  date: Date;
  weight: number;
}

interface WeightChartProps {
  data: WeightEntry[];
  currentWeight: number;
  targetWeight?: number;
  onAddWeight?: () => void;
}

const WeightChart: React.FC<WeightChartProps> = ({
  data,
  currentWeight,
  targetWeight,
  onAddWeight
}) => {
  const { t } = useTranslation();

  // Sort data by date
  const sortedData = [...data].sort((a, b) => a.date.getTime() - b.date.getTime());

  // Get the last 6 entries
  const recentEntries = sortedData.slice(-6);

  // Find min and max for scaling
  const weights = recentEntries.map(entry => entry.weight);
  if (targetWeight) weights.push(targetWeight);
  weights.push(currentWeight);

  const minWeight = Math.min(...weights) * 0.95; // Add 5% padding
  const maxWeight = Math.max(...weights) * 1.05; // Add 5% padding

  // Calculate weight change
  const weightChange = data.length > 1
    ? currentWeight - data[0].weight
    : 0;

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('weightHistory')}</Text>
        {onAddWeight && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={onAddWeight}
          >
            <Icon name="add" size={20} color={colors.primary.main} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.currentWeightContainer}>
        <Text style={styles.currentWeightLabel}>{t('currentWeight')}</Text>
        <Text style={styles.currentWeightValue}>{currentWeight} kg</Text>

        {weightChange !== 0 && (
          <View style={[
            styles.changeContainer,
            weightChange < 0 ? styles.weightLoss : styles.weightGain
          ]}>
            <Icon
              name={weightChange < 0 ? 'arrow-downward' : 'arrow-upward'}
              size={16}
              color={weightChange < 0 ? colors.semantic.success : colors.semantic.error}
            />
            <Text style={[
              styles.changeText,
              weightChange < 0 ? styles.weightLossText : styles.weightGainText
            ]}>
              {Math.abs(weightChange).toFixed(1)} kg
            </Text>
          </View>
        )}
      </View>

      {targetWeight && (
        <View style={styles.targetContainer}>
          <Text style={styles.targetLabel}>{t('targetWeight')}</Text>
          <Text style={styles.targetValue}>{targetWeight} kg</Text>
          <Text style={styles.targetRemaining}>
            {Math.abs(currentWeight - targetWeight).toFixed(1)} kg {t('toGo')}
          </Text>
        </View>
      )}

      {recentEntries.length > 1 ? (
        <View style={styles.chartContainer}>
          <View style={styles.chartLabels}>
            {recentEntries.map((entry, index) => (
              <Text key={index} style={styles.dateLabel}>
                {formatDate(entry.date)}
              </Text>
            ))}
          </View>

          <View style={styles.chartArea}>
            {/* Target weight line if available */}
            {targetWeight && (
              <View
                style={[
                  styles.targetLine,
                  {
                    top: `${100 - ((targetWeight - minWeight) / (maxWeight - minWeight)) * 100}%`
                  }
                ]}
              >
                <Text style={styles.targetLineLabel}>{targetWeight} kg</Text>
              </View>
            )}

            {/* Weight points and connecting lines */}
            <View style={styles.pointsContainer}>
              {recentEntries.map((entry, index) => {
                const nextEntry = recentEntries[index + 1];
                const pointPosition = ((entry.weight - minWeight) / (maxWeight - minWeight)) * 100;

                return (
                  <React.Fragment key={index}>
                    <View
                      style={[
                        styles.weightPoint,
                        {
                          left: `${(index / (recentEntries.length - 1)) * 100}%`,
                          bottom: `${100 - pointPosition}%`
                        }
                      ]}
                    />

                    {nextEntry && (
                      <View
                        style={[
                          styles.connectionLine,
                          {
                            left: `${(index / (recentEntries.length - 1)) * 100}%`,
                            width: `${(1 / (recentEntries.length - 1)) * 100}%`,
                            bottom: `${100 - pointPosition}%`,
                            transform: [{
                              rotate: `${Math.atan2(
                                ((nextEntry.weight - minWeight) / (maxWeight - minWeight)) * 100 - pointPosition,
                                100 / (recentEntries.length - 1)
                              ) * (180 / Math.PI)}deg`
                            }],
                            transformOrigin: 'left bottom'
                          }
                        ]}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{t('notEnoughData')}</Text>
          <Text style={styles.noDataSubtext}>{t('addMoreWeightEntries')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  addButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.background.light,
    borderWidth: 1,
    borderColor: colors.primary.light,
  },
  currentWeightContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  currentWeightLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  currentWeightValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary.main,
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  weightLoss: {
    backgroundColor: colors.semantic.success + '20', // 20% opacity
  },
  weightGain: {
    backgroundColor: colors.semantic.error + '20', // 20% opacity
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  weightLossText: {
    color: colors.semantic.success,
  },
  weightGainText: {
    color: colors.semantic.error,
  },
  targetContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background.light,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  targetLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  targetValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary.main,
    marginBottom: 4,
  },
  targetRemaining: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  chartContainer: {
    height: 200,
    marginTop: 16,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
    width: '16.6%', // 100% / 6 entries
  },
  chartArea: {
    flex: 1,
    position: 'relative',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border.light,
  },
  targetLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.secondary.main,
  },
  targetLineLabel: {
    position: 'absolute',
    right: 0,
    top: -10,
    fontSize: 10,
    color: colors.secondary.main,
    backgroundColor: colors.background.paper,
    paddingHorizontal: 4,
  },
  pointsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  weightPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary.main,
    marginLeft: -4,
    marginBottom: -4,
  },
  connectionLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: colors.primary.main,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    backgroundColor: colors.background.light,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
    marginTop: 16,
  },
  noDataText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 8,
  },
  noDataSubtext: {
    fontSize: 14,
    color: colors.text.hint,
  },
});

export default WeightChart;
