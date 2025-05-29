import React from 'react';
import styles from './PetAdvantages.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDog,
  faStar,
  faUserFriends,
  faBath,
  faHeartbeat,
  faWalking,
  faGift,
  faPaw
} from '@fortawesome/free-solid-svg-icons';

const advantages = [
  {
    icon: faDog,
    title: 'Diversidad de servicios',
    desc: 'Desde guardería hasta entrenamiento y spa para tu mascota.'
  },
  {
    icon: faStar,
    title: 'Experiencia en cuidado',
    desc: 'Personal capacitado y amante de los animales.'
  },
  {
    icon: faUserFriends,
    title: 'Trato personalizado',
    desc: 'Atención individual para cada mascota.'
  },
  {
    icon: faBath,
    title: 'Instalaciones renovadas',
    desc: 'Áreas limpias, seguras y modernas.'
  },
  {
    icon: faHeartbeat,
    title: 'Atención veterinaria',
    desc: 'Cuidado profesional y emergencias 24/7.'
  },
  {
    icon: faWalking,
    title: 'Paseos y recreación',
    desc: 'Ejercicio y juegos diarios supervisados.'
  },
  {
    icon: faGift,
    title: 'Programas de fidelidad',
    desc: 'Premios y descuentos para clientes frecuentes.'
  },
  {
    icon: faPaw,
    title: 'Compromiso con el bienestar',
    desc: 'Ambiente seguro y feliz para tu mascota.'
  }
];

const PetAdvantages = () => (
  <section className={styles.advantagesSection}>
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.subtitle}>LO QUE NOS HACE DIFERENTES</p>
        <h2 className={styles.title}>Ventajas y servicios</h2>
        <p className={styles.desc}>
          En nuestro hotel de mascotas nos comprometemos a ofrecerte el mejor cuidado y experiencia para tu compañero. Descubre todos los beneficios que tenemos para ti y tu mascota.
        </p>
      </div>
      <div className={styles.grid}>
        {advantages.map((item, idx) => (
          <div className={styles.advantage} key={idx}>
            <FontAwesomeIcon icon={item.icon} size="2x" className={styles.icon} />
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PetAdvantages;