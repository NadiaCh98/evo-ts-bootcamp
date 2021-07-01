import React, { useCallback } from "react";
import { SolPhotosWrapper } from "../../../app/components/SolPhotosWrapper/SolPhotosWrapper";
import { SelectIdHandler } from "../../models/callbackTypes";
import { RemoveIcon } from "../../../app/components/Icons/Icons";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/store";

const Favorites: React.FC = observer(() => {
  const { removeFromFavorites, favoritesPhotos, message } =
    useStore("FavoritesPage");

  const removePhotoFromFavorites: SelectIdHandler = useCallback(
    (id) => removeFromFavorites(id),
    [removeFromFavorites]
  );
  return (
    <SolPhotosWrapper
      photos={favoritesPhotos}
      photoIcon={RemoveIcon}
      iconClick={removePhotoFromFavorites}
    >
      {message}
    </SolPhotosWrapper>
  );
});

export default Favorites;
