import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';

interface PaginationProps {
  total: number;
  current: number;
}

const Pagination = ({ total, current }: PaginationProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} isActive={i === current} />
      ))}
    </View>
  );
};

// Componente Dot separado para animações individuais
const Dot = ({ isActive }: { isActive: boolean }) => {
  const width = useSharedValue(isActive ? 28 : 8);
  const backgroundColor = useSharedValue(isActive ? Colors.primary : '#D1D5DB');

  useEffect(() => {
    if (isActive) {
      width.value = withSpring(28, {
        damping: 25,
        stiffness: 300,
        mass: 1,
      });
      backgroundColor.value = withTiming(Colors.primary);
    } else {
      width.value = withSpring(8, {
        damping: 25,
        stiffness: 300,
        mass: 1,
      });
      backgroundColor.value = withTiming('#D1D5DB');
    }
  }, [isActive, backgroundColor, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    backgroundColor: backgroundColor.value,
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});

export default Pagination;