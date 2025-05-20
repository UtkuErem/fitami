// Define modal styles
// Following atomic design principles

import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../atoms';

// Base modal styles - Modern, minimal design
const baseModal = {
  backgroundColor: colors.background.modal,
  borderRadius: spacing.borderRadius.lg,
  padding: spacing.padding.card.horizontal,
  shadowColor: colors.neutral.black,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 4,
  width: '90%',
  maxWidth: 400,
  alignSelf: 'center',
  borderWidth: 1,
  borderColor: colors.border.light,
};

// Modal overlay styles - Subtle backdrop
export const overlay = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Slightly more transparent for a lighter feel
  },
  transparent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

// Modal variants - More distinct styles for different purposes
export const modalVariants = StyleSheet.create({
  // Default modal
  default: {
    ...baseModal,
  },

  // Alert modal - Slightly different styling for alerts
  alert: {
    ...baseModal,
    borderLeftWidth: 4,
    borderLeftColor: colors.semantic.warning,
    padding: spacing.padding.card.horizontal,
  },

  // Confirmation modal - Success-oriented styling
  confirmation: {
    ...baseModal,
    borderLeftWidth: 4,
    borderLeftColor: colors.semantic.success,
    padding: spacing.padding.card.horizontal,
  },

  // Form modal - Slightly larger for forms
  form: {
    ...baseModal,
    padding: spacing.padding.card.horizontal,
    maxWidth: 450, // Slightly wider for forms
  },
});

// Modal header styles - Modern, clean headers
export const modalHeader = StyleSheet.create({
  default: {
    marginBottom: spacing.spacing.md,
    paddingBottom: spacing.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    ...typography.variant.h6,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
});

// Modal content styles - Comfortable spacing and readability
export const modalContent = StyleSheet.create({
  default: {
    marginVertical: spacing.spacing.md,
    paddingHorizontal: spacing.spacing.sm,
  },
  text: {
    ...typography.variant.body1,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.comfortable,
  },
});

// Modal footer styles
export const modalFooter = StyleSheet.create({
  default: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.spacing.md,
  },
  singleButton: {
    justifyContent: 'center',
  },
});

export default {
  overlay,
  variants: modalVariants,
  header: modalHeader,
  content: modalContent,
  footer: modalFooter,
};
