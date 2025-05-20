import { Realm } from 'realm';
import { FitnessTarget, Gender, ActivityLevel, DietaryPreference } from '../../context/UserContext';
import { MealType } from '../../constants/mealTypes';

// Define the User schema for Realm
export class User extends Realm.Object<User> {
  _id!: Realm.BSON.ObjectId;
  name?: string;
  target?: FitnessTarget;
  age?: number;
  gender?: Gender;
  weight?: number;
  height?: number;
  activityLevel?: ActivityLevel;
  dietaryPreference?: DietaryPreference;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string?',
      target: 'string?',
      age: 'int?',
      gender: 'string?',
      weight: 'double?',
      height: 'double?',
      activityLevel: 'string?',
      dietaryPreference: 'string?',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}

// Define the Workout schema for Realm
export class Workout extends Realm.Object<Workout> {
  _id!: Realm.BSON.ObjectId;
  type!: string;
  duration!: number; // in minutes
  caloriesBurned!: number;
  date!: Date;
  notes?: string;

  static schema: Realm.ObjectSchema = {
    name: 'Workout',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      type: 'string',
      duration: 'int',
      caloriesBurned: 'int',
      date: 'date',
      notes: 'string?',
    },
  };
}

// Define the Meal schema for Realm
export class Meal extends Realm.Object<Meal> {
  _id!: Realm.BSON.ObjectId;
  key!: string; // Use key instead of name
  calories!: number;
  protein?: number; // in grams
  carbs?: number; // in grams
  fat?: number; // in grams
  date!: Date;
  mealType!: MealType;

  static schema: Realm.ObjectSchema = {
    name: 'Meal',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      key: 'string',
      calories: 'int',
      protein: 'double?',
      carbs: 'double?',
      fat: 'double?',
      date: 'date',
      mealType: 'string',
    },
  };
}

// Export all schemas
export const schemas = [User, Workout, Meal];
