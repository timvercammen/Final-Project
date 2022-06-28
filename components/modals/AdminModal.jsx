import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Button } from "reactstrap";

const defaultInputs = {
  name: "",
  last_name: "",
  info: "",
  img_url: "",
};

function AdminModal({ closeModal }) {
  const [inputs, setInputs] = useState(defaultInputs);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: admins } = await axios.get("/api/users/1");
      setInputs(admins[0]);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`/api/users/1`, inputs);
    closeModal(false);
  };

  return (
    <div className="modalBg">
      <div className="modalBg__modal">
        <div className="modalBg__modal__closeBtn">
          <button
            className="modalBg__modal__closeBtn__btn"
            onClick={() => closeModal(false)}
          >
            X
          </button>
        </div>
        <div className="modalBg__modal__title">
          <h2>About Page</h2>
        </div>
        <div className="modalBg__modal__form">
          <div className="modalBg__modal__form__details">
            <Form className="inputs" onSubmit={handleSubmit} method="patch">
              <div className="inputs__field">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={inputs.admin_name}
                  placeholder="First name"
                  onChange={({ target }) =>
                    setInputs((prev) => ({ ...prev, admin_name: target.value }))
                  }
                  required
                />
              </div>
              <div className="inputs__field">
                <Input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={inputs.admin_lastname}
                  placeholder="Last name"
                  onChange={({ target }) =>
                    setInputs((prev) => ({
                      ...prev,
                      admin_lastname: target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="inputs__field">
                <Input
                  rows="8"
                  type="textarea"
                  id="info"
                  name="info"
                  value={inputs.admin_info}
                  placeholder="About yourself..."
                  onChange={({ target }) =>
                    setInputs((prev) => ({ ...prev, admin_info: target.value }))
                  }
                  required
                />
              </div>
              <div className="inputs__field">
                <Input
                  type="text"
                  id="img_url"
                  name="img_url"
                  value={inputs.admin_url}
                  placeholder="Url of your image"
                  onChange={({ target }) =>
                    setInputs((prev) => ({ ...prev, admin_url: target.value }))
                  }
                  required
                />
              </div>
              <Button type="submit" className="check">
                Edit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminModal;
