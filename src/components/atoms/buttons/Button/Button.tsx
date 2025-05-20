import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { atoms, molecules } from '../../../../theme';

const { colors, typography, spacing } = atoms;
const { buttons } = molecules;

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonVariant = disabled ? 'disabled' : variant;
  const buttonSize = size;

  const buttonStyle = [
    buttons.variants[buttonVariant],
    buttons.sizes[buttonSize],
    style,
  ];

  const textStyleArray = [
    buttons.variants[`${buttonVariant}Text`],
    buttons.sizes[`${buttonSize}Text`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {typeof children === 'string' ? (
        <Text style={textStyleArray}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;

