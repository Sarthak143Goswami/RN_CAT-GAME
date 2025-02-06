import React from 'react';
import { View, Image, PanResponder, StyleSheet } from 'react-native';

interface FoodBoxProps {
  id: string;
  position: { x: number; y: number };
  image: any;
  onDrag: (id: string, dx: number, dy: number) => void;
  onRelease: (id: string) => void;
  boxSize: number; // Size for the food box.
}

const FoodBox: React.FC<FoodBoxProps> = ({
  id,
  position,
  image,
  onDrag,
  onRelease,
  boxSize,
}) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      onDrag(id, gesture.dx, gesture.dy);
    },
    onPanResponderRelease: () => {
      onRelease(id);
    },
  });

  return (
    <View
      {...panResponder.panHandlers}
      style={[
        styles.boxContainer,
        {
          width: boxSize,
          height: boxSize,
          transform: [{ translateX: position.x }, { translateY: position.y }],
        },
      ]}
    >
      <Image source={image} style={{ width: boxSize, height: boxSize, resizeMode: 'contain' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    position: 'absolute',
  },
});

export default FoodBox;
