import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { atoms } from '../../../../theme';

const { colors } = atoms;

interface TabItem {
  key: string;
  label: string;
  icon: string;
  component: React.ComponentType<any>;
}

interface TabNavigatorProps {
  tabs: TabItem[];
  initialTab?: string;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ tabs, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0].key);

  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component || tabs[0].component;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ActiveComponent />
      </View>

      <View style={styles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Icon
              name={tab.icon}
              size={24}
              color={activeTab === tab.key ? colors.primary.main : colors.text.secondary}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.key && styles.activeTabLabel
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.background.paper,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: colors.primary.main,
  },
  tabLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  activeTabLabel: {
    color: colors.primary.main,
    fontWeight: 'bold',
  },
});

export default TabNavigator;
