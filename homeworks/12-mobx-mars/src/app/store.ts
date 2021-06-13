import { FavoritesStore } from "../features/pages/favorites/favoritesStore";
import { SolsPageStore } from "../features/pages/sols/solsStore";
import { createContext } from "./storeUtils";

const solsPage = new SolsPageStore();

export const { StoreProvider, useStore } = createContext({
  SolsPage: solsPage,
  FavoritesPage: new FavoritesStore(solsPage),
});
