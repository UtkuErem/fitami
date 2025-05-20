import { StyleSheet } from 'react-native';
import { atoms, organisms } from '../../../theme';

const { colors, typography, spacing } = atoms;

const styles = StyleSheet.create({
  container: {
    ...organisms.screens.container.base,
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
  },
  iconPlaceholder: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.neutral.white,
  },
});

export default styles;
