// Define navigation styles
// Following atomic design principles

import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../atoms';

// Stack navigator styles
export const stackNavigator = StyleSheet.create({
  // Default header style
  header: {
    backgroundColor: colors.background.default,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Header title
  headerTitle: {
    ...typography.variant.h3,
    color: colors.text.primary,
  },

  // Header back button
  headerBackTitle: {
    ...typography.variant.body1,
    color: colors.primary.main,
  },

  // Card style (screen background)
  card: {
    backgroundColor: colors.background.default,
  },
});

// Tab navigator styles
export const tabNavigator = StyleSheet.create({
  // Tab bar
  tabBar: {
    backgroundColor: colors.background.default,
    borderTopColor: colors.border.light,
    borderTopWidth: 1,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: 60,
    paddingBottom: spacing.spacing.xs,
    paddingTop: spacing.spacing.xxs,
  },

  // Active tab
  tabActive: {
    color: colors.primary.main,
  },

  // Inactive tab
  tabInactive: {
    color: colors.text.secondary,
  },

  // Tab label
  tabLabel: {
    ...typography.variant.caption,
    marginTop: spacing.spacing.xxs,
  },

  // Tab icon
  tabIcon: {
    marginBottom: 0,
  },
});

// Drawer navigator styles
export const drawerNavigator = StyleSheet.create({
  // Drawer content container
  content: {
    flex: 1,
    backgroundColor: colors.background.default,
  },

  // Drawer header
  header: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.padding.screen.horizontal,
    paddingVertical: spacing.spacing.lg,
  },

  // Drawer header title
  headerTitle: {
    ...typography.variant.h3,
    color: colors.primary.contrast,
  },

  // Drawer item
  item: {
    paddingHorizontal: spacing.padding.screen.horizontal,
    paddingVertical: spacing.spacing.md,
  },

  // Active drawer item
  itemActive: {
    backgroundColor: colors.primary.light,
  },

  // Drawer item label
  itemLabel: {
    ...typography.variant.body1,
    color: colors.text.primary,
  },

  // Active drawer item label
  itemLabelActive: {
    color: colors.primary.main,
    ...typography.fontWeight.medium,
  },
});

// Onboarding navigator styles
export const onboardingNavigator = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    paddingTop: spacing.spacing.lg,
  },

  // Dot indicator
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: colors.neutral.light,
  },

  // Active dot indicator
  dotActive: {
    backgroundColor: colors.primary.main,
  },

  // Next button
  nextButton: {
    padding: spacing.spacing.sm,
  },

  // Done button
  doneButton: {
    padding: spacing.spacing.sm,
  },
});

export default {
  stackNavigator,
  tabNavigator,
  drawerNavigator,
  onboardingNavigator,
};
