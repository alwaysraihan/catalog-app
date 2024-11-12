import React, {useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

import {homeSliderMockData} from '@FoodMamaApplication';
import {CarouselCard, SliderPagination} from '../../molecules';

const OFFSET = 45;
const ITEM_WIDTH = Dimensions.get('window').width - OFFSET * 2;

export const HomeSlider = () => {
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = Math.floor(scrollX.value / ITEM_WIDTH) + 1;
      const nextOffset = (nextIndex % homeSliderMockData.length) * ITEM_WIDTH;

      scrollViewRef?.current?.scrollTo({
        x: nextOffset,
        animated: true,
      });
      scrollX.value = withTiming(nextOffset);
    }, 3000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [scrollX]);

  return (
    <View style={styles.parallaxCarouselView}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        disableIntervalMomentum
        onScroll={event => {
          scrollX.value = event.nativeEvent.contentOffset.x;
        }}
        scrollEventThrottle={12}>
        {homeSliderMockData.map((item, id) => (
          <CarouselCard
            key={id}
            item={item}
            id={id}
            scrollX={scrollX}
            total={homeSliderMockData.length}
          />
        ))}
      </Animated.ScrollView>
      <SliderPagination data={homeSliderMockData} scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  parallaxCarouselView: {
    paddingVertical: 16,
  },
});
