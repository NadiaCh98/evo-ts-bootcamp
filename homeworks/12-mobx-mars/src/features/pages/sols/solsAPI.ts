import { SolPhotosResponse } from '../../models/sol';
import { AxiosResponse } from 'axios';
import server from '../../../axios-server';

interface UrlParams {
    readonly api_key: string;
    readonly [key: string]: number | string;
}

export function fetchSolPhotos(
    sol: number
): Promise<AxiosResponse<SolPhotosResponse>> {
    return server.get(`api/v1/rovers/curiosity/photos`, {
        params: {
            api_key: process.env.REACT_APP_NASA_APP_KEY,
            sol
        } as UrlParams
    });
}