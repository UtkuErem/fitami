// Define card styles
// Following atomic design principles

import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../atoms';

// Base card styles
const baseCard = {
  borderRadius: spacing.borderRadius.md,
  backgroundColor: colors.background.paper,
  padding: spacing.padding.card.horizontal,
  shadowColor: colors.neutral.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
};

// Card variants
export const cardVariants = StyleSheet.create({
  // Default card
  default: {
    ...baseCard,
  },

  // Elevated card with more prominent shadow
  elevated: {
    ...baseCard,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  // Outlined card with border instead of shadow
  outlined: {
    ...baseCard,
    backgroundColor: colors.background.default,
    borderWidth: 1,
    borderColor: colors.border.main,
    shadowOpacity: 0,
    elevation: 0,
  },

  // Fitness themed card
  fitness: {
    ...baseCard,
    backgroundColor: colors.background.fitness,
  },

  // Nutrition themed card
  nutrition: {
    ...baseCard,
    backgroundColor: colors.background.nutrition,
  },

  // Mental health themed card
  mental: {
    ...baseCard,
    backgroundColor: colors.background.mental,
  },
});

// Card content styles
export const cardContent = StyleSheet.create({
  // Card title
  title: {
    ...typography.variant.h3,
    marginBottom: spacing.spacing.xs,
  },

  // Card subtitle
  subtitle: {
    ...typography.variant.subtitle2,
    color: colors.text.secondary,
    marginBottom: spacing.spacing.sm,
  },

  // Card body text
  body: {
    ...typography.variant.body1,
    color: colors.text.primary,
  },

  // Card section
  section: {
    marginBottom: spacing.spacing.md,
  },

  // Card footer
  footer: {
    marginTop: spacing.spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default {
  variants: cardVariants,
  content: cardContent,
};
