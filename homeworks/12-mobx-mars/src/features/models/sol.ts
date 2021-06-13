import { BaseEntity, Id } from '../../app/models/base';

interface Camera {
    readonly full_name: string;
}

interface Rover {
    readonly name: string;
}

export interface SolPhotoData extends BaseEntity {
    readonly camera: Camera;
    readonly rover: Rover;
    readonly img_src: string;
}

export interface SolPhotosResponse {
    readonly photos: SolPhotoData[];
}

export interface PhotoIds {
    readonly photoIds: Id[];
}

export interface SolData extends PhotoIds {
    readonly solNumber: Id;
}