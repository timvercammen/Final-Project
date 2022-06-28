import React, { useState } from "react";
import axios from "axios";
import ImgFullModal from "../../components/modals/ImgFullModal";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardColumns,
  CardImg,
} from "reactstrap";

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
    setClickedId(img_id);
    setClickedImg(img_url);
    setOpenImgFullModal(true);
  }

  return (
    <div className="travelImgs">
      <div className="travelImgs__header">
        <h1>{travel[0].trav_name}</h1>
        <p>{travel[0].trav_info}</p>
      </div>
      <Container>
        <Row>
          {travel.map(({ trav_id, img_id, img_url, img_name }) => (
            <Col
              key={img_id}
              lg={4}
              onClick={() => handleClick(img_id, img_url)}
            >
              <div className="travelImgs__wrapper">
                {img_url && (
                  <div className="travelImgs__wrapper__wrapper-images">
                    <img
                      src={img_url}
                      alt="/"
                      className="travelImgs__wrapper__wrapper-images__image"
                    />
                  </div>
                )}
              </div>
            </Col>
          ))}
          {openImgFullModal && (
            <ImgFullModal
              clickedId={clickedId}
              clickedImg={clickedImg}
              closeModal={setOpenImgFullModal}
            />
          )}
        </Row>
      </Container>
    </div>
  );
};
export default Detail;
