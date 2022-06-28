import React from "react";
import Link from "next/link";
import axios from "axios";

export const getStaticProps = async () => {
  const { data: travels } = await axios(
    "http://localhost:3000/api/travels/travelsImg"
  );

  return {
    props: {
      travels,
    },
    revalidate: 60 * 60 * 24,
  };
};

const Index = ({ travels }) => {
  return (
    <>
      <section className="containermap">
        {travels.map((travel) => (
          <article className="containermap__card" key={travel.trav_id}>
            <Link href={`/travels/${travel.trav_id}`}>
              <a>
                <img
                  className="containermap__card__img"
                  src={travel.img_url}
                  alt="/img/fallback.jpg"
                />
                <p className="containermap__card__title">
                  {travel.trav_name} - {travel.trav_year}
                </p>
              </a>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
};

export default Index;
