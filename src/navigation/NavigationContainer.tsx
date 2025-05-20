import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import {
  Onboarding as OnboardingScreen,
  TargetSelection as TargetSelectionScreen,
  BasicInfo as BasicInfoScreen,
  ActivityLevel as ActivityLevelScreen,
  DietaryPreference as DietaryPreferenceScreen,
  MainApp as MainAppScreen
} from '../components/pages';

// Import context
import { useUser } from '../context/UserContext';

// Import theme
import { atoms, organisms } from '../theme';

// Define the stack navigator param list
export type RootStackParamList = {
  Onboarding: undefined;
  TargetSelection: undefined;
  BasicInfo: undefined;
  ActivityLevel: undefined;
  DietaryPreference: undefined;
  MainApp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { isProfileComplete } = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: organisms.navigation.stackNavigator.card
        }}
      >
        {!isProfileComplete ? (
          // User setup flow
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="TargetSelection" component={TargetSelectionScreen} />
            <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
            <Stack.Screen name="ActivityLevel" component={ActivityLevelScreen} />
            <Stack.Screen name="DietaryPreference" component={DietaryPreferenceScreen} />
          </>
        ) : (
          // Main app flow
          <Stack.Screen name="MainApp" component={MainAppScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
