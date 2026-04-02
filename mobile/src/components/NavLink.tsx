import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, Pressable } from 'react-native';
import { Link, usePathname } from 'expo-router';

interface NavLinkProps {
  to: string;
  style?: ViewStyle | ((props: { isActive: boolean }) => ViewStyle);
  activeStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeTextStyle?: TextStyle;
  children: React.ReactNode;
}

const NavLink = ({
  to,
  style,
  activeStyle,
  textStyle,
  activeTextStyle,
  children,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link href={to as any} asChild {...props}>
      <Pressable
        style={[
          styles.default,
          typeof style === 'function' ? style({ isActive }) : style,
          isActive && (activeStyle || styles.active),
        ]}
      >
        <Text
          style={[
            styles.defaultText,
            textStyle,
            isActive && (activeTextStyle || styles.activeText),
          ]}
        >
          {children}
        </Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  default: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  active: {
    backgroundColor: '#E54F2D',
  },
  defaultText: {
    fontSize: 16,
    color: '#000000',
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export { NavLink };