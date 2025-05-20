import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/NavigationContainer';
import { useUser, DietaryPreference as DietaryPreferenceType } from '../../../context/UserContext';
import { Button } from '../../../components/atoms';
import { Card } from '../../../components/molecules';
import { atoms } from '../../../theme';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const { colors } = atoms;

type DietaryPreferenceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DietaryPreference'>;

const DietaryPreference: React.FC = () => {
  const navigation = useNavigation<DietaryPreferenceScreenNavigationProp>();
  const { updateUserData, userData } = useUser();
  const { t } = useTranslation();

  const handleDietarySelection = (dietaryPreference: DietaryPreferenceType) => {
    updateUserData({ dietaryPreference });
    navigation.navigate('UserDashboard');
  };

  const dietaryOptions: { value: DietaryPreferenceType; label: string; description: string; color: string }[] = [
    {
      value: 'none',
      label: t('noSpecificDiet'),
      description: t('noSpecificDietDesc'),
      color: colors.neutral.lighter
    },
    {
      value: 'vegan',
      label: t('vegan'),
      description: t('veganDesc'),
      color: colors.semantic.success + '20' // Light green
    },
    {
      value: 'vegetarian',
      label: t('vegetarian'),
      description: t('vegetarianDesc'),
      color: colors.background.fitness
    },
    {
      value: 'keto',
      label: t('keto'),
      description: t('ketoDesc'),
      color: colors.semantic.error + '20' // Light red
    },
    {
      value: 'paleo',
      label: t('paleo'),
      description: t('paleoDesc'),
      color: colors.secondary.light + '20' // Light orange
    },
    {
      value: 'gluten_free',
      label: t('glutenFree'),
      description: t('glutenFreeDesc'),
      color: colors.semantic.info + '20' // Light blue
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('dietaryPreferenceTitle')}</Text>
          <Text style={styles.subtitle}>
            {t('dietaryPreferenceSubtitle')}
          </Text>

          <View style={styles.optionsContainer}>
            {dietaryOptions.map((option) => (
              <Card
                key={option.value}
                variant="default"
                onPress={() => handleDietarySelection(option.value)}
                selected={userData.dietaryPreference === option.value}
                style={styles.dietaryCard}
              >
                <View style={[styles.dietaryIconContainer, { backgroundColor: option.color }]} />
                <View style={styles.dietaryTextContainer}>
                  <Text style={styles.dietaryTitle}>{option.label}</Text>
                  <Text style={styles.dietaryDescription}>
                    {option.description}
                  </Text>
                </View>
              </Card>
            ))}
          </View>

          <View style={styles.navigationButtons}>
            <Button
              variant="outline"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              {t('back')}
            </Button>

            <Button
              variant="primary"
              onPress={() => handleDietarySelection('none')}
              style={styles.skipButton}
            >
              {t('skip')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DietaryPreference;
