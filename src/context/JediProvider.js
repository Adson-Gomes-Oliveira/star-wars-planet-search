import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import JediContext from './JediContext';
import getPlanetsAndInfo from '../services/starWarsAPI';

function JediProvider({ children }) {
  const [planets, setPlanets] = useState([]); // Array received from API fetch
  const [planetsFilter, setFilterPlanet] = useState([]); // New array after being filtered
  const [inputs, setInputs] = useState({ // Values of inputs and selects of control panel
    name: '',
    category: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filters, setFilters] = useState({ // Rules to filter the array
    filterByName: { name: '' },
    filterByNumericValue: [],
  });
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

  useEffect(() => { // Assign to the planetsFilter the same value of planets
    setFilterPlanet(planets);
  }, [planets]);

  const filterByPlanetName = (value) => {
    setFilters({ filterByName: { name: value } });
    const filter = planets.filter(
      (planet) => planet.name.includes(value),
    );
    setFilterPlanet(filter);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });

    if (target.name === 'name') {
      filterByPlanetName(value);
    }
  };

  const handleClickToFilter = () => {
    setFilters({
      ...filters,
      filterByNumericValue: [...filters.filterByNumericValue, {
        column: inputs.category,
        comparison: inputs.comparison,
        value: inputs.value,
      }],
    });

    planets.forEach((planet) => {
      planet.population = parseInt(planet.population, 10);
      planet.rotation_period = parseInt(planet.rotation_period, 10);
      planet.orbital_period = parseInt(planet.orbital_period, 10);
      planet.diameter = parseInt(planet.diameter, 10);
      planet.surface_water = parseInt(planet.surface_water, 10);
    });

    if (inputs.comparison === 'maior que') {
      const filterByOthers = planets.filter((planet) => planet[inputs.category]
    > inputs.value);
      setFilterPlanet(filterByOthers);
    } else if (inputs.comparison === 'menor que') {
      const filterByOthers = planets.filter((planet) => planet[inputs.category]
    < inputs.value);
      setFilterPlanet(filterByOthers);
    } else if (inputs.comparison === 'igual a') {
      const filterByOthers = planets.filter((planet) => planet[inputs.category]
    === parseInt(inputs.value, 10));
      setFilterPlanet(filterByOthers);
    } else {
      setLoading(true);
    }
  };

  return (
    <JediContext.Provider
      value={ {
        planets: planetsFilter,
        loading,
        handleChange,
        handleClickToFilter,
        inputs,
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
