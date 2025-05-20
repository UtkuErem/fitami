import { StyleSheet } from 'react-native';
import { atoms, organisms } from '../../../theme';

const { colors, typography, spacing } = atoms;

export const styles = StyleSheet.create({
  container: {
    ...organisms.screens.container.base,
  },
  scrollContent: {
    flexGrow: 1,
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
    marginBottom: spacing.spacing.lg,
    textAlign: 'center',
    paddingHorizontal: spacing.padding.screen.horizontal,
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.spacing.lg,
  },
  dietaryCard: {
    width: '90%',
    marginBottom: spacing.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.padding.card.horizontal,
  },
  dietaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.spacing.md,
  },
  dietaryTextContainer: {
    flex: 1,
  },
  dietaryTitle: {
    ...typography.variant.subtitle1,
    color: colors.text.primary,
    marginBottom: spacing.spacing.xxs,
  },
  dietaryDescription: {
    ...typography.variant.body2,
    color: colors.text.secondary,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.padding.screen.horizontal,
  },
  backButton: {
    // Button component will handle most of the styling
  },
  skipButton: {
    // Button component will handle most of the styling
  },
});

export default styles;
