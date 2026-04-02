import * as React from "react";
import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";

//import { cn } from "../src/onboarding/utils";
import { cn } from "../components/onboarding/utils";
const TabsContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

interface TabsProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

const Tabs = ({ children, value, onValueChange, style }: TabsProps) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <View style={cn<ViewStyle>(styles.root, style as ViewStyle)}>{children}</View>
  </TabsContext.Provider>
);

const TabsList = React.forwardRef<View, { children: React.ReactNode; style?: StyleProp<ViewStyle> }>(
  ({ children, style, ...props }, ref) => (
    <View ref={ref} style={cn<ViewStyle>(styles.list, style as ViewStyle)} {...props}>
      {children}
    </View>
  )
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const TabsTrigger = React.forwardRef<View, TabsTriggerProps>(
  ({ children, value, style, textStyle, ...props }, ref) => {
    const { value: activeValue, onValueChange } = React.useContext(TabsContext);
    const isActive = activeValue === value;

    return (
      <Pressable
        ref={ref as any}
        onPress={() => onValueChange?.(value)}
        style={cn<ViewStyle>(
          styles.trigger,
          isActive && styles.activeTrigger,
          style as ViewStyle
        )}
        {...props}
      >
        <Text
          style={cn<TextStyle>(
            styles.triggerText,
            isActive && styles.activeTriggerText,
            textStyle as TextStyle
          )}
        >
          {children}
        </Text>
      </Pressable>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  style?: StyleProp<ViewStyle>;
}

const TabsContent = React.forwardRef<View, TabsContentProps>(
  ({ children, value, style, ...props }, ref) => {
    const { value: activeValue } = React.useContext(TabsContext);

    if (activeValue !== value) return null;

    return (
      <View ref={ref} style={cn<ViewStyle>(styles.content, style as ViewStyle)} {...props}>
        {children}
      </View>
    );
  }
);
TabsContent.displayName = "TabsContent";

const styles = StyleSheet.create({
  root: { width: "100%" },
  list: {
    flexDirection: "row",
    backgroundColor: "#f4f4f5",
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
  },
  trigger: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeTrigger: {
    backgroundColor: "#ffffff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  triggerText: { fontSize: 14, fontWeight: "500", color: "#71717a" },
  activeTriggerText: { color: "#09090b" },
  content: { width: "100%", marginTop: 8 },
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
