// CatFace.tsx
import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import ImageMap from '../ImageMap';

interface EatingProps {
  isEating: boolean;
  catSize: number; // This prop controls the size of the cat animations.
}

const CatFace: React.FC<EatingProps> = ({ isEating, catSize }) => {
  // Adjust these multipliers as needed.
  const baseWidth = catSize ;             // Base animation width
  const baseHeight = catSize * 1.2;        // Base animation height (a bit taller)
  const overlayWidth = catSize * 0.3;      // Eating overlay width
  const overlayHeight = catSize * 0.3;     // Eating overlay height
  const containerTop = catSize * 0.30;     // Adjust container's top position based on catSize
  const containerWidth = catSize * 1.5;    // Container width to allow space for the animations

  return (
    <View style={[styles.container, { top: containerTop, width: containerWidth }]}>
      {/* Base Cat Animation */}
      <LottieView
        source={ImageMap.catAnim}
        autoPlay
        loop
        style={{ width: baseWidth, height: baseHeight }}
      />

      {/* Eating Animation Overlay */}
      {isEating && (
        <LottieView
          source={ImageMap.eatingAnim}
          autoPlay
          loop={false}
          speed={3}
          style={{
            position: 'absolute',
            top: baseHeight * 0.5, // position overlay relative to base height
            width: overlayWidth,
            height: overlayHeight,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CatFace;
