import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  removeFromFavorites,
  selectFavoritesPhotos,
  selectFavoritesStatus,
} from './favoritesSlice';
import { SolPhotosWrapper } from '../../../app/components/SolPhotosWrapper/SolPhotosWrapper';
import { FavoritesStatus } from './favoritesStatus';
import { SelectIdHandler } from '../../models/callbackTypes';
import { RemoveIcon } from '../../../app/components/Icons/Icons';

const Favorites = (): React.ReactElement => {
  const favorites = useAppSelector(selectFavoritesPhotos);
  const status = useAppSelector(selectFavoritesStatus);
  const dispatch = useAppDispatch();

  const removePhotoFromFavorites: SelectIdHandler = useCallback(
    (id) => dispatch(removeFromFavorites(id)),
    [dispatch]
  );
  return (
    <SolPhotosWrapper
      photos={favorites}
      photoIcon={RemoveIcon}
      iconClick={removePhotoFromFavorites}
    >
      {status !== FavoritesStatus.Success && status}
    </SolPhotosWrapper>
  );
};

export default Favorites;
