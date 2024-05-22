import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";
import NavbarAdmin from "../Navbar/NavbarAdmin";

function EditMovies() {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [release_date, setRelease_date] = useState('');
  const [director, setDirector] = useState('');
  const [actors, setActors] = useState('');
  const [poster_url, setPoster_url] = useState('');
  const [price, setPrice] = useState(0);
  const [time_11_30, setTime11_30] = useState('00:00');
  const [time_2_30, setTime2_30] = useState('00:00');
  const [time_5, setTime5] = useState('00:00');
  const [time_9, setTime9] = useState('00:00');
  const [status, setStatus] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    
    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/admin/viewonemovie/'+postId, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setLanguage(response.data.language);
          setRelease_date(response.data.release_date);
          setDirector(response.data.director);
          setActors(response.data.actors);
          setPoster_url(response.data.poster_url);
          setPrice(response.data.price);
          setTime11_30(response.data.time_11_30);
          setTime2_30(response.data.time_2_30);
          setTime5(response.data.time_5);
          setTime9(response.data.time_9);
          setStatus(response.data.status);
        })
        .catch(error => {
            console.error('Error fetching post:', error);
        });
    }, [postId, token]);

    function updatePost() {
        axios.put('http://127.0.0.1:8000/admin/updatemovie/' + postId, {
          title: title,
          description: description,
          language: language,
          release_date:release_date,
          director:director,
          actors:actors,
          poster_url:poster_url,
          price:price,
          time_11_30:time_11_30,
          time_2_30:time_2_30,
          time_5:time_5,
          time_9:time_9,
          status:status
        }, {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            setShowModal(true);
        })
        .catch(error => {
            console.error('Error updating post:', error);
        });
    }

    function handleCloseModal() {
        setShowModal(false);
        navigate('/listmovies');
    }



    return (
        <div>
            <NavbarAdmin/>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center mt-5">Edit Movies</h1>
                        <div className="form-group">
                            <label>title:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={title} 
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={description} 
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Language:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={language} 
                                onChange={(event) => setLanguage(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Release date:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                value={release_date} 
                                onChange={(event) => setRelease_date(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Director:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={director} 
                                onChange={(event) => setDirector(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Actors:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={actors} 
                                onChange={(event) => setActors(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Poster url:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={poster_url} 
                                onChange={(event) => setPoster_url(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={price} 
                                onChange={(event) => setPrice(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Time:</label>
                            <input
                                type="checkbox"
                                id="t1"
                                name="time1"
                                checked={time_11_30 !== "00:00"}
                                value={'11:30 am'}
                                onChange={(event) =>
                                setTime11_30(event.target.checked ? event.target.value : "00:00")
                                }
                            />
                            <label for="t1">11:30 am</label>
                            <input
                                type="checkbox"
                                id="t2"
                                name="time2"
                                checked={time_2_30 !== "00:00"}
                                value={'2:30 pm'}
                                onChange={(event) =>
                                setTime2_30(event.target.checked ? event.target.value : "00:00")
                                }
                            />
                            <label for="t2">2:30 pm</label>
                            <input
                                type="checkbox"
                                id="t3"
                                name="time3"
                                checked={time_5 !== "00:00"}
                                value={'5:00 pm'}
                                onChange={(event) =>
                                setTime5(event.target.checked ? event.target.value : "00:00")
                                }
                            />
                            <label for="t3">5:00 pm</label>
                            <input
                                type="checkbox"
                                id="t4"
                                name="time4"
                                checked={time_9 !== "00:00"}
                                value={'9:00 pm'}
                                onChange={(event) =>
                                setTime9(event.target.checked ? event.target.value : "00:00")
                                }
                            />
                            <label for="t4">9:00 pm</label>
                            </div>

                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={updatePost}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bootstrap Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmation</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>do you want to update this movie?</p>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleCloseModal}>update</button>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default checkAuth(EditMovies);

