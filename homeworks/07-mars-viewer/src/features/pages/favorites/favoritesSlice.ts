import { FavoritesStatus } from './favoritesStatus';
import { SolPhotoData } from './../../models/sol';
import { RootState } from './../../../app/store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PhotoIds } from '../../models/sol';
import { Id } from '../../../app/models/base';
import { selectPhotos } from '../sols/solsSlice';

const SLICE_NAME = 'favorites';

interface FavoritesState extends PhotoIds {
  status: FavoritesStatus;
}

const initialState: FavoritesState = {
  photoIds: [],
  status: FavoritesStatus.NoResult,
};

export const favoritesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Id>) => {
      if (!state.photoIds.includes(action.payload)) {
        state.photoIds.push(action.payload);
        state.status = FavoritesStatus.Success;
      }
    },
    removeFromFavorites: (state, action: PayloadAction<Id>) => {
      const photoIndex = state.photoIds.findIndex(
        (photoId) => photoId === action.payload
      );
      state.photoIds.splice(photoIndex, 1);
      if (state.photoIds.length === 0) {
        state.status = FavoritesStatus.NoResult;
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export const selectFavoritesStatus = (state: RootState): FavoritesStatus =>
  state.favoritesPage.status;
export const selectFavoritesPhotos = createSelector(
  selectPhotos,
  (state: RootState) => state.favoritesPage.photoIds,
  (photos: SolPhotoData[], favoritesIds: Id[]) =>
    photos.filter((photo) => favoritesIds.includes(photo.id))
);

export default favoritesSlice.reducer;
