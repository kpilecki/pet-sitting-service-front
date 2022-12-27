import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";



const MainMenu = () => {
    const store = useStore();
    const dispatch = useDispatch();
    const [ isLoggedIn, setIsLoggedIn ] = useState( store.getState().isLoggedIn );
    const navigate = useNavigate();

    store.subscribe( () => {
        setIsLoggedIn( store.getState().isLoggedIn );
    });

    const getMenu = () => {
        return (
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item btn btn-outline-primary">
                    <Link to="provider/signup" className="nav-link">
                        Become Pet Sitter
                    </Link>
                </li>
                <li className="nav-item btn">
                    <Link to="/signup" className="nav-link">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item btn">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            </ul>
        );
    };

    const onClickLogout = () => {
        const action = {
            type: 'logout-success'
        };
        dispatch( action );
        navigate( '/' );
    };

    const getCustomerMenu = () => {
        return(
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={`/ ${ store.getState().username }`} className="nav-link">
                        Home
                    </Link>
                </li>
                <li 
                    className="nav-item nav-link" 
                    onClick={ onClickLogout }
                    style={{ cursor: 'pointer' }}
                    >
                    Logout
                </li>
            </ul>
        );
    };


    return (
        <div className="bg-white shadow-sm mb-2">
            <div className="container">
            <nav className="navbar navbar-light navbar-expand justify-content-between">
                <Link to="/" className="navbar-brand">
                    Pet Sitting Service
                </Link>
                { isLoggedIn ? getCustomerMenu() : getMenu() }
            </nav>   
            </div>
        </div>
    );

};





export default MainMenu;