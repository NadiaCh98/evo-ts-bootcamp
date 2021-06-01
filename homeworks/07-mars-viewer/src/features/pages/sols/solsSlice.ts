import { RootState } from './../../../app/store';
import { SolPhotoData, SolData } from './../../models/sol';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { SolsLoadStatus } from './solsLoadStatus';
import { fetchSolPhotos } from './solsAPI';
import * as _ from 'lodash';
import { Id } from '../../../app/models/base';

export interface SolsState {
  readonly selectedSol: Id;
  readonly sols: SolData[];
  readonly photos: SolPhotoData[];
  readonly status: SolsLoadStatus;
}

const SLICE_NAME = 'sols';

export const initialState: SolsState = {
  selectedSol: 1,
  sols: [],
  photos: [],
  status: SolsLoadStatus.Idle,
};

export const fetchSolsAsync = createAsyncThunk(
  `${SLICE_NAME}/fetchSolPhotos`,
  async (sol: Id) => {
    const response = await fetchSolPhotos(sol);
    return response.data.photos;
  }
);

export const solsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    changeSol: (state, action: PayloadAction<Id>) => {
      state.selectedSol = action.payload;
      const loadedSol = state.sols.find(
        (sol) => sol.solNumber === action.payload
      );
      if (loadedSol) {
        state.status =
          loadedSol.photoIds.length > 0
            ? SolsLoadStatus.Success
            : SolsLoadStatus.NoResult;
      } else {
        state.status = SolsLoadStatus.Idle;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchSolsAsync.pending, (state) => {
        state.status = SolsLoadStatus.Loading;
      })
      .addCase(fetchSolsAsync.fulfilled, (state, action) => {
        state.photos = _.uniqWith(
          [...state.photos, ...action.payload],
          _.isEqual
        );
        const addedSol: SolData = {
          solNumber: state.selectedSol,
          photoIds: action.payload.map((photo) => photo.id),
        };
        state.sols.push(addedSol);
        state.status =
          action.payload.length > 0
            ? SolsLoadStatus.Success
            : SolsLoadStatus.NoResult;
      })
      .addCase(fetchSolsAsync.rejected, (state) => {
        state.status = SolsLoadStatus.Failed;
      }),
});

export const { changeSol } = solsSlice.actions;

export const selectSol = (state: RootState): number =>
  state.solsPage.selectedSol;
export const selectStatus = (state: RootState): SolsLoadStatus =>
  state.solsPage.status;
export const selectPhotos = (state: RootState): SolPhotoData[] =>
  state.solsPage.photos;
export const selectSols = (state: RootState): SolData[] => state.solsPage.sols;

export const selectIsShowStatus = createSelector(
  selectStatus,
  (status: SolsLoadStatus): boolean => status !== SolsLoadStatus.Success
);

export const selecIsDisabledLoad = createSelector(
  selectStatus,
  selectSol,
  selectSols,
  (status: SolsLoadStatus, currentSol: number, sols: SolData[]): boolean =>
    status === SolsLoadStatus.Loading ||
    !!sols.find((sol) => sol.solNumber === currentSol)
);

export const selectSolPhotos = createSelector(
  selectSol,
  selectPhotos,
  selectSols,
  (selectedSol: Id, photos: SolPhotoData[], loadedSols: SolData[]) => {
    const currentSolInfo = loadedSols.find(
      (sol) => sol.solNumber === selectedSol
    );
    return currentSolInfo
      ? photos.filter((photo) => currentSolInfo.photoIds.includes(photo.id))
      : [];
  }
);

export default solsSlice.reducer;
