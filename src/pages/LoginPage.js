import React, { useState } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useNavigate } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';
import { useDispatch } from "react-redux";
import {useTranslation} from "react-i18next";



export const LoginPage = () => {

    const [ username, setUsername ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ apiError, setApiError ] = useState( undefined );
    const [ pendingApiCall, setPendingApiCall ] = useState( false );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    let disableSubmit = false;

    const myDispatch = ( action ) => {
            dispatch( action );
    };

    const onChangeUsername = ( event ) => {
        setUsername( event.target.value );
        setApiError( undefined );
        if( username === '' ){
            disableSubmit = true;
        }
    } 

    const onChangePassword = ( event ) => {
        setPassword( event.target.value );
        setApiError( undefined );
        if( password === '' ){
            disableSubmit = true;
        }
    }

    const onClickLogin = () => {
        const body = {
            username: username,
            password: password
        };

        setPendingApiCall( true );

        
        apiCalls.login( body )
            .then( ( response ) => {
                const action = {
                    type: 'login-success',
                    payload: {
                        ...response.data,
                    }
                };
                myDispatch( action );
                setPendingApiCall( false );

                if( response.data.roles.includes( 'ROLE_SERVICE_PROVIDER' ) ){
                    navigate( '/provider/home' );
                } else {
                    navigate( `/ ${ action.payload.username }` );
                }

            })
            .catch( ( error ) => {
                console.log( error );
                if( error.response ){
                    setApiError( error.response.data );
                    setPendingApiCall( false );
                }
            });
    };

        return (
            <div className="container">
                <h1 className="text-center">Login</h1>
                <div className="col-12 mb-3">
                    <Input
                        label={ t( "loginPage.username" ) }
                        placeholder={ t( "loginPage.usernamePlaceholder" ) }
                        value={ username }
                        onChange={ onChangeUsername }
                    />
                </div>
                <div className="col-12 mb-3">
                    <Input
                        label={ t( "loginPage.password" ) }
                        placeholder={ t( "loginPage.passwordPlaceholder" ) }
                        type="password"
                        value={ password }
                        onChange={ onChangePassword } 
                    />
                </div>
                { apiError && (
                    <div className="col-12 mb-3">
                        <div className="alert alert-danger">{ apiError }</div>
                    </div>
                )}
                <div className="text-center">
                    <ButtonWithProgress
                        onClick={ onClickLogin }
                        disabled={ disableSubmit || pendingApiCall }
                        text={ t( "loginPage.loginButton" ) }
                        pendingApiCall={ pendingApiCall }
                    />
                </div>
            </div>
        );
    }

export default LoginPage;