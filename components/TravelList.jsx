import React from "react";
import db, { nest } from "../../db";

const TravelList = ({ travels }) => {
  return (
    <div>
      <main>
        <h1>Data with childtables</h1>
        {travels.map(
          ({
            trav_id,
            trav_name,
            trav_year,
            trav_cont_id,
            trav_long,
            trav_lat,
            images,
          }) => (
            <details key={trav_id}>
              <summary>
                {trav_name} (year: {trav_year})
              </summary>
              <ul>
                <li>
                  <p>Continent id: {trav_cont_id}</p>
                </li>
                <li>
                  <p>Longitude: {trav_long}</p>
                </li>
                <li>
                  <p>Latitude: {trav_lat}</p>
                </li>
                <li>
                  <p>Images:</p>
                  <ul>
                    {images.map(({ img_id, img_name, img_img }) => (
                      <li key={img_id}>
                        <p>{img_name}</p>
                        {img_img}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </details>
          )
        )}
      </main>
    </div>
  );
};

export default TravelList;
