import { AxiosResponse } from "axios";
import { isEqual, uniqWith } from "lodash";
import { action, makeAutoObservable, flow } from "mobx";
import { Id } from "../../../app/models/base";
import { SolData, SolPhotosResponse, SolPhotoData } from "../../models/sol";
import { fetchSolPhotos } from "./solsAPI";
import { SolsLoadMessage } from "./solsLoadMessage";

export class SolsPageStore {
  public selectedSol = 1;
  public message?: SolsLoadMessage = SolsLoadMessage.Idle;
  public photos: SolPhotoData[] = [];
  private loadedSols: SolData[] = [];

  get isDisabledLoad(): boolean {
    return (
      this.message === SolsLoadMessage.Loading ||
      this.loadedSols.some(
        (loadedSol) => loadedSol.solNumber === this.selectedSol
      )
    );
  }

  get solPhotos() {
    const currentSolInfo = this.loadedSols.find(
      (sol) => sol.solNumber === this.selectedSol
    );
    return currentSolInfo
      ? this.photos.filter((photo) =>
          currentSolInfo.photoIds.includes(photo.id)
        )
      : [];
  }

  constructor() {
    makeAutoObservable(this, {
      fetchSolPhotosAction: flow.bound,
      changeSol: action.bound
    });
  }

  changeSol(sol: Id) {
    this.selectedSol = sol;
    const loadedSol = this.loadedSols.find(
      (loadedSol) => loadedSol.solNumber === sol
    );
    this.message = loadedSol
      ? loadedSol.photoIds.length === 0
        ? SolsLoadMessage.NoResult
        : undefined
      : SolsLoadMessage.Idle;
  }

  *fetchSolPhotosAction() {
    this.message = SolsLoadMessage.Loading;
    try {
      const response: AxiosResponse<SolPhotosResponse> = yield fetchSolPhotos(
        this.selectedSol
      );
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const solPhotos: SolPhotoData[] = yield response.data.photos;
      this.photos = uniqWith([...this.photos, ...solPhotos], isEqual);
      const addableSol: SolData = {
        solNumber: this.selectedSol,
        photoIds: solPhotos.map((photo) => photo.id),
      };
      this.loadedSols.push(addableSol);
      this.message =
        solPhotos.length === 0 ? SolsLoadMessage.NoResult : undefined;
    } catch (error) {
      this.message = SolsLoadMessage.Failed;
    }
  }
}
