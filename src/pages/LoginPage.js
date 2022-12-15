import React, { useState, useCallback } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useNavigate } from 'react-router-dom';
import * as apiCalls from '../api/apiCalls';
import { connect, useDispatch } from "react-redux";



export const LoginPage = () => {

    const [ username, setUsername ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ apiError, setApiError ] = useState( undefined );
    const [ pendingApiCall, setPendingApiCall ] = useState( false );
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                navigate( '/' ); 
            })
            .catch( ( error ) => {
                if( error.response ){
                    setApiError( error.response.data.message );
                    setPendingApiCall( false );
                }
            });
    };

        return (
            <div className="container">
                <h1 className="text-center">Login</h1>
                <div className="col-12 mb-3">
                    <Input
                        label="Username" 
                        placeholder="Your username" 
                        value={ username }
                        onChange={ onChangeUsername }
                    />
                </div>
                <div className="col-12 mb-3">
                    <Input
                        label="Password" 
                        placeholder="Your password" 
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
                        text="Login"
                        pendingApiCall={ pendingApiCall }
                    />
                </div>
            </div>

        );
    }


export default LoginPage;