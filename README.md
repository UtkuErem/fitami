# Fitami

Fitami is a comprehensive fitness and mental health tracking application designed to help users maintain a healthy lifestyle. The app provides features for tracking calories, fitness activities, and mental wellness.

## Features

- **Calorie Tracking**: Monitor your daily calorie intake and achieve your nutrition goals
- **Fitness Workouts**: Access personalized workout plans to help you stay fit and healthy
- **Mental Wellness**: Track your mood and improve your mental health with guided exercises

## Getting Started

### Prerequisites

- Node.js >= 18
- React Native development environment set up

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/fitami.git
cd fitami
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the app
```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android
```

## Project Structure

The project follows a modular structure:

- `src/assets`: Contains all static assets like images, fonts, and icons
- `src/components`: UI components organized using Atomic Design principles
  - `atoms`: Basic building blocks (buttons, inputs, etc.)
  - `molecules`: Combinations of atoms
  - `organisms`: More complex UI components
  - `pages`: Full screens like the onboarding experience
  - `templates`: Layout components
- `src/features`: Feature-specific code
- `src/navigation`: Navigation configuration
- `src/services`: API services and other external integrations
- `src/store`: State management
- `src/theme`: Theme configuration using Atomic Design principles
  - `atoms`: Basic style elements (colors, typography, spacing)
  - `molecules`: Combinations of atoms (buttons, cards, forms)
  - `organisms`: Complex style patterns (screens, navigation)
- `src/utils`: Utility functions

## Styling System

The app uses an Atomic Design approach for styling, which provides a consistent and maintainable design system:

### Atoms
- **Colors**: Color palette including primary, secondary, neutral, and semantic colors
- **Typography**: Font families, sizes, weights, and text variants
- **Spacing**: Consistent spacing units, margins, paddings, and border radiuses

### Molecules
- **Buttons**: Various button styles (primary, secondary, outline, text) with different sizes
- **Cards**: Card variants for different content types and themes
- **Forms**: Input fields, labels, helper texts, and selection controls

### Organisms
- **Screens**: Screen layouts, sections, headers, and footers
- **Navigation**: Styles for stack, tab, drawer, and onboarding navigators

### Usage Example
```tsx
import { atoms, molecules, organisms } from '../theme';

// Using colors
<View style={{ backgroundColor: atoms.colors.background.fitness }}>

// Using typography
<Text style={atoms.typography.variant.h2}>Heading</Text>

// Using button styles
<TouchableOpacity style={molecules.buttons.variants.primary}>
  <Text style={molecules.buttons.variants.primaryText}>Button</Text>
</TouchableOpacity>

// Using screen layouts
<View style={organisms.screens.container.padded}>
  {/* Screen content */}
</View>
```

## Onboarding Experience

The app features a beautiful onboarding experience that introduces users to the main features:

1. Welcome screen with app introduction
2. Calorie tracking feature overview
3. Fitness workout feature overview
4. Mental wellness tracking overview

The onboarding is implemented using the `react-native-onboarding-swiper` package with custom styling and animations.
