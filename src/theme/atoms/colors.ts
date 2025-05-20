// Define color palette for the application
// Following atomic design principles

// Primary colors - Peaceful blue/teal for a calm, confident feel
export const primary = {
  main: '#5BBFBA', // Peaceful teal
  light: '#8ED0CB', // Lighter teal
  dark: '#3D9A96', // Darker teal
  contrast: '#FFFFFF',
};

// Secondary colors - Soft, warm accent for comfort
export const secondary = {
  main: '#F8B195', // Soft peach
  light: '#FBC8B5', // Lighter peach
  dark: '#E69878', // Darker peach
  contrast: '#FFFFFF',
};

// Neutral colors
export const neutral = {
  white: '#FFFFFF',
  lightest: '#F5F8FF',
  lighter: '#F0F0F0',
  light: '#E0E0E0',
  medium: '#9E9E9E',
  dark: '#666666',
  darker: '#333333',
  darkest: '#121212',
  black: '#000000',
};

// Semantic colors - Softer, more natural tones
export const semantic = {
  success: '#66BB6A', // Softer green
  info: '#64B5F6', // Softer blue
  warning: '#FFD54F', // Softer yellow
  error: '#EF9A9A', // Softer red
};

// Background colors - Soft, minimal backgrounds for comfort
export const background = {
  default: neutral.white,
  paper: '#F9F9F9', // Softer than pure white for eye comfort
  fitness: '#F0FFF5', // Soft green for fitness
  nutrition: '#F5F8FF', // Soft blue for nutrition
  mental: '#FFF8F5', // Warm tone for mental wellness
  light: neutral.lighter,
  modal: '#FCFCFC', // Slightly off-white for modals
};

// Text colors
export const text = {
  primary: neutral.darker,
  secondary: neutral.dark,
  disabled: neutral.medium,
  hint: neutral.medium,
};

// Border colors
export const border = {
  light: neutral.lighter,
  main: neutral.light,
  dark: neutral.medium,
};

// Status colors
export const status = {
  success: semantic.success,
  info: semantic.info,
  warning: semantic.warning,
  error: semantic.error,
};

// Export all colors
export default {
  primary,
  secondary,
  neutral,
  semantic,
  background,
  text,
  border,
  status,
};
