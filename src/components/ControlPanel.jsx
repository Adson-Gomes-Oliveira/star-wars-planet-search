import React, { useContext } from 'react';
import JediContext from '../context/JediContext';

function ControlPanel() {
  const { nameFilter, handleFilter } = useContext(JediContext);
  return (
    <section className="control-panel">
      <form>
        <label htmlFor="planet-search-box">
          <span>Nome do planeta:</span>
          <input
            data-testid="name-filter"
            id="planet-search-box"
            type="text"
            onChange={ handleFilter }
            value={ nameFilter }
          />
        </label>
      </form>
    </section>
  );
}

export default ControlPanel;
