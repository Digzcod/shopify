import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


interface DrawerProps {
  isDrawerOpen: boolean;
}

const initialState: DrawerProps = {
  isDrawerOpen: false,
};

const mobileDrawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setOpenDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { setOpenDrawer } = mobileDrawerSlice.actions;
export const drawer = (state: RootState) => state.mobileDrawer;
export default mobileDrawerSlice.reducer;
