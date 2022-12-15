import React from "react";
import { Link } from "react-router-dom";


const MainMenu = () => {

    return (
        <div className="bg-white shadow-sm mb-2">
            <div className="container">
            <nav className="navbar navbar-light navbar-expand justify-content-between">
                <Link to="/" className="navbar-brand">
                    Pet Sitting Service
                </Link>
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>   
            </div>
        </div>
    );

};

export default MainMenu;