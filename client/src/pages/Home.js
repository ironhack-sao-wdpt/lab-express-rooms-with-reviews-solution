import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../apis/api";

function Home() {
  const [state, setState] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await api.get("/room");

        setState([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRooms();
  }, []);

  return (
    <div className="row">
      {state.map((room) => {
        const { _id, name, description, imageUrl, reviews } = room;

        return (
          <div
            key={_id}
            className="col-12 col-lg-6"
            onClick={() => navigate(`/room/${_id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="card">
              <img src={imageUrl} className="card-img-top" alt={description} />
              <div className="card-body">
                <small>{reviews.length} avaliações</small>
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
