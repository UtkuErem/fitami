import { StyleSheet, Dimensions, Platform } from 'react-native';
import { atoms } from '../../../theme';

const { colors, typography, spacing } = atoms;
const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: isSmallScreen ? spacing.padding.md : spacing.padding.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 600, // Limit width on larger screens
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: isSmallScreen ? typography.fontSize.lg : typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.spacing.lg,
    textAlign: 'center',
    paddingHorizontal: spacing.spacing.md,
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.spacing.xs,
  },
  formContainer: {
    marginBottom: spacing.spacing.xl,
    width: '100%',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.spacing.md,
    gap: isSmallScreen ? 4 : 8,
    flexWrap: isSmallScreen ? 'wrap' : 'nowrap',
  },
  buttonContainer: {
    marginTop: spacing.spacing.lg,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: isSmallScreen ? spacing.spacing.md : spacing.spacing.lg,
  },
  errorText: {
    color: colors.status.error,
    fontSize: typography.fontSize.sm,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default styles;
