import React, { createContext, useContext, useState, useEffect } from 'react';

// Define notification types
export type NotificationType = 'mealReminder' | 'workoutReminder' | 'waterReminder' | 'weightReminder';

// Define notification settings
export interface NotificationSettings {
  enabled: boolean;
  mealReminder: boolean;
  workoutReminder: boolean;
  waterReminder: boolean;
  weightReminder: boolean;
  reminderTime: {
    hour: number;
    minute: number;
  };
}

// Define the context shape
interface NotificationContextType {
  settings: NotificationSettings;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  toggleNotificationType: (type: NotificationType) => void;
  toggleAllNotifications: () => void;
  setReminderTime: (hour: number, minute: number) => void;
}

// Create the context with a default value
const NotificationContext = createContext<NotificationContextType>({
  settings: {
    enabled: false,
    mealReminder: true,
    workoutReminder: true,
    waterReminder: true,
    weightReminder: true,
    reminderTime: {
      hour: 9,
      minute: 0,
    },
  },
  updateSettings: () => {},
  toggleNotificationType: () => {},
  toggleAllNotifications: () => {},
  setReminderTime: () => {},
});

// Custom hook to use the notification context
export const useNotifications = () => useContext(NotificationContext);

// Notification provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for notification settings
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    mealReminder: true,
    workoutReminder: true,
    waterReminder: true,
    weightReminder: true,
    reminderTime: {
      hour: 9,
      minute: 0,
    },
  });

  // Update notification settings
  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  // Toggle a specific notification type
  const toggleNotificationType = (type: NotificationType) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [type]: !prevSettings[type],
    }));
  };

  // Toggle all notifications
  const toggleAllNotifications = () => {
    setSettings(prevSettings => ({
      ...prevSettings,
      enabled: !prevSettings.enabled,
    }));
  };

  // Set reminder time
  const setReminderTime = (hour: number, minute: number) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      reminderTime: {
        hour,
        minute,
      },
    }));
  };

  // Apply notification settings when they change
  useEffect(() => {
    // Here you would implement the actual notification scheduling
    // based on the current settings

    // For example:
    if (settings.enabled) {
      console.log('Notifications enabled with settings:', settings);
      // Schedule notifications based on settings
    } else {
      console.log('Notifications disabled');
      // Cancel all scheduled notifications
    }
  }, [settings]);

  // Provide the notification context to the app
  return (
    <NotificationContext.Provider
      value={{
        settings,
        updateSettings,
        toggleNotificationType,
        toggleAllNotifications,
        setReminderTime,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
