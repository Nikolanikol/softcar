import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  manufacture: null | string;
  modelGroupSlug: string | null;
  modelSlug: string | null;
  minMileage: number | null;
  maxMileage: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  carId: string | null;
  page: number;
}

const initialState: FilterState = {
  manufacture: null,
  modelGroupSlug: null,
  modelSlug: null,
  minMileage: null,
  maxMileage: null,
  minPrice: null,
  maxPrice: null,
  carId: null,
  page: 1,
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setManufactureDispatch: (state, action: PayloadAction<string | null>) => {
      state.manufacture = action.payload;
    },
    setModelGroupSlugDispatch: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.modelGroupSlug = action.payload;
    },
    setModelSlugDispatch: (state, action: PayloadAction<string | null>) => {
      state.modelSlug = action.payload;
    },
    setMileageDispatch: (state, action: PayloadAction<number[]>) => {
      state.minMileage = action.payload[0];
      state.maxMileage = action.payload[1];
    },
    setPriceDispatch: (state, action: PayloadAction<number[]>) => {
      state.minPrice = action.payload[0];
      state.maxPrice = action.payload[1];
    },
    setCarIdDispatch: (state, action: PayloadAction<string | null>) => {
      state.carId = action.payload;
    },
    setPageDispatch: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {
  setManufactureDispatch,
  setModelGroupSlugDispatch,
  setModelSlugDispatch,
  setMileageDispatch,
  setPriceDispatch,
  setCarIdDispatch,
  setPageDispatch,
} = filterSlice.actions;
export default filterSlice.reducer;
