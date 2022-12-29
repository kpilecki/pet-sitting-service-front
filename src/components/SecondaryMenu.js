import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "react-redux";
import { useState } from "react";
import {useTranslation} from "react-i18next";


const SecondaryMenu = () => {
    const store = useStore();
   
    const [ roles, setRoles ] = useState( store.getState().roles );
    const [ isLoggedIn, setIsLoggedIn ] = useState( store.getState().isLoggedIn );
    const [ username, setUsername ] =useState( store.getState().username );
    const { t } = useTranslation();

    store.subscribe( () => {
        setRoles( store.getState().roles );
        setIsLoggedIn( store.getState().isLoggedIn );
        setUsername( store.getState().username )
    });

    if( isLoggedIn ){
            return (
                <nav className="navbar navbar-light bg-light rounded">
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link to={`/${ username }`} className="nav-link link-dark">
                                { t( "secondaryMenu.dashboard" ) }
                            </Link>
                        </li>
                        <li>
                            <Link to="/customer/messages" className="nav-link link-dark">
                                { t( "secondaryMenu.messages" ) }
                            </Link>
                        </li>
                        <li >
                            <Link to="/customer/profile" className="nav-link link-dark">
                                { t( "secondaryMenu.profile" ) }
                            </Link>
                        </li>
                        <li>
                            <Link to="/customer/orders" className="nav-link link-dark">
                                { t( "secondaryMenu.orders" ) }
                            </Link>
                        </li>
                        <li>
                            <Link to="/customer/pets" className="nav-link link-dark">
                                { t( "secondaryMenu.myPets" ) }
                            </Link>
                        </li>
                        { roles.includes( "ROLE_SERVICE_PROVIDER" ) &&
                            
                        <li>
                            <Link to="/provider/home" className="nav-link link-dark rounded">
                                { t( "secondaryMenu.providerDashboard" ) }
                            </Link>
                        </li>
                        }
                    </ul>
                </nav>
            );
         };
};

export default SecondaryMenu;