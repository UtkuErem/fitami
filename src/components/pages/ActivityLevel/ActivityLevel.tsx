import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/NavigationContainer';
import { useUser, ActivityLevel as ActivityLevelType } from '../../../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../../components/atoms/buttons';
import { Card } from '../../../components/molecules/cards';
import { atoms } from '../../../theme';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const { colors, spacing } = atoms;

type ActivityLevelScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ActivityLevel'>;

const ActivityLevel: React.FC = () => {
  const navigation = useNavigation<ActivityLevelScreenNavigationProp>();
  const { updateUserData, userData } = useUser();
  const [fadeAnim] = useState(new Animated.Value(0));
  const { t } = useTranslation();

  // Animation effect when component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleActivitySelection = (activityLevel: ActivityLevelType) => {
    updateUserData({ activityLevel });
    navigation.navigate('DietaryPreference');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>{t('activityLevelTitle')}</Text>
        <Text style={styles.subtitle}>
          {t('activityLevelSubtitle')}
        </Text>

        <Animated.View style={[styles.optionsContainer, {
          transform: [{ translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0]
          }) }]
        }]}>
          <Card
            variant="default"
            onPress={() => handleActivitySelection('low')}
            selected={userData.activityLevel === 'low'}
            style={styles.activityCard}
          >
            <View style={styles.activityIconContainer}>
              <Icon name="seat-outline" size={30} color={colors.semantic.success} style={styles.activityIcon} />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>{t('lowActivity')}</Text>
              <Text style={styles.activityDescription}>
                {t('lowActivityDesc')}
              </Text>
            </View>
          </Card>

          <Card
            variant="default"
            onPress={() => handleActivitySelection('medium')}
            selected={userData.activityLevel === 'medium'}
            style={styles.activityCard}
          >
            <View style={styles.activityIconContainer}>
              <Icon name="walk" size={30} color={colors.semantic.success} style={styles.activityIcon} />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>{t('mediumActivity')}</Text>
              <Text style={styles.activityDescription}>
                {t('mediumActivityDesc')}
              </Text>
            </View>
          </Card>

          <Card
            variant="default"
            onPress={() => handleActivitySelection('high')}
            selected={userData.activityLevel === 'high'}
            style={styles.activityCard}
          >
            <View style={styles.activityIconContainer}>
              <Icon name="run-fast" size={30} color={colors.semantic.success} style={styles.activityIcon} />
            </View>
            <View style={styles.activityTextContainer}>
              <Text style={styles.activityTitle}>{t('highActivity')}</Text>
              <Text style={styles.activityDescription}>
                {t('highActivityDesc')}
              </Text>
            </View>
          </Card>
        </Animated.View>

        <View style={styles.navigationButtons}>
          <Button
            variant="outline"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <View style={styles.buttonContent}>
              <Icon name="arrow-left" size={18} color={colors.text.secondary} style={{ marginRight: spacing.spacing.xs }} />
              <Text style={styles.backButtonText}>{t('back')}</Text>
            </View>
          </Button>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ActivityLevel;
