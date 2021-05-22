import React from 'react';
import styles from './SolSelector.module.css';

interface SolSelectorProps {
  readonly sol: number;
  readonly selectSol: (sol: number) => void;
  readonly loadSol: () => void;
}

const SolSelector = ({ sol, selectSol, loadSol }: SolSelectorProps) => {
  const changeSol = (event: React.ChangeEvent<HTMLInputElement>) => {
    selectSol(+event.target.value);
  };
  return (
    <div className={styles.SolSelector}>
      <input
        data-testid="solInput"
        min="0"
        defaultValue={sol}
        type="number"
        onChange={changeSol}
      />
      <button onClick={loadSol}>Load</button>
    </div>
  );
};

export default React.memo(SolSelector);
