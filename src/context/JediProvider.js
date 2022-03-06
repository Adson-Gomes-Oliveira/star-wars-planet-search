import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import JediContext from './JediContext';
import getPlanetsAndInfo from '../services/starWarsAPI';

function JediProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsFilter, setFilterPlanet] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
  });
  const [nameFilter, setNameFilter] = useState('');
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

  useEffect(() => {
    setFilterPlanet(planets);
  }, [planets]);

  const handleFilter = ({ target }) => {
    setNameFilter(target.value);
    setFilters({ filterByName: { name: target.value } });
    const filtering = planets.filter(
      (planet) => planet.name.includes(target.value),
    );
    setFilterPlanet(filtering);
  };

  return (
    <JediContext.Provider
      value={ {
        planets: planetsFilter,
        loading,
        nameFilter,
        handleFilter,
        filters,
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
