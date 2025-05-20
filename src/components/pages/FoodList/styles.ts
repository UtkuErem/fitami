import { StyleSheet } from 'react-native';
import { atoms } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: atoms.colors.background.paper,
  },
  title: {
    ...atoms.typography.variant.h2,
    padding: atoms.spacing.spacing.md,
    textAlign: 'center',
    color: atoms.colors.text.primary,
  },
  listContent: {
    padding: atoms.spacing.spacing.md,
  },
});

export default styles;
