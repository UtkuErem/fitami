# Fitami Database Implementation

This directory contains the implementation of the Realm database for the Fitami application.

## Overview

The database implementation uses [Realm](https://realm.io/), an open-source mobile database that provides a simple and efficient way to store and query data on mobile devices. Realm is a NoSQL database that stores data in objects, making it a good fit for React Native applications.

## Files

- `config.ts`: Configuration for the Realm database and exports for the RealmProvider and hooks.
- `schemas.ts`: Defines the database schemas (User, Workout, Meal).
- `databaseService.ts`: Provides CRUD operations for the database entities.
- `DatabaseContext.tsx`: React context provider for the database service.
- `index.ts`: Exports all database-related modules.

## Usage

### Setting up the database

The database is automatically set up when the application starts. The `RealmProvider` and `DatabaseProvider` components in `App.tsx` initialize the database and make it available to the rest of the application.

### Accessing the database

You can access the database service using the `useDatabase` hook:

```typescript
import { useDatabase } from '../services/database';

function MyComponent() {
  const { databaseService, isLoading } = useDatabase();

  // Use databaseService to interact with the database
  // Check isLoading to ensure the database is ready
}
```

### User data

User data is managed through the `UserContext`, which has been updated to use the database service for persistence. The `updateUserData` function in `UserContext` automatically saves changes to the database.

### Working with other entities

For Workout and Meal entities, you can use the database service directly:

```typescript
// Create a workout
const workout = databaseService.createWorkout({
  type: 'Running',
  duration: 30,
  caloriesBurned: 300,
  date: new Date(),
});

// Get all workouts
const workouts = databaseService.getWorkouts();

// Create a meal
const meal = databaseService.createMeal({
  name: 'Breakfast',
  calories: 500,
  protein: 20,
  carbs: 60,
  fat: 15,
  date: new Date(),
  mealType: 'breakfast',
});

// Get all meals
const meals = databaseService.getMeals();
```

## Schema Migrations

If you need to update the database schema, you should:

1. Update the schema definitions in `schemas.ts`
2. Increment the `schemaVersion` in `config.ts`
3. Add migration logic if needed

## Resources

- [Realm Documentation](https://www.mongodb.com/docs/realm/sdk/react-native/)
- [Realm React Documentation](https://www.mongodb.com/docs/realm/sdk/react-native/react-components/)
