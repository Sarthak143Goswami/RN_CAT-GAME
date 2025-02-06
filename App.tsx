import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import GameScreen from './src/screens/GameScreen';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <GameScreen/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
