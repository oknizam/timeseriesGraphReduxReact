import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApiCall } from '../Apis/api';
import { RootState } from './RootState';

interface CountryState {
  countryName: string;
  status: string;
  highestValue: number;
  lowestValue: number;
  loading: boolean;
  error: any;
  countryList: string[]
  timerSeries: any[]

}


const initialState: CountryState = {
  countryName: '',
  status: '',
  highestValue: 0,
  lowestValue: 0,
  countryList: [],
  timerSeries: [],
  loading: false,
  error: null,
};


// api call with thunk

export const fetchCountryList = createAsyncThunk(
  'country/fetchCountryList',
  async () => {
    try {
      const data = await getApiCall('country-list');
      return data;
    } catch (error: any) {
      throw error;
    }
  }
);

export const fetchCountryInfo = createAsyncThunk(
  'country/fetchCountryInfo',
  async (countryCode: string, { rejectWithValue }) => {
    try {
      const data = await getApiCall(`country-data/${countryCode}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    resetState: () => initialState,
    setCountryName: (state, action) => {
      state.countryName = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryList.fulfilled, (state, action) => {
        state.loading = false;
        state.countryList = action.payload;
      })
      .addCase(fetchCountryList.rejected, (state, action) => {
        state.loading = false;
        console.log("dsjnds", action)
        state.error = action.error.message;
      })

      .addCase(fetchCountryInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryInfo.fulfilled, (state, action) => {

        let minValue = Infinity, maxValue = 0;

        if (action.payload.timeseries) {
          for (const item of action.payload.timeseries) {
            const value = item[1]; // Accessing the second element of each sub-array
            if (value < minValue) {
              minValue = value;
            }

            if (value > maxValue) {
              maxValue = value
            }
          }
          state.loading = false;
          state.status = action.payload.status;
          state.highestValue = maxValue;
          state.lowestValue = minValue
          state.timerSeries = action.payload.timeseries
        }


      })
      .addCase(fetchCountryInfo.rejected, (state, action) => {
        state.loading = false;
        // console.log("dsjnds",action)
        state.error = action.error.message;
      });
  },

})

export const { resetState, setCountryName } = countrySlice.actions;

export const selectCountryInfo = (state: RootState) => state.country;


export default countrySlice.reducer;
