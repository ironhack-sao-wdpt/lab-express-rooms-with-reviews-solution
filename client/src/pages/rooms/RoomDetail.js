import { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";
import api from "../../apis/api";

import { AuthContext } from "../../contexts/authContext";

function RoomDetail() {
  const [state, setState] = useState({
    ownerId: {
      _id: "",
      name: "",
    },
    name: "",
    description: "",
    imageUrl: "",
    reviews: [],
  });

  const { _id } = useParams();

  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const response = await api.get(`/room/${_id}`);

        console.log(response.data);

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchRoom();
  }, [_id]);

  function isOwner() {
    return state.ownerId._id === loggedInUser.user._id;
  }

  return (
    <div>
      <img src={state.imageUrl} alt={state.description} />

      <div className="d-flex justify-content-between">
        <h2>{state.name}</h2>

        {isOwner() && (
          <div>
            <Link to={`/room/update/${_id}`} className="btn btn-warning me-3">
              Editar
            </Link>

            <Link to={`/room/delete/${_id}`} className="btn btn-danger">
              Deletar
            </Link>
          </div>
        )}
      </div>

      <p>
        <small>Hospedado por {state.ownerId.name}</small>
      </p>

      <p>{state.description}</p>

      <h3>Reviews</h3>

      {state.reviews.map((review) => {
        const { _id, comment } = review;
        const { name } = review.authorId;

        return (
          <div className="rounded border p-3 m-2" key={_id}>
            <p>{comment}</p>

            <small>Por {name}</small>
          </div>
        );
      })}
    </div>
  );
}

export default RoomDetail;
