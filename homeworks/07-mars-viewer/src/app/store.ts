import { favoritesSlice } from './../features/pages/favorites/favoritesSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import solsReducer from '../features/pages/sols/solsSlice';

export const store = configureStore({
  reducer: {
    solsPage: solsReducer,
    favoritesPage: favoritesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
