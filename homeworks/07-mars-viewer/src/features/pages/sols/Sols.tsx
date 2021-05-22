import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import SolSelector from './components/SolSelector/SolSelector';
import {
  changeSol,
  fetchSolsAsync,
  selectSolPhotos,
  selectSol,
  selectStatus,
} from './solsSlice';
import { SolsLoadStatus } from './solsLoadStatus';
import { SelectIdHandler } from '../../models/callbackTypes';
import { addToFavorites } from '../favorites/favoritesSlice';
import { SolPhotosWrapper } from '../../../app/components/SolPhotosWrapper/SolPhotosWrapper';
import { FavIcon } from '../../../app/components/Icons/Icons';

const Sols = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectSolPhotos);
  const status = useAppSelector(selectStatus);
  const selectedSol = useAppSelector(selectSol);

  const changeCurrentSol = useCallback(
    (sol: number) => dispatch(changeSol(sol)),
    [dispatch]
  );
  const loadSol = useCallback(
    () => dispatch(fetchSolsAsync(selectedSol)),
    [dispatch, selectedSol]
  );
  const addPhotoToFavorites: SelectIdHandler = useCallback(
    (id) => dispatch(addToFavorites(id)),
    [dispatch]
  );
  return (
    <SolPhotosWrapper
      photos={photos}
      photoIcon={FavIcon}
      iconClick={addPhotoToFavorites}
    >
      <SolSelector
        sol={selectedSol}
        selectSol={changeCurrentSol}
        loadSol={loadSol}
      />
      {status !== SolsLoadStatus.Success && status}
    </SolPhotosWrapper>
  );
};

export default Sols;
