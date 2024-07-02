import { combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from "../store"
import themeReducer from "../features/_ThemeMode/AppTheme"
import drawerReducer from "./_drawer/MobileDrawer"
// import { mobileDrawer } from "./_drawer/drawer";



export const combinedProfileAppReducers = combineReducers({
    theme: themeReducer,
    mobileDrawer: drawerReducer
})



export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;