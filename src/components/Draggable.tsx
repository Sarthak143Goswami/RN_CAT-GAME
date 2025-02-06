import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, ScaledSize } from 'react-native';
import { Audio } from 'expo-av';
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
} from 'react-native-responsive-dimensions';
import CatFace from './CatFace';
import FoodBox from './FoodBox';
import ImageMap from '../ImageMap';


const FOOD_IMAGES = [
  ImageMap.apple,
  ImageMap.banana,
  ImageMap.grapes,
  ImageMap.orange,
  ImageMap.strawberry,
  ImageMap.lemon,
];

interface BoxConfig {
  id: string;
  position: { x: number; y: number };
  isHidden: boolean;
  image: any;
}

const Draggable = () => {
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
  const [numberOfPlates, setNumberOfPlates] = useState(3);
  const [isLandscape, setIsLandscape] = useState(false);
  const [boxes, setBoxes] = useState<BoxConfig[]>([]);
  const [isEating, setIsEating] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const isDeviceTablet = Math.min(screenDimensions.width, screenDimensions.height) >= 600;

  // Initialize plates count and orientation
  useEffect(() => {
    const randomPlates = Math.floor(Math.random() * 3) + 3; // 3-5 plates
    setNumberOfPlates(randomPlates);
    setIsLandscape(Dimensions.get('window').width > Dimensions.get('window').height);
  }, []);

  // Handle orientation changes
  useEffect(() => {
    const updateDimensions = ({ window }: { window: ScaledSize }) => {
      setScreenDimensions(window);
      setIsLandscape(window.width > window.height);
      if (!isLandscape) setNumberOfPlates(3); // Always 3 in portrait
    };

    const subscription = Dimensions.addEventListener('change', updateDimensions);
    return () => subscription?.remove();
  }, [isLandscape]);

  // Calculate plate positions
  const getPlatePositions = () => {
    if (isLandscape) {
      return Array.from({ length: numberOfPlates }, (_, i) => {
        const spacing = 100 / (numberOfPlates + 1);
        return {
          x: rw((i + 1) * spacing - 7.5), // Centered with 15% width offset
          y: isDeviceTablet ? rh(58) : rh(75),
        };
      });
    }
    // Portrait positions
    return [
      { x: isDeviceTablet ? rw(18) : rw(16), y: isDeviceTablet ? rh(59) : rh(73) },
      { x: isDeviceTablet ? rw(42) : rw(37), y: isDeviceTablet ? rh(59) : rh(73) },
      { x: isDeviceTablet ? rw(64) : rw(61), y: isDeviceTablet ? rh(59) : rh(73) },
    ];
  };
  
  // Generate food boxes configuration
  const generateBoxesConfig = () => {
    const platePositions = getPlatePositions();
    return platePositions.map((position, index) => ({
      id: `box${index + 1}`,
      position: {
        x: position.x + rw(-0.5) + (isLandscape ? rw(3.5) : rw(2.5)),
        y: position.y + rh(-2) + (isLandscape ? rh(8) : rh(2.5)),
      },
      isHidden: false,
      image: FOOD_IMAGES[index % FOOD_IMAGES.length],
    }));
  };

    // Update boxes when orientation or plate count changes
    useEffect(() => {
      setBoxes(generateBoxesConfig());
    }, [isLandscape, numberOfPlates]);
  
  const playSound = async () => {
    if (sound) await sound.unloadAsync();
    const { sound: newSound } = await Audio.Sound.createAsync(ImageMap.chewingSound);
    setSound(newSound);
    await newSound.playAsync();
  };

  const handleDrag = (id: string, dx: number, dy: number) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === id
          ? { ...box, position: { x: box.position.x + dx, y: box.position.y + dy } }
          : box
      )
    );
  };

  const handleRelease = (id: string) => {
    const catCenter = {
      x: screenDimensions.width / 2,
      y: rh(15),
    };

    setBoxes((prev) => {
      const updatedBoxes = prev.map((box) => {
        if (box.id === id) {
          const boxCenter = {
            x: box.position.x + rw(0.1),
            y: box.position.y + rw(0.1),
          };

          const isInCat =
            Math.abs(boxCenter.x - catCenter.x) <= rw(18.75) &&
            Math.abs(boxCenter.y - catCenter.y) <= rw(18.75);

            if (isInCat) {
              setIsEating(true);
              playSound();
              setTimeout(() => setIsEating(false), 1500);
              const originalPosition = generateBoxesConfig().find(b => b.id === id)?.position;
              return { ...box, isHidden: true, position: originalPosition || box.position };
            }
  
            const originalPosition = generateBoxesConfig().find(b => b.id === id)?.position;
            return { ...box, position: originalPosition || box.position };
          }
          return box;
        });
  
        setTimeout(() => {
          setBoxes(boxes =>
            boxes.map(box =>
              box.id === id ? { ...box, isHidden: false } : box
            )
          );
        }, 2000);
  
        return updatedBoxes;
      });
    };

  // Determine box size based on orientation.
  const boxSize = isLandscape ? rw(9) : rw(11);

  // Recalculate plate positions on every render.
  const platePositions = getPlatePositions();

  // Determine cat size based on orientation.
  const catSize = isLandscape ? rw(25) : rw(35);

  return (
    <View style={styles.container}>
      {/* Updated CatFace Container with dynamic top */}
      <View style={{
        position: 'absolute',
        top: isLandscape ? rh(-2) : rh(5),
        width: rw(100),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CatFace isEating={isEating} catSize={catSize} />
      </View>

      <View>
      {platePositions.map((plate, index) => (
          <Image
            key={`plate-${index}`}
            source={ImageMap.plate}
            style={{
              position: 'absolute',
              left: plate.x,
              top: plate.y,
              width: rw(15),
              height: rw(15),
              resizeMode: 'contain',
              zIndex: 2,
            }}
          />
        ))}

        <View style={styles.draggableContainer}>
          {boxes.map(
            (box) =>
              !box.isHidden && (
                <FoodBox
                  key={box.id}
                  id={box.id}
                  position={box.position}
                  image={box.image}
                  onDrag={handleDrag}
                  onRelease={handleRelease}
                  boxSize={boxSize} // Adjusted box size for orientation.
                />
              )
          )}
        </View>

        {/* Render the table only in portrait */}
        {!isLandscape && (
          <Image
            source={ImageMap.table}
            style={[
              styles.tableBackground,
              {
                left: rw(0),
                bottom: isDeviceTablet ? rh(-98) : rh(-105),
                width: rw(100),
                height: isDeviceTablet ? rh(38) : rh(32),
              }
            ]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  
  draggableContainer: {
    position: 'absolute',
    zIndex: 3,
    width: rw(100),
  },
  tableBackground: {
    position: 'absolute',
    justifyContent: 'flex-end',
    resizeMode: 'contain',
    zIndex: 1,
  },
});

export default Draggable;
