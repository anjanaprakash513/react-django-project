import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostListMovies from "./PostListMovies";
import { useSelector } from "react-redux";
import NavbarAdmin from "../Navbar/NavbarAdmin";
import Navbar from "../Navbar/Navbar";

function ListMovie() {
    var [posts, setPosts]=useState([]);
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
        // setFilteredPosts(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // You might want to handle this error more gracefully
        // setLoading(false);
      });
  }

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

    return (
      <div>
        <NavbarAdmin/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-4">Movies</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-2">
                    <Link to="/addmovies" className="btn btn-info mb-2">Add movies</Link>
                  </div>
                <div key={posts.id}  className="col-md-3 mb-4">
                    {posts.map(post =><PostListMovies key={post.id} post={post} refresh={fetchPosts}/>)}
                </div>
            </div>
        </div>
      </div>
    )
}

export default ListMovie;