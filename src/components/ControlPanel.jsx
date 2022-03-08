import React, { useContext } from 'react';
import JediContext from '../context/JediContext';
import './styles/ControlPanel.css';

function ControlPanel() {
  const { handleClickToFilter,
    inputs, handleChange, filtersInputs } = useContext(JediContext);
  const { name, category, comparison, value } = inputs;
  return (
    <section className="control-panel">

      {/* Filter by planet name form */}
      <form>
        <label
          className="planet-filter planet-search-control"
          htmlFor="planet-search-box"
        >
          <span>Planet Name</span>
          <input
            data-testid="name-filter"
            name="name"
            id="planet-search-box"
            type="text"
            autoComplete="off"
            onChange={ handleChange }
            value={ name }
            placeholder="Tatooine..."
          />
          <span>
            {`Filter planets by the name of the world 
            in the vast universe in a Galaxy far far away...`}
          </span>
        </label>
      </form>

      {/* Filter by other filters form */}
      <span className="other-text">Other Filters</span>
      <form className="other-filters planet-search-control">

        <label htmlFor="column-filter" className="planet-filter other">
          <span>Category</span>
          <select
            id="column-filter"
            data-testid="column-filter"
            name="category"
            onChange={ handleChange }
            value={ category }
          >
            {filtersInputs.population ? (
              <option value="population">population</option>
            ) : null}
            {filtersInputs.orbital_period ? (
              <option value="orbital_period">orbital_period</option>
            ) : null}
            {filtersInputs.diameter ? (
              <option value="diameter">diameter</option>
            ) : null}
            {filtersInputs.rotation_period ? (
              <option value="rotation_period">rotation_period</option>
            ) : null}
            {filtersInputs.surface_water ? (
              <option value="surface_water">surface_water</option>
            ) : null}
          </select>
          <span>Filter infos by Category</span>
        </label>

        <label htmlFor="comparison-filter" className="planet-filter other">
          <span>Comparison</span>
          <select
            id="comparison-filter"
            data-testid="comparison-filter"
            name="comparison"
            onChange={ handleChange }
            value={ comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <span>Filter infos by Comparison</span>
        </label>
        <label htmlFor="value-filter" className="planet-filter other">
          <span>Value</span>
          <input
            id="value-filter"
            type="number"
            data-testid="value-filter"
            name="value"
            onChange={ handleChange }
            value={ value }
          />
          <span>Filter infos by Value</span>
        </label>
        <button
          type="button"
          data-testid="button-filter"
          className="button-filter"
          onClick={ handleClickToFilter }
        >
          Filtrar
        </button>

      </form>
    </section>
  );
}

export default ControlPanel;
