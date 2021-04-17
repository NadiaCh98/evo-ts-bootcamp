import React from 'react';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import unsplash from '../unsplash-api';
import styled from 'styled-components';
import Photo from '../Photo/Photo';

interface PictureModel {
    id: string;
    url: string;
}

type Picture = Readonly<PictureModel>;

interface PictutesGalleryState {
    readonly pictures: Picture[];
}

const StyledPicturesGallery = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

class PicturesGallery extends React.Component<{}, PictutesGalleryState> {

    state = {
        pictures: []
    }

    async componentDidMount() {
        unsplash.search.getPhotos({
            page: 1,
            perPage: 30,
            query: 'forest',

        }).then((resp: ApiResponse<Photos>) => {
            const results = resp.response?.results;
            if (!!results && results.length > 0) {
                const pictures: Picture[] = results
                    .map((photo: Basic) => ({
                        id: photo.id,
                        url: photo.urls.small,
                    }));
                this.setState({ pictures });
            }
        });
    }

    render() {
        return (
            <StyledPicturesGallery>
                {this.state.pictures.map((photo: Picture) => <Photo key={photo.id} imageUrl={photo.url} />)}
            </StyledPicturesGallery>
        );
    }
}

export default PicturesGallery;