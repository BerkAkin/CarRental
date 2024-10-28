import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../styles/Colours';

function TopSlider({ currentPage }) {
  return (
    <View style={styles.topSlider}>
      <View>
        <Text>{currentPage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topSlider: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 15,
    marginBottom: 20,
  },
  dot: {
    borderColor: GlobalStyles.colours.red700,
    borderWidth: 2,
    borderRadius: 2,
  },
});

export default TopSlider;
