import React from 'react';
import styles from './EpisodeCard.module.css';

const EpisodeCard = ({ episode }) => {
    if (!episode) {
        // Render a loading placeholder when episode is null
        return (
            <div className={`${styles.card} ${styles.loadingCard}`}>
                <div className={styles.titlePlaceholder}></div>
                <div className={styles.datePlaceholder}></div>
                <div className={styles.episodePlaceholder}></div>
                <div className={styles.charactersPlaceholder}></div>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h2 className={styles.name}>{episode.name}</h2>
                <p className={styles.airDate}>
                    <span className={styles.label}>Air Date:</span> {episode.air_date}
                </p>
                <p className={styles.episodeCode}>
                    <span className={styles.label}>Episode:</span> {episode.episode}
                </p>
                <p className={styles.characters}>
                    <span className={styles.label}>Characters:</span> {episode.characters.length} characters
                </p>
            </div>
        </div>
    );
};

export default EpisodeCard;