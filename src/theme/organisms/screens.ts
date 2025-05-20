// Define screen styles
// Following atomic design principles

import { StyleSheet } from 'react-native';
import { colors, spacing } from '../atoms';
import { cards } from '../molecules';

// Screen container styles
export const container = StyleSheet.create({
  // Base screen container
  base: {
    flex: 1,
    backgroundColor: colors.background.default,
  },

  // Screen with padding
  padded: {
    flex: 1,
    backgroundColor: colors.background.default,
    paddingHorizontal: spacing.padding.screen.horizontal,
    paddingVertical: spacing.padding.screen.vertical,
  },

  // Screen with scrollable content
  scroll: {
    flexGrow: 1,
    backgroundColor: colors.background.default,
  },

  // Centered content
  centered: {
    flex: 1,
    backgroundColor: colors.background.default,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.padding.screen.horizontal,
  },

  // Fitness themed screen
  fitness: {
    flex: 1,
    backgroundColor: colors.background.fitness,
  },

  // Nutrition themed screen
  nutrition: {
    flex: 1,
    backgroundColor: colors.background.nutrition,
  },

  // Mental health themed screen
  mental: {
    flex: 1,
    backgroundColor: colors.background.mental,
  },
});

// Screen section styles
export const section = StyleSheet.create({
  // Base section
  base: {
    marginBottom: spacing.margin.section.vertical,
  },

  // Card section
  card: {
    ...cards.variants.default,
    marginBottom: spacing.margin.section.vertical,
  },

  // Elevated card section
  elevatedCard: {
    ...cards.variants.elevated,
    marginBottom: spacing.margin.section.vertical,
  },

  // Outlined card section
  outlinedCard: {
    ...cards.variants.outlined,
    marginBottom: spacing.margin.section.vertical,
  },
});

// Header styles
export const header = StyleSheet.create({
  // Base header
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.padding.screen.horizontal,
    paddingVertical: spacing.spacing.md,
    backgroundColor: colors.background.default,
  },

  // Header with shadow
  elevated: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.padding.screen.horizontal,
    paddingVertical: spacing.spacing.md,
    backgroundColor: colors.background.default,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

// Footer styles
export const footer = StyleSheet.create({
  // Base footer
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.padding.screen.horizontal,
    paddingVertical: spacing.spacing.md,
    backgroundColor: colors.background.default,
  },

  // Footer with shadow
  elevated: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.padding.screen.horizontal,
    paddingVertical: spacing.spacing.md,
    backgroundColor: colors.background.default,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default {
  container,
  section,
  header,
  footer,
};
