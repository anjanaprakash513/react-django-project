import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    var [username, setUsername] = useState('');
    var [email, setEmail] = useState('');
    var [password1, setPassword1] = useState('');
    var [password2, setPassword2] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();

    function registerUser() {
        var user = {
            username: username,
            email:email,
            password1: password1,
            password2: password2,
        }

        axios.post('http://127.0.0.1:8000/admin/signup', user)
            .then(response => {
                setErrorMessage('');
                navigate('/login');
            })
            .catch(error => {
                if (error.response.data.errors) {
                    setErrorMessage(Object.values(error.response.data.errors).join(' '));
                } else {
                    setErrorMessage('Failed to connect to API');
                }
            });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="mb-4 text-center mt-5">SignUp</h1>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">User Name:</label>
                            <input type="text" className="form-control" id="name" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">email:</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password1">password:</label>
                            <input type="text" className="form-control" id="password1" value={password1} onChange={(event) => setPassword1(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">confirm password:</label>
                            <input type="password" className="form-control" id="password2" value={password2} onChange={(event) => setPassword2(event.target.value)} />
                        </div>
                        <button type="button" className="btn btn-primary btn-block" onClick={registerUser}>SignUp</button>
                    </form>
                    <div className="mt-3 text-center">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;