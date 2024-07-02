"use client";

import { useEffect, ChangeEvent } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/features/root";

import {
  letOpenThemeMode,
  setInitialLoad,
  setMobileDrawerOpen,
  setTheme,
} from "@/app/redux/features/_ThemeMode/AppTheme";
import { setOpenDrawer } from "@/app/redux/features/_drawer/MobileDrawer";


export const themes = {
  corporate: "corporate",
  dark: "dracula",
};

const useNavbar = () => {
  const currentPath = usePathname();
  const { theme, themeMenu, initialLoad, darkMode, lightMode } = useAppSelector(
    (state) => state.theme
  );

  const { isDrawerOpen } = useAppSelector((state) => state.mobileDrawer);

  const dispatch = useAppDispatch();


 const handleDrawer = () => {
  dispatch(setOpenDrawer())
 }

  useEffect(() => {
    const storeTheme = localStorage.getItem("theme");
    if (storeTheme) {
      dispatch(setTheme(storeTheme));
    }
    dispatch(setInitialLoad());
  }, [dispatch]);

  useEffect(() => {
    if (initialLoad) return;
    const { corporate, dark } = themes;
    const appliedTheme = theme === "corporate" ? corporate : dark;
    document.documentElement.setAttribute("data-theme", appliedTheme);
  }, [theme, initialLoad]);

  const handleThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.value;
    dispatch(setTheme(newTheme));
    localStorage.setItem("theme", newTheme);
  };

  const handleOpen = () => {
    dispatch(letOpenThemeMode());
  };

  if (initialLoad) {
    return { initialLoad };
  }

  return {
    theme,
    themeMenu,
    currentPath,
    handleThemeChange,
    handleOpen,
    lightMode,
    darkMode,
    isDrawerOpen,
    handleDrawer
  };
};

export default useNavbar;
