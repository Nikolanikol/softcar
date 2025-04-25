import { $host } from "@/Servise/Axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface Manufacturer {
  code: string;
  name: string;
  country: string;
  slug: string;
}

interface ModelGroup {
  code: string;
  name: string;
  slug: string;
  manufacturer: Manufacturer;
}

interface GradeDetail {
  code: string;
  name: string;
  model: {
    code: string;
    name: string;
    slug: string;
    model_group: ModelGroup;
  };
}

interface VehicleList {
  count: number;
  page: number;
  pages: number;
  limit: number;
  results: VehicleItem[];
}

interface VehicleItem {
  vehicle_id: number;
  model: {
    code: string;
    name: string;
    slug: string;
    model_group: ModelGroup;
  };
  grade_detail: GradeDetail;
  year: number;
  mileage: number;
  price: number;
  fuel_type: string;
  transmission: string;
  color: string;
  main_photo: string;
  warranty_type: string;
  created_at: string;
  updated_at: string;
  last_import_date: string;
}
///////////////////////////////////////////
interface CarState {
  isLoading: boolean;
  items: VehicleItem[] | null;
  error: string | null;
  currentPage: number | null;
  totalPage: number | null;
  totalCount: number | null;
}
const initialState: CarState = {
  isLoading: true,
  items: [],
  error: null,
  currentPage: null,
  totalPage: null,
  totalCount: null,
};

export const fetchCar = createAsyncThunk(
  "carSlice/fetchCar",
  async ({
    manufacturerSlug,
    modelGroupSlug,
    modelSlug,
    minMileage,
    maxMileage,
    minPrice,
    maxPrice,
    carId,
    page,
  }: {
    manufacturerSlug: string | null;
    modelGroupSlug: string | null;
    modelSlug: string | null;
    minMileage: number | null;
    maxMileage: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    carId: string | null;
    page: number;
  }) => {
    try {
      const limit = 15; // Количество элементов на страницу
      //   console.log("FETCHCARSFETCHCARSFETCHCARSFETCHCARS");
      console.log(manufacturerSlug, modelGroupSlug, modelSlug, "FETCH ARGS");
      ///////////////////////////////////////////////////////////
      const res = await $host.get(`/apix/encar/v2/vehicles`, {
        params: {
          manufacturer_slug: manufacturerSlug,
          model_group_slug: modelGroupSlug,
          model_slug: modelSlug,
          limit: limit,
          min_mileage: minMileage,
          max_mileage: maxMileage,
          min_price: minPrice,
          max_price: maxPrice,
          search: carId,
          page,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Ошибка при получении данных: slice", error);
      throw error;
    }
  }
);
export const carSlice = createSlice({
  name: "CarSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCar.fulfilled, (state, action) => {
        console.log(action.payload, "ACTION PAYLOAD");
        state.isLoading = false;
        state.currentPage = action.payload.page;
        state.totalPage = action.payload.pages;
        state.totalCount = action.payload.count;
        state.items = action.payload.results;
      })
      .addCase(fetchCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Произошла ошибка";
      });
  },
});

export default carSlice.reducer;
export const {} = carSlice.actions;
