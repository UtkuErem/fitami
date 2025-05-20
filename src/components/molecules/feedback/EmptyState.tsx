import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { atoms } from '../../../theme';

interface EmptyStateProps {
  iconName: string;
  message: string;
  iconSize?: number;
  iconColor?: string;
}

/**
 * A component to display an empty state with an icon and message
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  iconName,
  message,
  iconSize = 48,
  iconColor = atoms.colors.primary.main,
}) => {
  return (
    <View style={styles.emptyContainer}>
      <Icon
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles.icon}
      />
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: atoms.spacing.spacing.lg,
  },
  icon: {
    marginBottom: atoms.spacing.spacing.md,
  },
  emptyText: {
    ...atoms.typography.variant.body1,
    color: atoms.colors.text.secondary,
    textAlign: 'center',
  },
});

export default EmptyState;
