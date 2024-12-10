import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum STATUS {
  InProcess = 'Ожидает доставки',
  InTransit = 'В пути',
  Delivered = 'Доставлен',
}

export interface ICargoItems {
  cargoList: ICargoItems[];
  id: string;
  name: string;
  cargoName: string;
  status: STATUS;
  origin: string;
  destination: string;
  departureDate: string;
  searchByWord: string;
  filterStatusChange: string;
}

const initialState: ICargoItems = {
  cargoList: JSON.parse(localStorage.getItem('cargo') || '[]'),
  id: '',
  name: '',
  cargoName: '',
  status: STATUS.InProcess,
  origin: '',
  destination: '',
  departureDate: '',
  searchByWord: '',
  filterStatusChange: '',
};

export const cargoSlice = createSlice({
  name: 'cargo',
  initialState,
  reducers: {
    addCargoItem: (state, action: PayloadAction<ICargoItems>) => {
      state.cargoList.push(action.payload);
      localStorage.setItem('cargo', JSON.stringify(state.cargoList));
    },
    updateStatus: (state, action: PayloadAction<{ id: string; status: STATUS }>) => {
      const { id, status } = action.payload;
      const findItem = state.cargoList.find((item) => item.id === id);
      if (findItem) {
        findItem.status = status;
      }
      localStorage.setItem('cargo', JSON.stringify(state.cargoList));
    },
    setSearchByWord: (state, action: PayloadAction<string>) => {
      state.searchByWord = action.payload;
    },
    setFilterStatusChange: (state, action: PayloadAction<string>) => {
      state.filterStatusChange = action.payload;
    },
    setTargetName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setTargetStatus: (state, action: PayloadAction<STATUS>) => {
      state.status = action.payload;
    },
    setTargetOrigin: (state, action: PayloadAction<string>) => {
      state.origin = action.payload;
    },
    setTargetDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
    setTargetCargoName: (state, action: PayloadAction<string>) => {
      state.cargoName = action.payload;
    },
  },
});

export const {
  addCargoItem,
  updateStatus,
  setSearchByWord,
  setFilterStatusChange,
  setTargetDestination,
  setTargetName,
  setTargetOrigin,
  setTargetStatus,
  setTargetCargoName,
} = cargoSlice.actions;

export default cargoSlice.reducer;
