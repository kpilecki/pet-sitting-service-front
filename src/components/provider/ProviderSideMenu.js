import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";


const ProviderSideMenu = () => {
    const store = useStore();
    const { t } = useTranslation();
    const [ roles, setRoles ] = useState( store.getState().roles );
    const [ isLoggedIn, setIsLoggedIn ] = useState( store.getState().isLoggedIn );
    const [ username, setUsername ] =useState( store.getState().username )

    store.subscribe( () => {
        setRoles( store.getState().roles );
        setIsLoggedIn( store.getState().isLoggedIn );
        setUsername( store.getState().username )
    });

    if( isLoggedIn ){
        return (
            <nav className="navbar navbar-light bg-light rounded">
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <Link to="/provider/home" className="nav-link link-dark rounded">
                            { t( "providerSideMenu.dashboard" ) }
                        </Link>
                    </li>
                    <li>
                        <Link to="/customer/messages" className="nav-link link-dark">
                            { t( "providerSideMenu.messages" ) }
                        </Link>
                    </li>
                    <li>
                        <Link to="/provider/orders" className="nav-link link-dark">
                            { t( "providerSideMenu.orders" ) }
                        </Link>
                    </li>
                    <li >
                        <Link to="/provider/profile" className="nav-link link-dark">
                            { t( "providerSideMenu.providerProfile" ) }
                        </Link>
                    </li>
                    <li>
                        <Link to="/provider/services" className="nav-link link-dark">
                            { t( "providerSideMenu.myServices" ) }
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/${ username }`} className="nav-link link-dark">
                            { t( "providerSideMenu.customerDashboard" ) }
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    };
};

export default ProviderSideMenu;