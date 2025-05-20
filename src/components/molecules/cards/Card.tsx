import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { atoms, molecules } from '../../../theme';

const { colors, spacing } = atoms;
const { cards } = molecules;

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'fitness' | 'nutrition' | 'mental';
  onPress?: () => void;
  style?: ViewStyle;
  selected?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  style,
  selected = false,
}) => {
  const cardStyle = [
    cards.variants[variant],
    selected && styles.selected,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  selected: {
    borderColor: colors.primary.main,
    borderWidth: 2,
    backgroundColor: colors.primary.light + '20', // 20% opacity
  },
});

export default Card;
