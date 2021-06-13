import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import SolSelector from './SolSelector';

describe('SolSelector Component', () => {
  const loadMock = jest.fn();
  const changeSolMock = jest.fn();

  const solSelector = (
    <SolSelector loadSol={loadMock} sol={1} selectSol={changeSolMock} />
  );

  it('assert SolSelector change sol correctly and call `selectSol()` with consider number param', () => {
    const newValue = 5;
    const { getByTestId } = render(solSelector);
    fireEvent.change(getByTestId('solInput'), { target: { value: newValue } });
    expect((getByTestId('solInput') as HTMLInputElement).value).toBe(
      newValue.toString()
    );
    expect(changeSolMock).toHaveBeenCalledWith(newValue);
  });

  it('cassert SolSelector load button call `load()` by click', () => {
    const { getByText } = render(solSelector);
    fireEvent.click(getByText('Load'));
    expect(loadMock).toHaveBeenCalledTimes(1);
  });
});
