import React from 'react';
import styles from './CharacterCard.module.css';

const CharacterCard = ({ character }) => {
    if (!character) {
        // Render a loading placeholder when character is null
        return (
            <div className={`${styles.card} ${styles.loadingCard}`}>
                <div className={styles.imagePlaceholder}></div>
                <div className={styles.content}>
                    <div className={styles.namePlaceholder}></div>
                    <div className={styles.statusPlaceholder}></div>
                    <div className={styles.locationPlaceholder}></div>
                    <div className={styles.episodePlaceholder}></div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <img src={character.image} alt={character.name} className={styles.image} />
            <div className={styles.content}>
                <h2 className={styles.name}>{character.name}</h2>
                <p className={styles.status}>
                    <span
                        className={`${styles.statusIndicator} ${
                            character.status === 'Alive'
                                ? styles.alive
                                : character.status === 'Dead'
                                ? styles.dead
                                : styles.unknown
                        }`}
                    ></span>
                    {character.status} - {character.species}
                </p>
                <p className={styles.location}>
                    <span className={styles.label}>Last known location:</span> {character.location.name}
                </p>
                <p className={styles.episode}>
                    <span className={styles.label}>First seen in:</span> {character.episode[0]}
                </p>
            </div>
        </div>
    );
};

export default CharacterCard;