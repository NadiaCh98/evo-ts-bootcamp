import { FavoritesMessage } from './favoritesMessage';
import { action, makeAutoObservable } from "mobx";
import { Id } from "../../../app/models/base";
import { SolsPageStore } from "../sols/solsStore";

export class FavoritesStore {
  public message?: FavoritesMessage = FavoritesMessage.NoResult;
  private photoIds: Id[] = [];

  get favoritesPhotos() {
    return this.sols.photos.filter(photo => this.photoIds.includes(photo.id));
  }

  constructor(private sols: SolsPageStore) {
    makeAutoObservable(this, {
        addToFavorites: action.bound,
        removeFromFavorites: action.bound
    });
  }

  clean() {
      this.photoIds = [];
  }

  addToFavorites(photoId: Id): void {
    if (!this.photoIds.includes(photoId)) {
      this.photoIds.push(photoId);
      this.message = undefined;
    }
  }

  removeFromFavorites(selectedPhotoId: Id): void {
    const photoIndex = this.photoIds.findIndex(photoId => photoId === selectedPhotoId);
    this.photoIds.splice(photoIndex, 1);
    if (this.photoIds.length === 0) {
        this.message = FavoritesMessage.NoResult;
    }
  }
}
