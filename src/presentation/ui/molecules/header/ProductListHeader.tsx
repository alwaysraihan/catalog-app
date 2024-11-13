import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {colors} from '@FoodMamaApplication';

export const ProductListHeader = ({
  asc,
  setAsc,
}: {
  asc: boolean;
  setAsc: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const scaleA = useSharedValue(1);
  const scaleZ = useSharedValue(1);

  const handlePressA = () => {
    setAsc(true);
    scaleA.value = withSpring(1.2, {}, () => {
      scaleA.value = withSpring(1);
    });
  };

  const handlePressZ = () => {
    setAsc(false);
    scaleZ.value = withSpring(1.2, {}, () => {
      scaleZ.value = withSpring(1);
    });
  };

  const animatedStyleA = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleA.value}],
    };
  });

  const animatedStyleZ = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleZ.value}],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular Menu</Text>
      <View style={styles.sortContainer}>
        <TouchableOpacity onPress={handlePressA}>
          <Animated.Text
            style={[
              styles.letter,
              {color: asc ? colors.primary : colors.on_base_100},
              animatedStyleA,
            ]}>
            A
          </Animated.Text>
        </TouchableOpacity>
        <Text style={styles.text}>To</Text>
        <TouchableOpacity onPress={handlePressZ}>
          <Animated.Text
            style={[
              styles.letter,
              {color: !asc ? colors.primary : colors.on_base_100},
              animatedStyleZ,
            ]}>
            Z
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  letter: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 5,
    color: colors.primary,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
});
