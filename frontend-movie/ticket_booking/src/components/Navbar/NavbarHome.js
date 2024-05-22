import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../../store/authSlice";

function NavbarHome() {


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
                        <NavLink to="/login" className="nav-link">
                            Login
                        </NavLink>
                </li>
            </ul>
            </div>
        </nav>
    );
}

export default NavbarHome;


