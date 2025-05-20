import { StyleSheet } from 'react-native';
import { atoms } from '../../../theme';

const { colors, typography, spacing } = atoms;

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  illustrationContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.variant.h2,
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.variant.body1,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: spacing.padding.screen.horizontal,
  },
});

export default styles;
