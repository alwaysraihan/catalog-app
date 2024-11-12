import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {localStorage} from '@FoodMamaApplication';

type Location = {
  latitude: number;
  longitude: number;
  area: string;
};

interface LocationState {
  location: Location | null;
}

const initialState: LocationState = {
  location: localStorage.contains('location')
    ? JSON.parse(localStorage.getString('location')!)
    : null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
      localStorage.set('location', JSON.stringify(action.payload));
    },
    clearLocation: state => {
      state.location = null;
      localStorage.delete('location');
    },
  },
});

export const {setLocation, clearLocation} = locationSlice.actions;
export default locationSlice.reducer;
