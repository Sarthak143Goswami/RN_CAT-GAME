import React from 'react';
import { View, StyleSheet } from 'react-native';
import Draggable from '../components/Draggable';

const GameScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Draggable />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default GameScreen;