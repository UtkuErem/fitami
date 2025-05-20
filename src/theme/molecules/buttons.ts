// Define button styles
// Following atomic design principles

import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../atoms';

// Base button styles
const baseButton = {
  borderRadius: spacing.borderRadius.md,
  paddingHorizontal: spacing.padding.button.horizontal,
  paddingVertical: spacing.padding.button.vertical,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
};

// Base button text styles
const baseButtonText = {
  ...typography.variant.button,
};

// Button variants
export const buttonVariants = StyleSheet.create({
  // Primary button
  primary: {
    ...baseButton,
    backgroundColor: colors.primary.main,
  },
  primaryText: {
    ...baseButtonText,
    color: colors.primary.contrast,
  },

  // Secondary button
  secondary: {
    ...baseButton,
    backgroundColor: colors.secondary.main,
  },
  secondaryText: {
    ...baseButtonText,
    color: colors.secondary.contrast,
  },

  // Outline button
  outline: {
    ...baseButton,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  outlineText: {
    ...baseButtonText,
    color: colors.primary.main,
  },

  // Text button (no background)
  text: {
    ...baseButton,
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.spacing.xs,
    paddingVertical: spacing.spacing.xxs,
  },
  textText: {
    ...baseButtonText,
    color: colors.primary.main,
  },

  // Disabled button
  disabled: {
    ...baseButton,
    backgroundColor: colors.neutral.light,
  },
  disabledText: {
    ...baseButtonText,
    color: colors.neutral.medium,
  },
});

// Button sizes
export const buttonSizes = StyleSheet.create({
  small: {
    paddingHorizontal: spacing.spacing.md,
    paddingVertical: spacing.spacing.xs,
    borderRadius: spacing.borderRadius.sm,
  },
  smallText: {
    fontSize: typography.fontSize.sm,
  },

  medium: {
    // Default size is already defined in baseButton
  },
  mediumText: {
    // Default size is already defined in baseButtonText
  },

  large: {
    paddingHorizontal: spacing.spacing.xl,
    paddingVertical: spacing.spacing.md,
    borderRadius: spacing.borderRadius.lg,
  },
  largeText: {
    fontSize: typography.fontSize.lg,
  },
});

export default {
  variants: buttonVariants,
  sizes: buttonSizes,
};
