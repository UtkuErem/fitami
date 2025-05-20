/**
 * Fitami App
 * A fitness and mental health tracking application
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { UserProvider } from './src/context/UserContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { AppNavigator } from './src/navigation/NavigationContainer';
// Import i18n configuration
import './src/i18n';
// Import database providers
import { RealmProvider } from './src/services/database/config';
import { DatabaseProvider } from './src/services/database/DatabaseContext';

// StatusBar manager component that uses the theme context
const StatusBarManager = () => {
  const { isDarkMode } = useTheme();

  return (
    <StatusBar
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      backgroundColor={isDarkMode ? '#121212' : '#FFFFFF'}
    />
  );
};

function App(): React.JSX.Element {
  return (
    <RealmProvider>
      <DatabaseProvider>
        <UserProvider>
          <ThemeProvider>
            <NotificationProvider>
              <StatusBarManager />
              <AppNavigator />
            </NotificationProvider>
          </ThemeProvider>
        </UserProvider>
      </DatabaseProvider>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
