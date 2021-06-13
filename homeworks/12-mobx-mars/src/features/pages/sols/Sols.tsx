import { useCallback } from "react";
import SolSelector from "./components/SolSelector/SolSelector";
import { SelectIdHandler } from "../../models/callbackTypes";
import { SolPhotosWrapper } from "../../../app/components/SolPhotosWrapper/SolPhotosWrapper";
import { FavIcon } from "../../../app/components/Icons/Icons";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/store";

const Sols = observer(() => {
  const solsStore = useStore("SolsPage");
  const { addToFavorites } = useStore("FavoritesPage");

  const changeCurrentSol = useCallback(
    (sol: number) => solsStore.changeSol(sol),
    [solsStore]
  );
  const loadSol = useCallback(
    () => solsStore.fetchSolPhotosAction(),
    [solsStore]
  );
  const addPhotoToFavorites: SelectIdHandler = useCallback(
    (id) => {
      addToFavorites(id);
    },
    [addToFavorites]
  );
  return (
    <SolPhotosWrapper
      photos={solsStore.solPhotos}
      photoIcon={FavIcon}
      iconClick={addPhotoToFavorites}
    >
      <SolSelector
        sol={solsStore.selectedSol}
        selectSol={changeCurrentSol}
        loadSol={loadSol}
        disabledLoad={solsStore.isDisabledLoad}
      />
      {solsStore.message}
    </SolPhotosWrapper>
  );
});

export default Sols;
