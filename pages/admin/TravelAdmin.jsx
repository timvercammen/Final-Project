import React from "react";
import useSWR from "swr";
import axios from "axios";
import { useState, useEffect } from "react";

const fetcher = (...arg) => axios(...args).then((res) => res.data);

const TravelAdmin = () => {
  const { data, error } = useSWR("/api/travels", fetcher);
  // const { mutate } = useSWRConfig();

  useEffect(() => {}, [data]);

  return (
    <div>
      <ul>
        {data.map(({ trav_id, trav_name }) => (
          <li key={trav_id}>
            <span>{trav_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelAdmin;
