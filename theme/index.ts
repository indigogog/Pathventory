import { Colors } from "./colors";
import { NavigationTheme } from "./navigation";

export { Colors, NavigationTheme };

export const PathventoryTheme = {
  ...NavigationTheme,
  customColors: Colors,
};

export type AppTheme = typeof PathventoryTheme;
