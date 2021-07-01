import React, { ReactElement } from 'react';
import styles from './SolPhoto.module.css';

interface SolPhotoProps {
  readonly photoSrc: string;
  readonly title: string;
  readonly icon: ReactElement;
}

const SolPhoto: React.FC<SolPhotoProps> = ({
  photoSrc,
  title,
  icon,
}: SolPhotoProps) => {
  return (
    <div className={styles.SolPhoto}>
      {icon}
      <img src={photoSrc} alt={photoSrc} />
      <p>{title}</p>
    </div>
  );
};

export default SolPhoto;
