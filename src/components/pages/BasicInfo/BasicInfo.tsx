import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  useWindowDimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/NavigationContainer';
import { useUser, Gender } from '../../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { InputGroup } from '../../../components/atoms/inputs';
import { GenderOption } from '../../../components/atoms/inputs';
import { Button } from '../../../components/atoms/buttons';
import styles from './styles';

type BasicInfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BasicInfo'>;

const BasicInfo: React.FC = () => {
  const navigation = useNavigation<BasicInfoScreenNavigationProp>();
  const { updateUserData, userData } = useUser();
  const { t } = useTranslation();
  const { width, height: screenHeight } = useWindowDimensions();

  // Responsive layout state
  const [isSmallScreen, setIsSmallScreen] = useState(width < 375);

  // Update responsive state when dimensions change
  useEffect(() => {
    setIsSmallScreen(width < 375);
  }, [width]);

  const [name, setName] = useState(userData.name || '');
  const [age, setAge] = useState(userData.age ? userData.age.toString() : '');
  const [gender, setGender] = useState<Gender | undefined>(userData.gender);
  const [weight, setWeight] = useState(userData.weight ? userData.weight.toString() : '');
  const [height, setHeight] = useState(userData.height ? userData.height.toString() : '');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validate = () => {
    const newErrors: {[key: string]: string} = {};

    if (!name.trim()) newErrors.name = t('nameRequired');
    if (!age.trim()) newErrors.age = t('ageRequired');
    else if (isNaN(Number(age)) || Number(age) <= 0 || Number(age) > 120)
      newErrors.age = t('invalidAge');

    if (!gender) newErrors.gender = t('selectGender');

    if (!weight.trim()) newErrors.weight = t('weightRequired');
    else if (isNaN(Number(weight)) || Number(weight) <= 0 || Number(weight) > 500)
      newErrors.weight = t('invalidWeight');

    if (!height.trim()) newErrors.height = t('heightRequired');
    else if (isNaN(Number(height)) || Number(height) <= 0 || Number(height) > 300)
      newErrors.height = t('invalidHeight');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      updateUserData({
        name,
        age: Number(age),
        gender,
        weight: Number(weight),
        height: Number(height)
      });
      navigation.navigate('ActivityLevel');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>{t('basicInfoTitle')}</Text>
            <Text style={styles.subtitle}>{t('basicInfoSubtitle')}</Text>

            <View style={styles.formContainer}>
              <InputGroup
                label={t('yourName')}
                placeholder={t('enterName')}
                value={name}
                onChangeText={setName}
                error={errors.name}
              />

              <InputGroup
                label={t('age')}
                placeholder={t('enterAge')}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                error={errors.age}
              />

              <View>
                <Text style={styles.label}>{t('gender')}</Text>
                <View style={[
                  styles.genderContainer,
                  isSmallScreen && { flexDirection: 'column' }
                ]}>
                  <GenderOption
                    label={t('male')}
                    icon="👨"
                    selected={gender === 'male'}
                    onPress={() => setGender('male')}
                    accentColor="#5BBFBA"
                  />
                  <GenderOption
                    label={t('female')}
                    icon="👩"
                    selected={gender === 'female'}
                    onPress={() => setGender('female')}
                    accentColor="#5BBFBA"
                  />
                  <GenderOption
                    label={t('other')}
                    icon="👤"
                    selected={gender === 'other'}
                    onPress={() => setGender('other')}
                    accentColor="#5BBFBA"
                  />
                </View>
                {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
              </View>

              <InputGroup
                label={t('weight')}
                placeholder={t('enterWeight')}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                error={errors.weight}
              />

              <InputGroup
                label={t('height')}
                placeholder={t('enterHeight')}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                error={errors.height}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                onPress={handleContinue}
                variant="primary"
                size="large"
              >
                {t('continue')}
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BasicInfo;
