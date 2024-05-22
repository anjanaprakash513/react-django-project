import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import NavbarAdmin from "../Navbar/NavbarAdmin";

function AddMovies() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('');
    const [release_date, setRelease_date] = useState('');
    const [director, setDirector] = useState('');
    const [actors, setActors] = useState('');
    const [poster_url, setPoster_url] = useState('');
    const [price,setPrice] = useState(0);
    const [time_11_30, setTime11_30] = useState('00:00');
    const [time_2_30, setTime2_30] = useState('00:00');
    const [time_5, setTime5] = useState('00:00');
    const [time_9, setTime9] = useState('00:00');

    const active = "active";
   
    const navigate = useNavigate();

    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";
  

    function addfilm() {
        axios.post('http://127.0.0.1:8000/admin/addmovies', {
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
            status:active

        }, {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            navigate('/listmovies');
        })
        .catch(error => {
            console.error('Error adding post:', error);
        });
    }
    

    return (
        <div>
        <NavbarAdmin/>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Add movies</h1>
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
                        {/* time */}
                        <div className="form-group">
                        <label>Time:</label>
                        <input type="checkbox" id="t1" name="time1" value="11:30 am"   onChange={(event) => setTime11_30(event.target.checked ? event.target.value : '')}/>
                        <label for='t1' >11.30 am</label>
                        <input type="checkbox" id="t2" name="time2" value="2:30 pm" onChange={(event) => setTime2_30(event.target.checked ? event.target.value : '')}/>
                        <label for='t2' >2:30 pm</label>
                        <input type="checkbox" id="t3" name="time3" value="5:00 pm" onChange={(event) => setTime5(event.target.checked ? event.target.value : '')}/>
                        <label for='t3' >5:00 pm</label>
                        <input type="checkbox" id="t4" name="time4" value="9:00 pm" onChange={(event) => setTime9(event.target.checked ? event.target.value : '')}/>
                        <label for='t4' >9:00 pm</label>
                    </div>


                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={addfilm}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(AddMovies);
