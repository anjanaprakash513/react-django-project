import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
// import checkGuest from "./checkguest";
import { useSelector } from "react-redux";

function Login() {
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";
  
    function attemptLogin() {
        axios.post('http://127.0.0.1:8000/admin/login', {
            username: username,
            password: password
        }, {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response=>{
            setErrorMessage('')
            if(username === 'anjana'){
             var user = {
                username: username,
                userId: response.data.userId,    //adiitional aayittu add cheythath userid um email um backend il ninnu kond vannath. 
                email: response.data.email,         //so basically we are getting token,userid,email from backend and storing in the store.
                token: response.data.token      //so if we want this userid and email somewhere we can use useselector to select frm store.
            }
            dispatch(setUser(user));
            navigate("/listmovies");

            }else{
                var userList = {
                    username: username,
                    userId: response.data.userId,
                    email: response.data.email,
                    token: response.data.token
                }
                dispatch(setUser(userList));
                navigate("/");

            }

        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            } else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="mb-4 text-center mt-5">Login</h1>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="form-group">
                        <label htmlFor="email">username:</label>
                        <input type="text" className="form-control" id="email" value={username} onChange={(event)=>setUsername(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary btn-block" onClick={attemptLogin}>Login</button>
                    </div>
                    <div className="mt-3 text-center">
                        <p>want to create an new account? <Link to="/register">SignUp</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
