import React, { ReactNode } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { atoms } from '../../../theme';

const { colors, typography, spacing } = atoms;

interface InputGroupProps {
  label?: string | ReactNode;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  icon?: ReactNode;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  error?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  icon,
  containerStyle,
  labelStyle,
  inputStyle,
  error,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          {icon}
          {typeof label === 'string' ? (
            <Text style={[styles.label, labelStyle]}>{label}</Text>
          ) : (
            label
          )}
        </View>
      )}
      <TextInput
        style={[styles.input, inputStyle, error && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.secondary}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        textAlignVertical="center"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.spacing.md,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: spacing.spacing.xs,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  input: {
    backgroundColor: colors.background.light,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.padding.input,
    fontSize: 16,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
    minHeight: 48, // Increased height for better visibility in modals
  },
  inputError: {
    borderColor: colors.status.error,
  },
  errorText: {
    color: colors.status.error,
    fontSize: 14,
    marginTop: spacing.spacing.xs,
  },
});

export default InputGroup;
