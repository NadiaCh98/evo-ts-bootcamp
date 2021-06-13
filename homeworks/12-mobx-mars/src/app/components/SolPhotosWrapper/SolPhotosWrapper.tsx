import React from 'react';
import { SelectIdHandler } from '../../../features/models/callbackTypes';
import { SolPhotoData } from '../../../features/models/sol';
import SolPhoto from './SolPhoto/SolPhoto';
import styles from './SolPhotosWrapper.module.css';

interface SolPhotosWrapperProps {
  readonly photos: SolPhotoData[];
  readonly photoIcon: React.ElementType;
  readonly iconClick: SelectIdHandler;
}

export const SolPhotosWrapper = ({
  children,
  photos,
  photoIcon,
  iconClick,
}: React.PropsWithChildren<SolPhotosWrapperProps>): React.ReactElement => {
  const IconComponent = photoIcon;
  return (
    <section className={styles.SolPhotosWrapper}>
      <div data-testid="header" className={styles.SolPhotosWrapper__header}>
        {children}
      </div>
      <div
        data-testid="container"
        className={styles.SolPhotosWrapper__container}
      >
        {photos.map((photo) => (
          <SolPhoto
            key={photo.id}
            icon={
              <IconComponent
                data-testid={`icon-${photo.id}`}
                onClick={() => iconClick(photo.id)}
              />
            }
            title={`Rover: ${photo.rover.name}, Camera: ${photo.camera.full_name}`}
            photoSrc={photo.img_src}
          />
        ))}
      </div>
    </section>
  );
};
