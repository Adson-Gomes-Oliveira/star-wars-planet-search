import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import JediContext from './JediContext';
import getPlanetsAndInfo from '../services/starWarsAPI';

function JediProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { // Calling Star Wars API
    const fetchPlanets = async () => {
      setLoading(true);
      try {
        const data = await getPlanetsAndInfo();
        setPlanets(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <JediContext.Provider
      value={ {
        planets,
        loading,
      } }
    >
      {children}
    </JediContext.Provider>
  );
}

JediProvider.propTypes = {
  children: PropTypes.shape,
}.isRequired;

export default JediProvider;
