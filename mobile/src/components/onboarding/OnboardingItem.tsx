import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

interface OnboardingItemProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  isActive?: boolean;
}

const OnboardingItem = ({ image, title, description, isActive = true }: OnboardingItemProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const opacity = useSharedValue(isActive ? 1 : 0);
  const translateY = useSharedValue(isActive ? 0 : 20);

  useEffect(() => {
    if (isActive) {
      opacity.value = withTiming(1, { duration: 400 });
      translateY.value = withTiming(0, { duration: 400 });
    } else {
      opacity.value = withTiming(0, { duration: 400 });
      translateY.value = withTiming(-20, { duration: 400 });
    }
  }, [isActive, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, { width: SCREEN_WIDTH }, animatedStyle]}>
      <View style={styles.imageContainer}>
        <Image 
          source={image} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 24,
  },
  imageContainer: {
    width: 256,
    height: 256,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: '#71717a',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
});

export default OnboardingItem;