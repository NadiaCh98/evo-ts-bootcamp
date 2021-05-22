import { SolPhotosResponse } from './../../models/sol';
import { fetchSolPhotos } from './solsAPI';
import server from '../../../axios-server';
import { mocked } from 'ts-jest/utils'

jest.mock('../../../axios-server');

describe('Sols API', () => {
  
  const axiosServerGetMocked = mocked(server.get);

  afterAll(() => {
    axiosServerGetMocked.mockReset();
  });

  it('fetch sols successfully data from API', async () => {
    const data: SolPhotosResponse = {
      photos: [
        {
          id: 1,
          camera: {
            full_name: 'Camera'
          },
          img_src: 'Image',
          rover: {
            name: 'Rover'
          }
        }
      ]
    };
    axiosServerGetMocked.mockResolvedValue(data);
    await expect(fetchSolPhotos(1)).resolves.toEqual(data);
  });
})