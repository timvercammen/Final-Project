import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Card = ({ trav_id, trav_name, trav_year }) => {
  return (
    <div className="container__card">
      <Link href={`/travel/${trav_id}`}>
        <div>
          <img
            className="container__card__img"
            src="/img/img1.jpg"
            alt="errorImg"
          ></img>
          <p className="container__card__title">
            {trav_name} - {trav_year}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
