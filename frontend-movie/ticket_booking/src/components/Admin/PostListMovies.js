import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostListMovies(props) {
    function deletePost() {
        axios.delete('http://127.0.0.1:8000/admin/deletemovie/'+props.post.id).then(response=>{
            alert('delete movie')
            props.refresh()
        })
    }

    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";

    function toggleMovieStatus() {
        axios
          .put(
            `http://127.0.0.1:8000/admin/disable-enable/${props.post.id}`,
            {},
            {
              headers: { Authorization: "Bearer " + token },
            }
          )
          .then((response) => {
            props.refresh();
          })
          .catch((error) => {
            console.error("Error toggling movie status:", error);
          });
      }


return (
    <div className="card" style={{ maxWidth: "250px", margin: "10px" }}>
    <img src={props.post.poster_url} className="card-img-top" alt={props.post.title} />
    <div className="card-body">
        <div>
        <Link to={"/movies/posts/" + props.post.id + "/edit"} className="btn btn-primary btn-sm">Edit</Link>
            <button className="btn btn-danger btn-sm" onClick={deletePost}>Delete</button>
            <button className={`btn ${props.post.status === "active" ? "btn-success" : "btn-secondary"}`}onClick={toggleMovieStatus}>
              {props.post.status === "active" ? "Disable" : "Enable"}
            </button>
        </div>
    </div>
</div>
    );
}

export default PostListMovies;
