import React from 'react'
import { places } from '../data';
import { Link } from 'react-router-dom';
import styles from './Places.module.css'

const Places = () => {
  return(
     <div className={styles.places}>
  <h1>Explore Top Places</h1>
  <p>
  Discover a diverse selection of vacation rentals tailored to suit every traveler's needs. Immerse yourself in local culture, relish the comforts of home, and craft unforgettable memories in your ideal destination.
  </p>

  <div className={styles.places_list}>
    {places.slice(0, 5).map((place, index) => (
      <Link key={index} to={`/properties/place/${place.label}`}>
        <div className={styles.place} key={index}>
          <img className={styles.image}src={place.img} alt={place.label} />
          <div className={styles.overlay}></div>
          <div className={styles.place_text}>
            <div className={styles.places_text_icon}>{place.icon}</div>
            <p>{place.label}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>
);
}

export default Places