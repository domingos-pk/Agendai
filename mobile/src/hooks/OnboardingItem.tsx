import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ImageSourcePropType } from 'react-native';

interface Props {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

const OnboardingItem = ({ image, title, description }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image source={image} style={[styles.image, { width: width * 0.7 }]} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  image: { height: 300, marginBottom: 40 },
  textContainer: { alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 10 },
  description: { fontSize: 16, color: '#71717a', textAlign: 'center', paddingHorizontal: 20 },
});

export default OnboardingItem;