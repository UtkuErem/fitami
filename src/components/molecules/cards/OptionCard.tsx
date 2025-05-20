import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { atoms } from '../../../theme';
import { Card } from './';

const { colors, typography, spacing } = atoms;

interface OptionCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  iconBackgroundColor?: string;
  onPress: () => void;
  selected?: boolean;
  style?: ViewStyle;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
  iconBackgroundColor = colors.primary.light + '20',
  onPress,
  selected = false,
  style,
}) => {
  return (
    <Card
      variant="default"
      onPress={onPress}
      selected={selected}
      style={[styles.card, style]}
    >
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
          {icon}
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    marginBottom: spacing.spacing.md,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.spacing.sm,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    ...typography.variant.subtitle1,
    color: colors.text.primary,
    marginBottom: spacing.spacing.xxs,
  },
  description: {
    ...typography.variant.body2,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default OptionCard;
