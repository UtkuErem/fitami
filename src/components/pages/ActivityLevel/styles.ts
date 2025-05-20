import { StyleSheet } from 'react-native';
import { atoms, organisms } from '../../../theme';

const { colors, typography, spacing } = atoms;

export const styles = StyleSheet.create({
  container: {
    ...organisms.screens.container.base,
    backgroundColor: colors.background.fitness,
  },
  content: {
    flex: 1,
    padding: spacing.padding.screen.horizontal,
    justifyContent: 'center',
  },
  title: {
    ...typography.variant.h2,
    color: colors.text.primary,
    marginBottom: spacing.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.variant.body1,
    color: colors.text.secondary,
    marginBottom: spacing.spacing.xl,
    textAlign: 'center',
    paddingHorizontal: spacing.padding.screen.horizontal,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.spacing.lg,
  },
  activityCard: {
    width: '90%',
    marginBottom: spacing.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.padding.card.horizontal,
  },
  activityIconContainer: {
    marginRight: spacing.spacing.md,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.semantic.success + '10', // Very light green
  },
  activityIcon: {
    // Icon styling is handled inline
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    ...typography.variant.subtitle1,
    color: colors.text.primary,
    marginBottom: spacing.spacing.xxs,
  },
  activityDescription: {
    ...typography.variant.body2,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.sm,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.spacing.sm,
  },
  backButton: {
    // Button component will handle most of the styling
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    ...typography.variant.button,
    color: colors.text.secondary,
  },
});

export default styles;
