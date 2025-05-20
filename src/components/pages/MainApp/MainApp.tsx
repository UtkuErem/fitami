import React from 'react';
import { useTranslation } from 'react-i18next';
import { TabNavigator } from '../../organisms/navigation';
import {Meals, UserDashboard} from '../';
import Workouts from '../Workouts';
import Profile from '../Profile';
import {Settings} from '../Settings';

const MainApp: React.FC = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      key: 'dashboard',
      label: t('dashboard'),
      icon: 'dashboard',
      component: UserDashboard
    },
    {
      key: 'meals',
      label: t('meals'),
      icon: 'restaurant',
      component: Meals
    },
    {
      key: 'workouts',
      label: t('workouts'),
      icon: 'fitness-center',
      component: Workouts
    },
    {
      key: 'profile',
      label: t('profile'),
      icon: 'person',
      component: Profile
    },
    {
      key: 'settings',
      label: t('settings'),
      icon: 'settings',
      component: Settings
    }
  ];

  return (
    <TabNavigator tabs={tabs} initialTab="dashboard" />
  );
};

export default MainApp;
