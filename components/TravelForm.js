import React, { useEffect, useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import axios from "axios";

const defaultInputs = {
  country: "",
  year: "",
  info: "",
  long: "",
  lat: "",
  continent: "",
};

const TravelForm = () => {
  const [inputs, setInputs] = useState(defaultInputs);
  const [travelData, setTravelData] = useState([]);

  const { country, year, info, long, lat, continent } = inputs;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/continents");
      setTravelData(data);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const travel = {
      trav_name: country,
      trav_year: year,
      trav_info: info,
      trav_long: long,
      trav_lat: lat,
      trav_cont_id: continent,
    };
    try {
      const data = await axios.post("/api/travels", travel);
    } catch (error) {}
  };

  return (
    <Form className="inputs" onSubmit={handleSubmit} method="post">
      <div className="inputs__field">
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Country name"
          onChange={({ target }) =>
            setInputs((prev) => ({ ...prev, country: target.value }))
          }
          required
        />
      </div>
      <div className="inputs__field">
        <Input
          type="text"
          id="year"
          name="year"
          placeholder="Year"
          onChange={({ target }) =>
            setInputs((prev) => ({ ...prev, year: target.value }))
          }
          required
        />
      </div>
      <div className="inputs__field">
        <Input
          type="textarea"
          id="info"
          name="info"
          placeholder="About the travel..."
          onChange={({ target }) =>
            setInputs((prev) => ({ ...prev, info: target.value }))
          }
          required
        />
      </div>
      <div className="inputs__field">
        <Input
          type="text"
          id="long"
          name="long"
          placeholder="Longitude"
          onChange={({ target }) =>
            setInputs((prev) => ({ ...prev, long: target.value }))
          }
          required
        />
      </div>
      <div className="inputs__field">
        <Input
          type="text"
          id="lat"
          name="lat"
          placeholder="Latitude"
          onChange={({ target }) =>
            setInputs((prev) => ({ ...prev, lat: target.value }))
          }
          required
        />
      </div>
      <div className="inputs__field">
        <Input
          type="select"
          id="cont"
          name="cont"
          placeholder="Continent"
          onChange={({ target }) =>
            setInputs((prev) => ({ ...prev, continent: target.value }))
          }
          required
        >
          {travelData &&
            travelData.map(({ cont_id, cont_name }) => (
              <option key={cont_id} value={cont_id}>
                {cont_name}
              </option>
            ))}
        </Input>
      </div>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default TravelForm;
