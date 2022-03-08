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
  const [filtersInputs, setFiltersInput] = useState({
    rotation_period: 'rotation_period',
    orbital_period: 'orbital_period',
    diameter: 'diameter',
    surface_water: 'surface_water',
    population: 'population',
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

  useEffect(() => {
    const { name } = filters.filterByName;
    const filter = planets.filter((planet) => planet.name.includes(name));
    setFilterPlanet(filter);
  }, [filters.filterByName, planets]);

  useEffect(() => {
    if (filters.filterByNumericValue.length > 0) {
      filters.filterByNumericValue.forEach((filter) => {
        const { column, comparison, value } = filter;
        switch (comparison) {
        case 'maior que':
          setFilterPlanet((previous) => previous.filter((planet) => planet[column]
          > value));
          break;

        case 'menor que':
          setFilterPlanet((previous) => previous.filter((planet) => planet[column]
          < value));
          break;

        case 'igual a':
          setFilterPlanet((previous) => previous.filter((planet) => planet[column]
          === parseInt(value, 10)));
          break;

        default:
          break;
        }
      });
    }
  }, [filters.filterByNumericValue, planets]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });

    if (target.name === 'name') {
      setFilters({
        ...filters,
        filterByName: { name: value },
      });
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

    const newInputs = filtersInputs;
    delete newInputs[inputs.category];
    setFiltersInput(newInputs);

    planets.forEach((planet) => {
      planet.population = parseInt(planet.population, 10);
      planet.rotation_period = parseInt(planet.rotation_period, 10);
      planet.orbital_period = parseInt(planet.orbital_period, 10);
      planet.diameter = parseInt(planet.diameter, 10);
      planet.surface_water = parseInt(planet.surface_water, 10);
    });
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
        filtersInputs,
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
