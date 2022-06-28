import Link from "next/link";
import React from "react";
import axios from "axios";

const Travel = ({ trav_id, trav_name, trav_year }) => {
  return (
    <div className="travField">
      <ul className="travField__list">
        <li className="travField__list__item" key={trav_id}>
          <div className="travField__list__item__name">
            {trav_name}
            {trav_id}
          </div>
          <div className="travField__list__item__year">{trav_year}</div>
          <div className="travField__list__item__amount">
            amount of pictures
          </div>
          <div className="travField__list__item__btns">
            <button key={trav_id} className="travField__list__item__btns__btn">
              <Link href={`/travels/${trav_id}`}>Edit</Link>
            </button>
            <button>Delete</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Travel;
