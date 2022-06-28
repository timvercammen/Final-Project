import React, { useState } from "react";
import axios from "axios";
import ImgFullModal from "../../components/modals/ImgFullModal";
import { Table } from "reactstrap";

export const getStaticPaths = async () => {
  const { data: travels } = await axios("http://localhost:3000/api/travels");

  const paths = travels.map((travel) => {
    return {
      params: { trav_id: `${travel.trav_id}` },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.trav_id;
  const { data: travel } = await axios(
    "http://localhost:3000/api/travels/" + id
  );

  return {
    props: {
      travel,
    },
  };
};

const Detail = ({ travel }) => {
  const [openImgFullModal, setOpenImgFullModal] = useState(false);
  const [clickedImg, setClickedImg] = useState();
  const [clickedId, setClickedId] = useState();

  function handleClick(img_id, img_url) {
    setClickedImg(img_id);
    setClickedImg(img_url);
    setOpenImgFullModal(true);
  }

  return (
    <>
      <div className="imgField">
        <h2 className="imgField__title">Image Control</h2>
        <ul className="imgField__list">
          {travel.map(({ trav_id, img_id, img_url, img_name }) => (
            <div>
              {img_url && (
                <li className="imgField__list__item" key={img_id}>
                  <img
                    src={img_url}
                    alt="/"
                    className="imgField__list__item__img"
                    onClick={() => handleClick(img_id, img_url)}
                  />
                  <p>{img_name}</p>
                  <button
                    className="imgField__list__item__btn delete"
                    onClick={async (e) => {
                      e.preventDefault();
                      await axios.delete(`/api/photos/${img_id}`);
                    }}
                  >
                    Delete
                  </button>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Detail;
