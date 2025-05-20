// Define spacing for the application
// Following atomic design principles

// Base spacing unit (in pixels)
export const baseUnit = 4;

// Spacing scale
export const spacing = {
  none: 0,
  xxs: baseUnit, // 4
  xs: baseUnit * 2, // 8
  sm: baseUnit * 3, // 12
  md: baseUnit * 4, // 16
  lg: baseUnit * 6, // 24
  xl: baseUnit * 8, // 32
  xxl: baseUnit * 12, // 48
  xxxl: baseUnit * 16, // 64
};

// Padding presets
export const padding = {
  screen: {
    horizontal: spacing.lg,
    vertical: spacing.md,
  },
  card: {
    horizontal: spacing.md,
    vertical: spacing.sm,
  },
  button: {
    horizontal: spacing.lg,
    vertical: spacing.sm,
  },
  input: {
    horizontal: spacing.md,
    vertical: spacing.sm,
  },
};

// Margin presets
export const margin = {
  screen: {
    horizontal: spacing.lg,
    vertical: spacing.md,
  },
  section: {
    horizontal: 0,
    vertical: spacing.lg,
  },
  element: {
    horizontal: 0,
    vertical: spacing.sm,
  },
};

// Border radius
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

// Export all spacing
export default {
  baseUnit,
  spacing,
  padding,
  margin,
  borderRadius,
};
