import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

type StyleValue = ViewStyle | TextStyle | ImageStyle;

export function cn<T extends StyleValue>(...inputs: (T | T[] | undefined | null | false)[]): T[] {
  return inputs.filter(Boolean).flat() as T[];
}

// Exemplo de uso:
// const styles = cn(styles.base, isActive && styles.active);