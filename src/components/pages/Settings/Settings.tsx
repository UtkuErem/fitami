import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../context/ThemeContext';
import { useNotifications, NotificationType } from '../../../context/NotificationContext';
import { atoms } from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Modal } from '../../organisms';

const { colors } = atoms;

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleDarkMode, themeMode, setThemeMode } = useTheme();
  const { settings: notificationSettings, toggleAllNotifications, toggleNotificationType } = useNotifications();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Available languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' }
  ];

  // Current language
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Change language
  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setShowLanguageModal(false);
  };

  // Theme mode options
  const themeOptions = [
    { value: 'light', label: t('lightMode') },
    { value: 'dark', label: t('darkMode') },
    { value: 'system', label: t('systemDefault') }
  ];

  // Get current theme mode label
  const getCurrentThemeLabel = () => {
    const option = themeOptions.find(opt => opt.value === themeMode);
    return option ? option.label : themeOptions[2].label; // Default to system
  };

  // Change theme mode
  const changeThemeMode = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    setShowThemeModal(false);
  };

  // Format time for display
  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
  };

  // Render a setting item with a switch
  const renderSwitchSetting = (
    icon: string,
    title: string,
    value: boolean,
    onToggle: () => void
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Icon name={icon} size={24} color={colors.primary.main} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border.main, true: colors.primary.light }}
        thumbColor={value ? colors.primary.main : colors.neutral.light}
      />
    </View>
  );

  // Render a setting item with a chevron
  const renderChevronSetting = (
    icon: string,
    title: string,
    subtitle: string,
    onPress: () => void
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingInfo}>
        <Icon name={icon} size={24} color={colors.primary.main} />
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Icon name="chevron-right" size={24} color={colors.text.secondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>
            <Text style={styles.emoji}>⚙️ </Text>
            {t('settings')}
          </Text>
        </View>

        {/* Settings Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('appearance')}</Text>

          {renderChevronSetting(
            'palette',
            t('theme'),
            getCurrentThemeLabel(),
            () => setShowThemeModal(true)
          )}

          {renderChevronSetting(
            'language',
            t('language'),
            currentLanguage.name,
            () => setShowLanguageModal(true)
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('notifications')}</Text>

          {renderSwitchSetting(
            'notifications',
            t('enableNotifications'),
            notificationSettings.enabled,
            toggleAllNotifications
          )}

          {notificationSettings.enabled && (
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => setShowNotificationModal(true)}
            >
              <View style={styles.settingInfo}>
                <Icon name="notifications-active" size={24} color={colors.primary.main} />
                <View>
                  <Text style={styles.settingTitle}>{t('notificationPreferences')}</Text>
                  <Text style={styles.settingSubtitle}>
                    {t('reminderTime')}: {formatTime(
                      notificationSettings.reminderTime.hour,
                      notificationSettings.reminderTime.minute
                    )}
                  </Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color={colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('account')}</Text>

          <TouchableOpacity style={styles.dangerButton}>
            <Icon name="logout" size={20} color={colors.semantic.error} />
            <Text style={styles.dangerButtonText}>{t('logout')}</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Fitami v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2023 Fitami Team</Text>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        title={`${t('selectLanguage')} 🌐`}
        variant="form"
      >
        <View style={styles.languageContainer}>
          {languages.map(language => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageOption,
                language.code === currentLanguage.code && styles.languageOptionActive
              ]}
              onPress={() => changeLanguage(language.code)}
            >
              <Text
                style={[
                  styles.languageText,
                  language.code === currentLanguage.code && styles.languageTextActive
                ]}
              >
                {language.name}
              </Text>

              {language.code === currentLanguage.code && (
                <Icon name="check" size={20} color={colors.primary.contrast} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Theme Selection Modal */}
      <Modal
        visible={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        title={`${t('theme')} 🎨`}
        variant="form"
      >
        <View style={styles.languageContainer}>
          {themeOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.languageOption,
                option.value === themeMode && styles.languageOptionActive
              ]}
              onPress={() => changeThemeMode(option.value as 'light' | 'dark' | 'system')}
            >
              <Text
                style={[
                  styles.languageText,
                  option.value === themeMode && styles.languageTextActive
                ]}
              >
                {option.label}
              </Text>

              {option.value === themeMode && (
                <Icon name="check" size={20} color={colors.primary.contrast} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Notification Preferences Modal */}
      <Modal
        visible={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        title={`${t('notificationPreferences')} 🔔`}
        variant="form"
        primaryButtonText={t('save')}
        primaryButtonAction={() => setShowNotificationModal(false)}
      >
        <View style={styles.notificationContainer}>
          {/* Reminder Types */}
          <Text style={styles.notificationSectionTitle}>{t('reminderTypes')}</Text>

          <View style={styles.notificationOption}>
            <Text style={styles.notificationOptionText}>{t('mealReminders')}</Text>
            <Switch
              value={notificationSettings.mealReminder}
              onValueChange={() => toggleNotificationType('mealReminder')}
              trackColor={{ false: colors.border.main, true: colors.primary.light }}
              thumbColor={notificationSettings.mealReminder ? colors.primary.main : colors.neutral.light}
            />
          </View>

          <View style={styles.notificationOption}>
            <Text style={styles.notificationOptionText}>{t('workoutReminders')}</Text>
            <Switch
              value={notificationSettings.workoutReminder}
              onValueChange={() => toggleNotificationType('workoutReminder')}
              trackColor={{ false: colors.border.main, true: colors.primary.light }}
              thumbColor={notificationSettings.workoutReminder ? colors.primary.main : colors.neutral.light}
            />
          </View>

          <View style={styles.notificationOption}>
            <Text style={styles.notificationOptionText}>{t('waterReminders')}</Text>
            <Switch
              value={notificationSettings.waterReminder}
              onValueChange={() => toggleNotificationType('waterReminder')}
              trackColor={{ false: colors.border.main, true: colors.primary.light }}
              thumbColor={notificationSettings.waterReminder ? colors.primary.main : colors.neutral.light}
            />
          </View>

          <View style={styles.notificationOption}>
            <Text style={styles.notificationOptionText}>{t('weightReminders')}</Text>
            <Switch
              value={notificationSettings.weightReminder}
              onValueChange={() => toggleNotificationType('weightReminder')}
              trackColor={{ false: colors.border.main, true: colors.primary.light }}
              thumbColor={notificationSettings.weightReminder ? colors.primary.main : colors.neutral.light}
            />
          </View>

          {/* Reminder Time */}
          <Text style={[styles.notificationSectionTitle, { marginTop: 24 }]}>{t('reminderTime')}</Text>
          <Text style={styles.notificationDescription}>{t('reminderTimeDescription')}</Text>

          <View style={styles.timeSelector}>
            <Text style={styles.currentTime}>
              {formatTime(notificationSettings.reminderTime.hour, notificationSettings.reminderTime.minute)}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  emoji: {
    fontSize: 22,
  },
  section: {
    marginBottom: 24,
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.secondary,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 16,
  },
  settingSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 16,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  dangerButtonText: {
    color: colors.semantic.error,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  appVersion: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: colors.text.hint,
  },
  languageContainer: {
    padding: 16,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  languageOptionActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  languageText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  languageTextActive: {
    color: colors.primary.contrast,
    fontWeight: 'bold',
  },
  notificationContainer: {
    padding: 16,
  },
  notificationSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  notificationDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  notificationOptionText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  timeSelector: {
    backgroundColor: colors.background.light,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  currentTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary.main,
  },
});

export default Settings;
