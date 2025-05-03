import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CharacterDetails.module.css';

const CharacterDetails = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        console.log('Fetching character with ID:', id);
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then((response) => response.json())
            .then((data) => setCharacter(data))
            .catch((error) => console.error('Error fetching character:', error));
    }, [id]);

    return (
        <>
           {character ? 
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
            :
            <h1 className={styles.title}>Loading...</h1>
           }
        </>
    );
}

export default CharacterDetails;