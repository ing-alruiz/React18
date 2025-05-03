import { useState,useEffect, use } from 'react';
import React from 'react';
import styles from './Home.module.css';

import {fetchData} from '../../Api/apiService'; // Adjust the path as necessary
import apiEndpoints from '../../Api/apiEndpoints';

import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import CharacterCard from '../../Components/Character/CharacterCard/CharacterCard';
import EpisodeCard from '../../Components/Episodios/EpisodioCard/EpisodeCard'; // Adjust the path as necessary

    
const Home = () => {

    const [characters, setCharacters] = useState([null, null, null]);
    const [episodes, setEpisodes] = useState([null, null, null]);
    const [loading, setLoading] = useState(true);

    const loadCharacters = () => {
        setTimeout(() => {
            const fetchCharacters = async () => {
                try {
                    const data = await fetchData(apiEndpoints.characters);
                    setCharacters(data.results.slice(0, 9)); // Get the first 3 characters
                } catch (error) {
                    console.error('Error fetching characters:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchCharacters();
        }, 2000); // Simulate a 2-second loading time
    }

    const loadEpisodes = () => {
        setTimeout(() => {
            const fetchEpisodes = async () => {
                try {
                    const data = await fetchData(apiEndpoints.episodes);
                    setEpisodes(data.results.slice(0, 9)); // Get the first 3 characters
                } catch (error) {
                    console.error('Error fetching characters:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchEpisodes();
        }, 3000); // Simulate a 2-second loading time
    }

    useEffect(() => {
        loadCharacters();
        loadEpisodes();
    }, []);

    return (
        <div className='' >
            {/* <Nav /> */}
            <div className={styles.backgroundImage}>
                <h1 className={styles.title}>Bienvenidos a la página de Rick y Morty</h1>
                <p className={styles.description}>Explora el multiverso de Rick y Morty</p>
            </div>
            <div className={styles.characterTitle}>
                <h2>Personajes</h2>
            </div>
            <div className={styles.characterContainer}>
                {characters.map((character, index) => (
                    <CharacterCard key={index} character={character} loading={loading} />
                ))}
            </div>
            <div className={styles.characterTitle}>
                <h2>Episodios</h2>
            </div>
            <div className={styles.characterContainer}>
                {episodes.map((episode, index) => (
                    <EpisodeCard key={index} episode={episode} loading={loading} />
                ))}
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Home;