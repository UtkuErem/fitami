import React, { ReactNode } from 'react';
import {
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  TextStyle
} from 'react-native';
import { organisms } from '../../theme';
import { Button } from '../atoms/buttons';

const { modals } = organisms;

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  variant?: 'default' | 'alert' | 'confirmation' | 'form';
  overlayType?: 'default' | 'transparent';
  closeOnOverlayPress?: boolean;
  headerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  footerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  footer?: ReactNode;
  primaryButtonText?: string;
  primaryButtonAction?: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  icon?: string; // Emoji icon to display in the header
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  variant = 'default',
  overlayType = 'default',
  closeOnOverlayPress = true,
  headerStyle,
  contentStyle,
  footerStyle,
  titleStyle,
  footer,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
  icon
}) => {
  // Default icons for each variant if no custom icon is provided
  const getDefaultIcon = () => {
    if (icon) return icon;

    switch (variant) {
      case 'alert':
        return '⚠️';
      case 'confirmation':
        return '✅';
      case 'form':
        return '📝';
      default:
        return '💬';
    }
  };

  const modalIcon = getDefaultIcon();
  const handleOverlayPress = () => {
    if (closeOnOverlayPress) {
      onClose();
    }
  };

  // Generate default footer with buttons if not provided
  const renderFooter = () => {
    if (footer) {
      return footer;
    }

    if (primaryButtonText || secondaryButtonText) {
      return (
        <View style={styles.buttonsContainer}>
          {secondaryButtonText && (
            <Button
              variant="outline"
              onPress={secondaryButtonAction || onClose}
              style={styles.secondaryButton}
            >
              {secondaryButtonText}
            </Button>
          )}
          {primaryButtonText && (
            <Button
              variant="primary"
              onPress={primaryButtonAction || onClose}
              style={styles.primaryButton}
            >
              {primaryButtonText}
            </Button>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={modals.overlay[overlayType]}>
          <TouchableWithoutFeedback>
            <View style={modals.variants[variant]}>
              {title && (
                <View style={[modals.header.default, headerStyle]}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.icon}>{modalIcon}</Text>
                    <Text style={[modals.header.title, titleStyle]}>{title}</Text>
                  </View>
                </View>
              )}

              <View style={[modals.content.default, contentStyle]}>
                {children}
              </View>

              {(footer || primaryButtonText || secondaryButtonText) && (
                <View style={[modals.footer.default, footerStyle]}>
                  {renderFooter()}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  primaryButton: {
    flex: 1,
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
});

export default Modal;
