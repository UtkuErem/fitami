import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { atoms } from '../../../theme';

const { colors } = atoms;

interface DateRangePickerProps {
  onSelectRange: (startDate: Date, endDate: Date) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onSelectRange,
  initialStartDate = new Date(),
  initialEndDate = new Date()
}) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [selectingStart, setSelectingStart] = useState<boolean>(true);

  // Generate calendar for current month
  const generateCalendar = (baseDate: Date) => {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();

    // Get first day of month and total days in month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create array of day objects
    const days = [];

    // Add empty slots for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: 0, date: null });
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ day: i, date });
    }

    return days;
  };

  // Get current month calendar
  const currentDate = new Date();
  const calendar = generateCalendar(currentDate);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if a date is selected
  const isDateSelected = (date: Date | null) => {
    if (!date) return false;

    const dateTime = date.getTime();
    const startDateTime = startDate.getTime();
    const endDateTime = endDate.getTime();

    return dateTime >= startDateTime && dateTime <= endDateTime;
  };

  // Check if a date is the start date
  const isStartDate = (date: Date | null) => {
    if (!date) return false;
    return date.getTime() === startDate.getTime();
  };

  // Check if a date is the end date
  const isEndDate = (date: Date | null) => {
    if (!date) return false;
    return date.getTime() === endDate.getTime();
  };

  // Handle date selection
  const handleDateSelect = (date: Date | null) => {
    if (!date) return;

    if (selectingStart) {
      setStartDate(date);
      setEndDate(date);
      setSelectingStart(false);
    } else {
      // Ensure end date is not before start date
      if (date.getTime() < startDate.getTime()) {
        setStartDate(date);
        setEndDate(startDate);
      } else {
        setEndDate(date);
      }
      setSelectingStart(true);
    }
  };

  // Apply the selected date range
  const applyDateRange = () => {
    onSelectRange(startDate, endDate);
  };

  // Quick select options
  const quickSelectOptions = [
    {
      label: t('today'),
      action: () => {
        const today = new Date();
        setStartDate(today);
        setEndDate(today);
      }
    },
    {
      label: t('yesterday'),
      action: () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        setStartDate(yesterday);
        setEndDate(yesterday);
      }
    },
    {
      label: t('thisWeek'),
      action: () => {
        const today = new Date();
        const firstDayOfWeek = new Date(today);
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
        firstDayOfWeek.setDate(diff);
        setStartDate(firstDayOfWeek);
        setEndDate(today);
      }
    },
    {
      label: t('lastWeek'),
      action: () => {
        const today = new Date();
        const lastWeekEnd = new Date(today);
        lastWeekEnd.setDate(today.getDate() - today.getDay() - (today.getDay() === 0 ? 0 : 7));
        const lastWeekStart = new Date(lastWeekEnd);
        lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
        setStartDate(lastWeekStart);
        setEndDate(lastWeekEnd);
      }
    },
    {
      label: t('thisMonth'),
      action: () => {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setStartDate(firstDayOfMonth);
        setEndDate(today);
      }
    }
  ];

  // Render days of week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      {/* Quick select options */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickSelectContainer}
      >
        {quickSelectOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickSelectButton}
            onPress={option.action}
          >
            <Text style={styles.quickSelectText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Selected date range display */}
      <View style={styles.selectedRangeContainer}>
        <View style={styles.dateBox}>
          <Text style={styles.dateBoxLabel}>{t('startDate')}</Text>
          <Text style={styles.dateBoxValue}>{formatDate(startDate)}</Text>
        </View>

        <Icon name="arrow-forward" size={20} color={colors.text.secondary} />

        <View style={styles.dateBox}>
          <Text style={styles.dateBoxLabel}>{t('endDate')}</Text>
          <Text style={styles.dateBoxValue}>{formatDate(endDate)}</Text>
        </View>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        {/* Days of week header */}
        <View style={styles.daysOfWeekContainer}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.dayOfWeekText}>
              {t(day.toLowerCase())}
            </Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calendarGrid}>
          {calendar.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDay,
                item.day === 0 && styles.emptyDay,
                isDateSelected(item.date) && styles.selectedDay,
                isStartDate(item.date) && styles.startDay,
                isEndDate(item.date) && styles.endDay
              ]}
              onPress={() => handleDateSelect(item.date)}
              disabled={item.day === 0}
            >
              {item.day > 0 && (
                <Text style={[
                  styles.calendarDayText,
                  isDateSelected(item.date) && styles.selectedDayText
                ]}>
                  {item.day}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Apply button */}
      <TouchableOpacity
        style={styles.applyButton}
        onPress={applyDateRange}
      >
        <Text style={styles.applyButtonText}>{t('apply')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  quickSelectContainer: {
    paddingVertical: 8,
  },
  quickSelectButton: {
    backgroundColor: colors.background.paper,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  quickSelectText: {
    color: colors.primary.main,
    fontWeight: '500',
    fontSize: 14,
  },
  selectedRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  dateBox: {
    flex: 1,
  },
  dateBoxLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  dateBoxValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
  },
  calendarContainer: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    overflow: 'hidden',
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background.paper,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  dayOfWeekText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  calendarDay: {
    width: '14.28%', // 7 days per row
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  selectedDay: {
    backgroundColor: colors.primary.light + '40', // 40% opacity
  },
  startDay: {
    backgroundColor: colors.primary.main,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  endDay: {
    backgroundColor: colors.primary.main,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  calendarDayText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  selectedDayText: {
    color: colors.primary.dark,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    color: colors.primary.contrast,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DateRangePicker;
