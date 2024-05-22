import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


function TicketConfirm() {
    const { book_id } = useParams();
    const [post, setPost] = useState({ title: '', booking_id: '', date: '', time:'', total_price: ''});
    const navigate = useNavigate()
    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";
    console.log(book_id)
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/user/viewconfirm/'+ book_id, {
        headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            setPost(response.data);
        }).catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [book_id, token]);

    return (
        <>
        <Navbar/>
        
        <div className="container mt-5">
            
            <div className="row">
                {/* Left Column for Poster */}
                {/* <div className="col-md-4">
                    <img style={{maxHeight:"500px"}} src={post.poster_url} alt={post.title} className="img-fluid rounded" />
                </div> */}
                {/* Right Column for Movie Details */}
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title">{post.title}</h1>
                            <p className="card-text"><strong>Booking Id:</strong> {post.booking_id}</p>
                            <p className="card-text"><strong>Date:</strong> {post.date}</p>
                            <p className="card-text"><strong>Time:</strong> {post.time}</p>
                            <p className="card-text"><strong>Total price:</strong> {post.total_price}</p>

                            <button
                                className="btn btn-primary "
                                onClick={() => navigate(`/bookinghistory`)}
                            >
                                confirm
                            </button>

                          
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default checkAuth(TicketConfirm);