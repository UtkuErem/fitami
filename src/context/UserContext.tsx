import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useDatabase } from '../services/database/DatabaseContext';
import { User } from '../services/database/schemas';
import { Realm } from 'realm';

// Define the types for user data
export type FitnessTarget = 'lose_weight' | 'gain_weight' | 'stay_fit';
export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'low' | 'medium' | 'high';
export type DietaryPreference = 'none' | 'vegan' | 'vegetarian' | 'keto' | 'paleo' | 'gluten_free';

export interface UserData {
  name?: string;
  target?: FitnessTarget;
  age?: number;
  gender?: Gender;
  weight?: number; // in kg
  height?: number; // in cm
  activityLevel?: ActivityLevel;
  dietaryPreference?: DietaryPreference;
  _id?: Realm.BSON.ObjectId;
}

// Calculate daily calorie goal based on user data
const calculateCalorieGoal = (userData: UserData): number => {
  if (!userData.age || !userData.gender || !userData.weight || !userData.height || !userData.activityLevel || !userData.target) {
    return 0;
  }

  // Base calculation using Mifflin-St Jeor Equation
  let bmr = 0;
  if (userData.gender === 'male') {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
  } else {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
  }

  // Activity level multiplier
  let activityMultiplier = 1.2; // Default to low
  if (userData.activityLevel === 'medium') {
    activityMultiplier = 1.55;
  } else if (userData.activityLevel === 'high') {
    activityMultiplier = 1.725;
  }

  // Calculate TDEE (Total Daily Energy Expenditure)
  let tdee = bmr * activityMultiplier;

  // Adjust based on target
  if (userData.target === 'lose_weight') {
    return Math.round(tdee - 500); // 500 calorie deficit for weight loss
  } else if (userData.target === 'gain_weight') {
    return Math.round(tdee + 500); // 500 calorie surplus for weight gain
  } else {
    return Math.round(tdee); // Maintain weight
  }
};

// Define the context type
interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  updateUserData: (data: Partial<UserData>) => void;
  calorieGoal: number;
  isProfileComplete: boolean;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({});
  const [isLoading, setIsLoading] = useState(true);
  const { databaseService, isLoading: isDatabaseLoading } = useDatabase();

  // Load user data from database on initialization
  useEffect(() => {
    if (databaseService && !isDatabaseLoading) {
      const user = databaseService.getUser();
      if (user) {
        // Convert Realm object to plain object
        const userDataFromDb: UserData = {
          _id: user._id,
          name: user.name,
          target: user.target,
          age: user.age,
          gender: user.gender,
          weight: user.weight,
          height: user.height,
          activityLevel: user.activityLevel,
          dietaryPreference: user.dietaryPreference,
        };
        setUserData(userDataFromDb);
      }
      setIsLoading(false);
    }
  }, [databaseService, isDatabaseLoading]);

  // Function to update user data
  const updateUserData = (data: Partial<UserData>) => {
    if (databaseService) {
      // Update in database
      if (userData._id) {
        // User exists, update it
        databaseService.updateUser(data);
      } else {
        // User doesn't exist, create it
        const newUser = databaseService.createUser(data);
        data._id = newUser._id; // Add the ID to the data
      }
    }

    // Update in state
    setUserData(prevData => ({ ...prevData, ...data }));
  };

  // Calculate calorie goal
  const calorieGoal = calculateCalorieGoal(userData);

  // Check if profile is complete
  const isProfileComplete = Boolean(
    userData.name &&
    userData.target &&
    userData.age &&
    userData.gender &&
    userData.weight &&
    userData.height &&
    userData.activityLevel
  );

  // If still loading, you might want to show a loading indicator
  if (isLoading || isDatabaseLoading) {
    // You could return a loading component here if needed
    // For now, we'll just render children to avoid UI disruption
  }

  return (
    <UserContext.Provider value={{ userData, setUserData, updateUserData, calorieGoal, isProfileComplete }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
