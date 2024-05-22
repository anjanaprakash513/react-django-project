import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


function ViewMovie() {
    const { postId } = useParams();
    const [post, setPost] = useState({ title: '', description: '', language: '', release_date:'', director: '', actors: '', poster_url: '',price:'',time:''});
    const navigate = useNavigate()
    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/admin/viewonemovie/'+postId, {
        headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setPost(response.data);
        }).catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [postId, token]);

    return (
        <>
        <Navbar/>
        
        <div className="container mt-5">
            
            <div className="row">
                {/* Left Column for Poster */}
                <div className="col-md-4">
                    <img style={{maxHeight:"500px"}} src={post.poster_url} alt={post.title} className="img-fluid rounded" />
                </div>
                {/* Right Column for Movie Details */}
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title">{post.title}</h1>
                            <p className="card-text"><strong>Description:</strong> {post.description}</p>
                            <p className="card-text"><strong>Release Date:</strong> {post.release_date}</p>
                            <p className="card-text"><strong>Language:</strong> {post.language}</p>
                            <p className="card-text"><strong>Actors:</strong> {post.actors}</p>
                            <p className="card-text"><strong>Director:</strong> {post.director}</p>
                            <p className="card-text"><strong>price:</strong> {post.price}</p>
                            {/* <p className="card-text"><strong>Time:</strong> {post.time}</p> */}
                            <button
                                className="btn btn-primary "
                                onClick={() => navigate(`/bookticket/${post.price}/${post.title}/${postId}`)}
                            >
                                Book Ticket
                            </button>

                          
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default checkAuth(ViewMovie);