import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/NavigationContainer';
import { useUser, FitnessTarget } from '../../../context/UserContext';
import { OptionCard } from '../../molecules/cards';
import { atoms, organisms } from '../../../theme';
import { useTranslation } from 'react-i18next';
import styles from './styles';

type TargetSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TargetSelection'>;

const TargetSelection: React.FC = () => {
  const navigation = useNavigation<TargetSelectionScreenNavigationProp>();
  const { updateUserData } = useUser();
  const { t } = useTranslation();

  const handleTargetSelection = (target: FitnessTarget) => {
    updateUserData({ target });
    navigation.navigate('BasicInfo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('targetSelectionTitle')}</Text>
        <Text style={styles.subtitle}>{t('targetSelectionSubtitle')}</Text>

        <View style={styles.optionsContainer}>
          <OptionCard
            title={t('loseWeight')}
            description={t('loseWeightDesc')}
            iconBackgroundColor={atoms.colors.semantic.error + '20'} // Light red
            icon={<View style={styles.iconPlaceholder} />}
            onPress={() => handleTargetSelection('lose_weight')}
            selected={false}
          />

          <OptionCard
            title={t('gainWeight')}
            description={t('gainWeightDesc')}
            iconBackgroundColor={atoms.colors.semantic.info + '20'} // Light blue
            icon={<View style={styles.iconPlaceholder} />}
            onPress={() => handleTargetSelection('gain_weight')}
            selected={false}
          />

          <OptionCard
            title={t('stayFit')}
            description={t('stayFitDesc')}
            iconBackgroundColor={atoms.colors.semantic.success + '20'} // Light green
            icon={<View style={styles.iconPlaceholder} />}
            onPress={() => handleTargetSelection('stay_fit')}
            selected={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TargetSelection;
