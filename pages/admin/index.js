import React, { useEffect, useState } from "react";
import Link from "next/link";
import TravelModal from "../../components/modals/travelModal";
import AboutModal from "../../components/modals/AboutModal";
import AdminModal from "../../components/modals/AdminModal";
import UploadImgModal from "../../components/modals/UploadImgModal";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";

const fetcher = (...args) => axios(...args).then((res) => res.data);

const Index = () => {
  const [openTravelModal, setOpenTravelModal] = useState(false);
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [openUploadImgModal, setOpenUploadImgModal] = useState(false);
  const [travelId, setTravelId] = useState(null);

  const { data, error } = useSWR("/api/travels", fetcher);

  const { mutate } = useSWRConfig();

  function onClickHandler(id) {
    setOpenUploadImgModal(true);
    setTravelId(id);
  }

  return (
    <>
      {error && <p>API could not be loaded</p>}
      {!data && <p>API loading...</p>}

      <div className="admin">
        <div className="admin__nav">
          <div className="admin__nav__item">Admin</div>
          <div className="admin__nav__item">
            <div className="admin__nav__item__btns">
              <div>
                <Button
                  className="btn-sm"
                  onClick={() => {
                    setOpenAdminModal(true);
                  }}
                >
                  Edit About
                </Button>
              </div>
              <div>
                <Button
                  className="btn-sm ml-5"
                  onClick={() => {
                    setOpenTravelModal(true);
                  }}
                >
                  Add Travel
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="admin__workspace">
          <div className="travField">
            <h5>My Travels</h5>
            <ul className="travField__list">
              {data &&
                data.map(({ trav_id, trav_name, trav_year }) => (
                  <li className="travField__list__item" key={trav_id}>
                    <div className="travField__list__item__name">
                      {trav_name}
                    </div>
                    <div className="travField__list__item__year">
                      {trav_year}
                    </div>
                    <div className="travField__list__item__btns">
                      <button
                        className="travField__list__item__btns__btn add"
                        onClick={() => {
                          onClickHandler(trav_id);
                        }}
                      >
                        +<AiFillPicture />
                      </button>
                      <button className="travField__list__item__btns__btn delete">
                        <Link href={`admin/${trav_id}`}>
                          <a>
                            -<AiFillPicture />
                          </a>
                        </Link>
                      </button>
                      <button
                        className="travField__list__item__btns__btn delete"
                        onClick={async (e) => {
                          e.preventDefault();
                          await axios.delete(`/api/travels/${trav_id}`);
                          mutate("/api/travels");
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {openTravelModal && <TravelModal closeModal={setOpenTravelModal} />}
        {openAboutModal && <AboutModal closeModal={setOpenAboutModal} />}
        {openAdminModal && <AdminModal closeModal={setOpenAdminModal} />}
        {openUploadImgModal && (
          <UploadImgModal
            travId={travelId}
            closeModal={setOpenUploadImgModal}
          />
        )}
      </div>
    </>
  );
};

export default Index;
