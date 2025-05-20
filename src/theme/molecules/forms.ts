// Define form styles
// Following atomic design principles

import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../atoms';

// Input styles
export const input = StyleSheet.create({
  // Base input
  base: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border.main,
    borderRadius: spacing.borderRadius.sm,
    paddingHorizontal: spacing.spacing.md,
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    ...typography.variant.body1,
  },

  // Focused input
  focused: {
    borderColor: colors.primary.main,
    borderWidth: 2,
  },

  // Error input
  error: {
    borderColor: colors.semantic.error,
  },

  // Disabled input
  disabled: {
    backgroundColor: colors.neutral.lighter,
    borderColor: colors.border.light,
    color: colors.text.disabled,
  },
});

// Label styles
export const label = StyleSheet.create({
  // Base label
  base: {
    ...typography.variant.subtitle2,
    color: colors.text.primary,
    marginBottom: spacing.spacing.xxs,
  },

  // Error label
  error: {
    color: colors.semantic.error,
  },

  // Required label
  required: {
    color: colors.semantic.error,
    marginLeft: spacing.spacing.xxs,
  },
});

// Helper text styles
export const helperText = StyleSheet.create({
  // Base helper text
  base: {
    ...typography.variant.caption,
    color: colors.text.secondary,
    marginTop: spacing.spacing.xxs,
  },

  // Error helper text
  error: {
    color: colors.semantic.error,
  },
});

// Form group styles
export const formGroup = StyleSheet.create({
  // Base form group
  base: {
    marginBottom: spacing.spacing.md,
  },
});

// Checkbox and radio styles
export const selection = StyleSheet.create({
  // Container for checkbox/radio with label
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing.sm,
  },

  // Checkbox/radio box
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.border.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.spacing.sm,
  },

  // Checkbox (square)
  checkbox: {
    borderRadius: spacing.borderRadius.xs,
  },

  // Radio (round)
  radio: {
    borderRadius: spacing.borderRadius.round,
  },

  // Selected state
  selected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.main,
  },

  // Label for checkbox/radio
  label: {
    ...typography.variant.body2,
    color: colors.text.primary,
  },
});

export default {
  input,
  label,
  helperText,
  formGroup,
  selection,
};
