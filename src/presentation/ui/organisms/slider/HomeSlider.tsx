import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';

import {homeSliderMockData} from '@FoodMamaApplication';
import {CarouselCard, SliderPagination} from '../../molecules';

const OFFSET = 45;
const ITEM_WIDTH = Dimensions.get('window').width - OFFSET * 2;

export const HomeSlider = () => {
  const scrollX = useSharedValue(0);

  return (
    <View style={styles.parallaxCarouselView}>
      <Animated.ScrollView
        horizontal={true}
        decelerationRate={'fast'}
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
