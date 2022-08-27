import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const Calendar = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const [dayActive, setDayActive] = React.useState(new Date());
  const generateMatrix = () => {
    let matrix = [];
    matrix[0] = weeks;
    const year = dayActive.getFullYear();
    const month = dayActive.getMonth();
    const day = new Date(year, month, 1).getDay();
    let maxDays = nDays[month];
    if (month === 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }
    let counter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row === 1 && col >= day) {
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          matrix[row].col = counter++;
        }
      }
    }
    return matrix;
  };
  let matrix = generateMatrix();
  let rows = [];
  rows = matrix.map((row, rowIndex) => {
    let rowItems = row.map((item, colIndex) => {
      return (
        <TouchableOpacity
          key={colIndex}
          onPress={item => {
            setDayActive(() => {
              if (!item.match && item != -1) {
                dayActive.setDate(item);
                return setDayActive;
              }
            });
          }}>
          <Text
            style={[
              style.dayWrapper,
              rowIndex == 0
                ? style.highlightHeaderDark
                : style.highlightHeaderLight,
              colIndex == 0
                ? style.textHightLightLight
                : style.textHightLightDark,
              item === dayActive.getDate() ? style.fontBoldActive : null,
            ]}>
            {item != -1 ? item : ''}
          </Text>
        </TouchableOpacity>
      );
    });
    return (
      <View key={rowIndex} style={style.cellWrapper}>
        {rowItems}
      </View>
    );
  });
  return (
    <View>
      <Text style={style.dateStyle}>
        {months[dayActive.getMonth()]}&nbsp;{dayActive.getFullYear()}
      </Text>
      {rows}
    </View>
  );
};

const style = StyleSheet.create({
  dateStyle: {
    fontWeight: 'bold',
  },
  dayWrapper: {
    // flex: 1,
    height: 18,
    textAlign: 'center',
    // backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
  },
  highlightHeaderLight: {
    backgroundColor: 'white',
  },
  highlightHeaderDark: {
    backgroundColor: '#ddd',
  },
  textHightLightLight: {
    color: '#a00',
  },
  textHightLightDark: {
    color: 'black',
  },
  fontBoldActive: {
    fontWeight: 'bold',
  },
  cellWrapper: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Calendar;
