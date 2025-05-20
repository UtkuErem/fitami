import { Realm } from 'realm';
import { User, Workout, Meal } from './schemas';
import { FitnessTarget, Gender, ActivityLevel, DietaryPreference } from '../../context/UserContext';
import { MealType } from '../../constants/mealTypes';

// Interface for user data input
export interface UserInput {
  name?: string;
  target?: FitnessTarget;
  age?: number;
  gender?: Gender;
  weight?: number;
  height?: number;
  activityLevel?: ActivityLevel;
  dietaryPreference?: DietaryPreference;
}

// Interface for workout data input
export interface WorkoutInput {
  type: string;
  duration: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}

// Interface for meal data input
export interface MealInput {
  key: string; // Use key for quick select and translation
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  date: Date;
  mealType: MealType;
}

export class DatabaseService {
  private realm: Realm;

  constructor(realm: Realm) {
    this.realm = realm;
  }

  // User CRUD operations
  getUser(): User | null {
    // Since we're only storing one user in this app, we'll just get the first one
    const users = this.realm.objects<User>('User');
    return users.length > 0 ? users[0] : null;
  }

  createUser(userData: UserInput): User {
    let user: User;

    this.realm.write(() => {
      user = this.realm.create<User>('User', {
        _id: new Realm.BSON.ObjectId(),
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return user!;
  }

  updateUser(userData: Partial<UserInput>): User | null {
    const user = this.getUser();

    if (!user) {
      return null;
    }

    this.realm.write(() => {
      Object.assign(user, {
        ...userData,
        updatedAt: new Date(),
      });
    });

    return user;
  }

  deleteUser(): boolean {
    const user = this.getUser();

    if (!user) {
      return false;
    }

    this.realm.write(() => {
      this.realm.delete(user);
    });

    return true;
  }

  // Workout CRUD operations
  getWorkouts(): Realm.Results<Workout> {
    return this.realm.objects<Workout>('Workout').sorted('date', true);
  }

  getWorkoutById(id: Realm.BSON.ObjectId): Workout | null {
    return this.realm.objectForPrimaryKey<Workout>('Workout', id);
  }

  createWorkout(workoutData: WorkoutInput): Workout {
    let workout: Workout;

    this.realm.write(() => {
      workout = this.realm.create<Workout>('Workout', {
        _id: new Realm.BSON.ObjectId(),
        ...workoutData,
      });
    });

    return workout!;
  }

  updateWorkout(id: Realm.BSON.ObjectId, workoutData: Partial<WorkoutInput>): Workout | null {
    const workout = this.getWorkoutById(id);

    if (!workout) {
      return null;
    }

    this.realm.write(() => {
      Object.assign(workout, workoutData);
    });

    return workout;
  }

  deleteWorkout(id: Realm.BSON.ObjectId): boolean {
    const workout = this.getWorkoutById(id);

    if (!workout) {
      return false;
    }

    this.realm.write(() => {
      this.realm.delete(workout);
    });

    return true;
  }

  // Meal CRUD operations
  getTodayMeals(): Realm.Results<Meal> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return this.realm
      .objects<Meal>('Meal')
      .filtered('date >= $0 && date < $1', today, tomorrow)
      .sorted('date', true);
  }

  getMealsByDateRange(startDate: Date, endDate: Date): Realm.Results<Meal> {
    // Normalize dates to start and end of day
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    return this.realm
      .objects<Meal>('Meal')
      .filtered('date >= $0 && date <= $1', start, end)
      .sorted('date', true);
  }

  getMealById(id: Realm.BSON.ObjectId): Meal | null {
    return this.realm.objectForPrimaryKey<Meal>('Meal', id);
  }

  createMeal(mealData: MealInput): Meal {
    let meal: Meal;

    this.realm.write(() => {
      meal = this.realm.create<Meal>('Meal', {
        _id: new Realm.BSON.ObjectId(),
        ...mealData,
      });
    });

    return meal!;
  }

  updateMeal(id: Realm.BSON.ObjectId, mealData: Partial<MealInput>): Meal | null {
    const meal = this.getMealById(id);

    if (!meal) {
      return null;
    }

    this.realm.write(() => {
      Object.assign(meal, mealData);
    });

    return meal;
  }

  deleteMeal(id: Realm.BSON.ObjectId): boolean {
    const meal = this.getMealById(id);

    if (!meal) {
      return false;
    }

    this.realm.write(() => {
      this.realm.delete(meal);
    });

    return true;
  }
}
