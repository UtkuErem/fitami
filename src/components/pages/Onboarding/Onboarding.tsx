import React from 'react';
import { Image, View, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { NextButton, DoneButton, Dots } from '../../atoms';
import { CalorieTracker, WorkoutDisplay, MoodTracker } from '../../molecules';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/NavigationContainer';
import { useTranslation } from 'react-i18next';

// Import theme
import { atoms, organisms } from '../../../theme';
import styles from './styles';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const { t } = useTranslation();

  const handleOnboardingComplete = () => {
    navigation.navigate('TargetSelection');
  };

  return (
    <Onboarding
      onDone={handleOnboardingComplete}
      onSkip={handleOnboardingComplete}
      NextButtonComponent={NextButton}
      DoneButtonComponent={DoneButton}
      DotComponent={Dots}
      containerStyles={organisms.navigation.onboardingNavigator.container}
      pages={[
        {
          backgroundColor: atoms.colors.background.default,
          image: (
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.image}
              />
            </View>
          ),
          title: t('welcomeToFitami'),
          subtitle: t('personalCompanion'),
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: atoms.colors.background.nutrition,
          image: (
            <View style={styles.illustrationContainer}>
              <CalorieTracker />
            </View>
          ),
          title: t('trackCalories'),
          subtitle: t('calorieSubtitle'),
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: atoms.colors.background.fitness,
          image: (
            <View style={styles.illustrationContainer}>
              <WorkoutDisplay />
            </View>
          ),
          title: t('fitnessMadeEasy'),
          subtitle: t('fitnessSubtitle'),
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: atoms.colors.background.mental,
          image: (
            <View style={styles.illustrationContainer}>
              <MoodTracker />
            </View>
          ),
          title: t('mentalWellness'),
          subtitle: t('mentalWellnessSubtitle'),
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
      ]}
    />
  );
};

export default OnboardingScreen;
