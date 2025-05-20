import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../context/UserContext';
import { atoms } from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Modal } from '../../organisms';
import { WeightChart } from '../../molecules/charts';

const { colors } = atoms;

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUser();
  const [showAddWeightModal, setShowAddWeightModal] = useState(false);
  const [newWeight, setNewWeight] = useState(userData.weight?.toString() || '');

  // Mock weight history data - in a real app, this would come from a database
  const [weightHistory, setWeightHistory] = useState<{ date: Date; weight: number }[]>([
    { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), weight: userData.weight ? userData.weight - 2 : 70 },
    { date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), weight: userData.weight ? userData.weight - 1.5 : 70.5 },
    { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), weight: userData.weight ? userData.weight - 1 : 71 },
    { date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), weight: userData.weight ? userData.weight - 0.5 : 71.5 },
    { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), weight: userData.weight ? userData.weight - 0.2 : 71.8 },
  ]);

  // Calculate BMI
  const calculateBMI = () => {
    if (!userData.height || !userData.weight) return null;

    const heightInMeters = userData.height / 100;
    const bmi = userData.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  // Get BMI category
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: t('underweight'), color: colors.semantic.warning };
    if (bmi < 25) return { label: t('normalWeight'), color: colors.semantic.success };
    if (bmi < 30) return { label: t('overweight'), color: colors.semantic.warning };
    return { label: t('obese'), color: colors.semantic.error };
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null;

  // Handle adding a new weight entry
  const handleAddWeight = () => {
    const weightValue = parseFloat(newWeight);
    if (!isNaN(weightValue) && weightValue > 0) {
      // Add new weight entry
      const newEntry = {
        date: new Date(),
        weight: weightValue
      };

      // Update weight history
      setWeightHistory([...weightHistory, newEntry]);

      // Close modal
      setShowAddWeightModal(false);

      // Reset form
      setNewWeight('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>
            <Text style={styles.emoji}>👤 </Text>
            {t('profile')}
          </Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>{userData.name ? userData.name.charAt(0).toUpperCase() : '?'}</Text>
            </View>
          </View>

          <Text style={styles.profileName}>{userData.name}</Text>

          <View style={styles.profileDetails}>
            <View style={styles.profileDetail}>
              <Icon name="cake" size={20} color={colors.primary.main} />
              <Text style={styles.profileDetailText}>{userData.age} {t('yearsOld')}</Text>
            </View>

            <View style={styles.profileDetail}>
              <Icon name="accessibility" size={20} color={colors.primary.main} />
              <Text style={styles.profileDetailText}>
                {userData.gender === 'male' ? t('male') : userData.gender === 'female' ? t('female') : t('other')}
              </Text>
            </View>
          </View>
        </View>

        {/* Body Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('bodyMetrics')}</Text>

          <View style={styles.metricsContainer}>
            <View style={styles.metricCard}>
              <Icon name="straighten" size={24} color={colors.primary.main} />
              <Text style={styles.metricValue}>{userData.height} cm</Text>
              <Text style={styles.metricLabel}>{t('height')}</Text>
            </View>

            <View style={styles.metricCard}>
              <Icon name="monitor-weight" size={24} color={colors.primary.main} />
              <Text style={styles.metricValue}>{userData.weight} kg</Text>
              <Text style={styles.metricLabel}>{t('weight')}</Text>
            </View>

            {bmi && (
              <View style={styles.metricCard}>
                <Icon name="favorite" size={24} color={colors.primary.main} />
                <Text style={styles.metricValue}>{bmi}</Text>
                <Text style={styles.metricLabel}>{t('bmi')}</Text>
                {bmiCategory && (
                  <Text style={[styles.bmiCategory, { color: bmiCategory.color }]}>
                    {bmiCategory.label}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>

        {/* Fitness Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('fitnessGoals')}</Text>

          <View style={styles.goalCard}>
            <Icon
              name={
                userData.target === 'loseWeight' ? 'trending-down' :
                userData.target === 'gainWeight' ? 'trending-up' : 'balance'
              }
              size={24}
              color={colors.primary.main}
            />
            <View style={styles.goalContent}>
              <Text style={styles.goalTitle}>
                {userData.target === 'loseWeight' ? t('loseWeight') :
                 userData.target === 'gainWeight' ? t('gainWeight') : t('stayFit')}
              </Text>
              <Text style={styles.goalDescription}>
                {userData.target === 'loseWeight' ? t('loseWeightDesc') :
                 userData.target === 'gainWeight' ? t('gainWeightDesc') : t('stayFitDesc')}
              </Text>
            </View>
          </View>
        </View>

        {/* Weight History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('weightProgress')}</Text>

          <WeightChart
            data={weightHistory}
            currentWeight={userData.weight || 70}
            targetWeight={userData.target === 'loseWeight' ? (userData.weight ? userData.weight - 5 : 65) :
                          userData.target === 'gainWeight' ? (userData.weight ? userData.weight + 5 : 75) : undefined}
            onAddWeight={() => setShowAddWeightModal(true)}
          />
        </View>

        {/* Settings Button */}
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings" size={20} color={colors.primary.contrast} />
          <Text style={styles.settingsButtonText}>{t('settings')}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Weight Modal */}
      <Modal
        visible={showAddWeightModal}
        onClose={() => setShowAddWeightModal(false)}
        title={`${t('addWeight')} ⚖️`}
        variant="form"
        primaryButtonText={t('add')}
        primaryButtonAction={handleAddWeight}
        secondaryButtonText={t('cancel')}
        secondaryButtonAction={() => setShowAddWeightModal(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalLabel}>{t('currentWeight')}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newWeight}
              onChangeText={setNewWeight}
              keyboardType="numeric"
              placeholder="70.0"
            />
            <Text style={styles.inputUnit}>kg</Text>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  emoji: {
    fontSize: 22,
  },
  profileCard: {
    backgroundColor: colors.background.paper,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary.dark,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  profileDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  profileDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  profileDetailText: {
    marginLeft: 6,
    color: colors.text.secondary,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  metricCard: {
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    elevation: 2,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  bmiCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  goalCard: {
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  goalContent: {
    marginLeft: 16,
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  settingsButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  settingsButtonText: {
    color: colors.primary.contrast,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  modalContent: {
    padding: 16,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.main,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background.paper,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: colors.text.primary,
  },
  inputUnit: {
    fontSize: 16,
    color: colors.text.secondary,
    marginLeft: 8,
  },
});

export default Profile;
