import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SolPhotoData } from '../../../features/models/sol';
import { FavIcon } from '../Icons/Icons';
import { SolPhotosWrapper } from './SolPhotosWrapper';

describe('SolPhotoWrapper Component', () => {
  const photos: SolPhotoData[] = [
    {
      id: 1,
      camera: {
        full_name: 'Camera',
      },
      img_src:
        'https://mars.nasa.gov/msl-raw-images/msss/00001/mhli/0001MH0000002000I1_DXXX.jpg',
      rover: {
        name: 'Rover',
      },
    },
    {
      id: 2,
      camera: {
        full_name: 'Camera1',
      },
      img_src:
        'https://mars.nasa.gov/msl-raw-images/msss/00001/mhli/0001MH0000002000I1_DXXX.jpg',
      rover: {
        name: 'Rover2',
      },
    },
  ];

  const iconClickMock = jest.fn();
  const solPhotosWrapper = (
    <SolPhotosWrapper
      photos={photos}
      photoIcon={FavIcon}
      iconClick={iconClickMock}
    >
      <div>First Child</div>
    </SolPhotosWrapper>
  );

  it('assert SolPhotoWrapper render children correctly', () => {
    const { getByTestId } = render(solPhotosWrapper);
    expect(getByTestId('header').childElementCount).toBe(1);
  });

  it('assert SolPhotoWrapper render prop photos correctly', () => {
    const { getByTestId } = render(solPhotosWrapper);
    expect(getByTestId('container').childElementCount).toBe(photos.length);
  });

  it('assert iconClick is fired with correct params', () => {
    const { getByTestId } = render(solPhotosWrapper);
    fireEvent.click(getByTestId('icon-1'));
    expect(iconClickMock).toHaveBeenCalledWith(1);
  });
});
