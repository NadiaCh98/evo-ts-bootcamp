import classes from './Photo.module.css';

interface PhotoProps {
    readonly imageUrl: string;
}

const Photo = ({ imageUrl }: PhotoProps) => <img className={classes.photo} alt={imageUrl} src={imageUrl} />;

export default Photo;