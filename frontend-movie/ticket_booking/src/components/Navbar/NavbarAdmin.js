import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../../store/authSlice";

function NavbarAdmin() {
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    console.log('User in Navbar:', user); // Log user object in Navbar component
    
    function logout() {
        if (user) {
            console.log('User token:', user.token); // Log user token before making the logout request
            axios.post(
                'http://127.0.0.1:8000/admin/logout/',
                { access_token: user.token }, // Include access token in the request payload
                {
                    headers: { 'Authorization': "Bearer " + user.token } 
                }
            )
            .then(response => {
                dispatch(removeUser());
                navigate('/login');
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <h4>Movieticket</h4>
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className="collapse navbar-collapse mr-auto"
                id="navbarNav"
                style={{ float: "left" }}
            >
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>

                
                <li className="nav-item">
                            <span className="nav-link" onClick={logout}>Logout</span>
                 </li> 
                        
                   

                </ul>
            </div>
        </nav>
    );
}

export default NavbarAdmin;
