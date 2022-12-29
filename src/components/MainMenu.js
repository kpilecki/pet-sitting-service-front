import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

const MainMenu = () => {
    const store = useStore();
    const dispatch = useDispatch();
    const [ isLoggedIn, setIsLoggedIn ] = useState( store.getState().isLoggedIn );
    const navigate = useNavigate();
    const { t } = useTranslation();

    store.subscribe( () => {
        setIsLoggedIn( store.getState().isLoggedIn );
    });

    const getMenu = () => {
        return (
            <ul className="nav navbar-nav m-1">
                <li className="nav-item btn btn-outline-warning m-2">
                    <Link to="provider/signup" className="nav-link">
                        { t( "mainMenu.becomePetSitter" ) }
                    </Link>
                </li>
                <li className="nav-item btn btn-outline-warning m-2">
                    <Link to="/signup" className="nav-link">
                        { t( "mainMenu.signUp" ) }
                    </Link>
                </li>
                <li className="nav-item btn btn-outline-warning m-2">
                    <Link to="/login" className="nav-link">
                        { t( "mainMenu.login" ) }
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
            <ul className="nav navbar-nav m-1">
                <li className="nav-item btn btn-outline-warning m-2">
                    <Link to={ '/provider/find' } className="nav-link">
                        { t( "mainMenu.findPetSitters" ) }
                    </Link>
                </li>
                <li className="nav-item btn btn-outline-warning m-2">
                    <Link to={`/ ${ store.getState().username }`} className="nav-link">
                        { t( "mainMenu.home" ) }
                    </Link>
                </li>
                <li 
                    className="nav-item nav-link btn btn-outline-danger m-2"
                    onClick={ onClickLogout }
                    style={{ cursor: 'pointer' }}
                    >
                    { t( "mainMenu.logout" ) }
                </li>
            </ul>
        );
    };

    return (
        <div className="bg-white shadow-sm mb-2">
            <div className="container">
            <nav className="navbar navbar-light navbar-expand justify-content-between">
                <Link to="/" className="navbar-brand">
                    { t( "mainMenu.petSittingService" ) }
                </Link>
                { isLoggedIn ? getCustomerMenu() : getMenu() }
            </nav>   
            </div>
        </div>
    );
};





export default MainMenu;