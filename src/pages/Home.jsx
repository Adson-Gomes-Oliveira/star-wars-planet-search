import React, { useContext } from 'react';
import JediContext from '../context/JediContext';
import './styles/Home.css';

function Home() {
  const { planets } = useContext(JediContext);

  return (
    <section className="star-wars">
      <table className="planets-table table table-striped table-dark">
        <thead>
          <tr role="row">
            <th role="columnheader">Name</th>
            <th role="columnheader">Rotation Period</th>
            <th role="columnheader">Orbital Period</th>
            <th role="columnheader">Diameter</th>
            <th role="columnheader">Climate</th>
            <th role="columnheader">Gravity</th>
            <th role="columnheader">Terrain</th>
            <th role="columnheader">Surface Water</th>
            <th role="columnheader">Population</th>
            <th role="columnheader">Films</th>
            <th role="columnheader">Created</th>
            <th role="columnheader">Edited</th>
            <th role="columnheader">Url</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => {
            const { name, rotation_period: rotation, orbital_period: orbital, diameter,
              climate, gravity, terrain, surface_water: water,
              population, films, created, edited, url } = planet;
            return (
              <tr key={ name }>
                <td role="cell" className="align-middle">{name}</td>
                <td role="cell" className="align-middle">{rotation}</td>
                <td role="cell" className="align-middle">{orbital}</td>
                <td role="cell" className="align-middle">{diameter}</td>
                <td role="cell" className="align-middle">{climate}</td>
                <td role="cell" className="align-middle">{gravity}</td>
                <td role="cell" className="align-middle">{terrain}</td>
                <td role="cell" className="align-middle">{water}</td>
                <td role="cell" className="align-middle">{population}</td>
                <td role="cell" className="align-middle">{films}</td>
                <td role="cell" className="align-middle">{created}</td>
                <td role="cell" className="align-middle">{edited}</td>
                <td role="cell" className="align-middle">{url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Home;
