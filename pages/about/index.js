import React from "react";
import Head from "next/head";
import axios from "axios";

export const getStaticProps = async () => {
  const { data: admins } = await axios("http://localhost:3000/api/users");

  return {
    props: {
      admins,
    },
    revalidate: 60 * 60 * 24,
  };
};

const about = ({ admins }) => {
  return (
    <>
      <Head>
        <title>AG Photography | about</title>
      </Head>
      <div>
        {admins.map(
          ({ admin_id, admin_name, admin_lastname, admin_info, admin_url }) => (
            <div className="about-container" key={admin_id}>
              <h2>About {admin_name}</h2>
              <img src={admin_url}></img>
              <p>{admin_info}</p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default about;
