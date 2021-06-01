import React from 'react';
import SolPhoto from './SolPhoto';
import { render } from '@testing-library/react';
import { FavIcon } from '../../Icons/Icons';

describe('SolPhoto Component', () => {
  const imageSrc =
    'https://mars.nasa.gov/msl-raw-images/msss/00001/mhli/0001MH0000002000I1_DXXX.jpg';

  it('has a correct template #1', () => {
    const { container } = render(
      <SolPhoto photoSrc={imageSrc} title="Nasa Photo" icon={<FavIcon />} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
