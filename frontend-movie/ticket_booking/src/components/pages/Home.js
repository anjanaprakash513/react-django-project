import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarHome from "../Navbar/NavbarHome";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((store) => store.auth.user);
  const token = user?.token || "";

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    axios
      .get('http://127.0.0.1:8000/admin/listmovies', {
          headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
          setPosts(response.data);
          setLoading(false);
      })
      .catch((error) => {
          setError(error.message);
          setLoading(false);
      });
  }

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  <div>
    <NavbarHome/>
    <div className="container">
      <h1 className="text-center my-4">Movies</h1>
      <div className="row">
        {posts.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card h-100">
              {/* Conditionally render the image based on the movie status */}
              {movie.status === 'active' ? (
                <Link to={"/movies/posts/"+movie.id+"/view"}>
                  <img
                    src={movie.poster_url}
                    className="card-img-top"
                    alt={movie.title}
                    style={{ maxHeight: "350px", maxWidth: "250px" }} // Adjust height and object-fit style as needed
                  />
                </Link>
              ) : (
                <img
                  src={movie.poster_url}
                  className="card-img-top"
                  alt={movie.title}
                  style={{ maxHeight: "350px", maxWidth: "250px", pointerEvents: 'none' ,opacity:'.5' }} // Adjust height and object-fit style as needed
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                {/* Remove the Link component here */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default Home;
