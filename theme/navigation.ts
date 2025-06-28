import { DarkTheme } from "@react-navigation/native";
import { Colors } from "./colors";

export const NavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.accentPurple,
    background: Colors.darkBackground,
    card: Colors.secondaryDark,
    text: Colors.primaryText,
    border: Colors.accentPurple + "50",
  },
};
