import React from 'react';
import styles from './Gallery.module.css';

// Only src and title in the array
const images = [
  { src: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', title: 'Tea tasting' },
  { src: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80', title: 'Plethora of books' },
  { src: 'https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=600&q=80', title: 'Chrysanthemum farm' },
  { src: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80', title: 'Agrotourism workshops' },
  { src: 'https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=600&q=80', title: 'Performances' },
  { src: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', title: 'A miniature village' },
  { src: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', title: 'Dog in lobby' },
  { src: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80', title: 'Cat in suite' },
  { src: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80', title: 'Playground fun' },
  { src: 'https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=600&q=80', title: 'Pet spa' },
  { src: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80', title: 'Puppy nap' },
  { src: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80', title: 'Kitten lounge' },
];

function getRandomSpan(min = 1, max = 2) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Gallery = () => (
  <div className={styles.galleryPage}>
    <h1 className={styles.title}>GALLERY</h1>
    <div className={styles.mosaic}>
      {images.map((img, idx) => {
        const col = getRandomSpan();
        const row = getRandomSpan();
        return (
          <div
            className={styles.mosaicItem}
            key={idx}
            style={{
              gridColumn: `span ${col}`,
              gridRow: `span ${row}`,
            }}
          >
            <img src={img.src} alt={img.title} />
            <div className={styles.caption}>
              {img.title}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Gallery;
