import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface ThemeState {
  theme: string;
  themeMenu: boolean;
  isDrawerOpen: boolean;
  initialLoad: boolean;
  lightMode: string
  darkMode: string
}
const initialTheme =
  typeof window !== "undefined"
    ? localStorage.getItem("theme") || "corporate"
    : "corporate";

const initialState: ThemeState = {
  theme: initialTheme,
  themeMenu: false,
  isDrawerOpen: false,
  initialLoad: true,
  lightMode: "corporate",
  darkMode: "dracula"
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
      state.themeMenu = false;
    },
    letOpenThemeMode: (state) => {
      state.themeMenu = !state.themeMenu;
    },
    setMobileDrawerOpen: (state) => {
      state.isDrawerOpen = !state;
    },
    setInitialLoad: (state) => {
      state.initialLoad = false
    }
  },
});
export const { setTheme, letOpenThemeMode, setMobileDrawerOpen, setInitialLoad } =
  themeSlice.actions;

// Selector to get the theme from the state
export const themeMode = (state: RootState) => state.theme;

// Export the reducer to be used in the store configuration
export default themeSlice.reducer;
