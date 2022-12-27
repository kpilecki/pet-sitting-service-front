import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useDispatch } from "react-redux";
import serviceProviderService from '../services/serviceProviderService';
import * as apiCalls from '../api/apiCalls';


const ServiceProviderSignup = () => {
    const [ username, setUsername ] = useState( "" );
    const [password, setPassword ] = useState( "" );
    const [ passwordRepeat, setPasswordRepeat ] = useState( "" );
    const [ firstName, setFirstName ] = useState( "" );
    const [ lastName, setLastName ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ errors, setErrors ] = useState( {} );
    const [ pendingApiCall, setPendingApiCall ] = useState( false );
    const [ passwordRepeatConfirmed, setPasswordRepeatConfirmed ] = useState( true );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChangeUsername = ( event ) => {
        setUsername( event.target.value );

        const tempErrors = { ...errors };
        delete tempErrors.username;
        setErrors( tempErrors );
    };

    const onChangePassword = ( event ) => {
        setPassword( event.target.value );

        const tempErrors = { ...errors };
        delete tempErrors.password;
        setErrors( tempErrors );
    };

    const onChangePasswordRepeat = ( event ) => {
        setPasswordRepeat( event.target.value );

        const tempErrors = { ...errors };
        delete tempErrors.passwordRepeat;
        setErrors( tempErrors );
    };

    const onChangeFirstName = ( event ) => {
        setFirstName( event.target.value );

        const tempErrors = { ...errors };
        delete tempErrors.name;
        setErrors( tempErrors );
    };

    const onChangeLastName = ( event ) => {
        setLastName( event.target.value );

        const tempErrors = { ...errors };
        delete tempErrors.surname;
        setErrors( tempErrors );
    };

    const onChangeEmail = ( event ) => {
        setEmail( event.target.value );

        const tempErrors = { ...errors };
        delete tempErrors.email;
        setErrors( tempErrors );
    };

    const myDispatch =  ( action ) => {
        dispatch( action );
    };

    useEffect( () => {
        setPasswordRepeatConfirmed( passwordRepeat === password );

        const tempErrors = { ...errors };

        tempErrors.passwordRepeat = passwordRepeatConfirmed ? '' : 'Does not match password';

        setErrors( tempErrors );

    },[password, passwordRepeat, passwordRepeatConfirmed])

    const onClickSignUp = () => {
        const provider = {
            username: username,
            password:password,
            firstName: firstName,
            lastName: lastName,
            email: email,
        };
        setPendingApiCall( true );

        serviceProviderService.signup( provider )
            .then( ( ) => {
                
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
                        navigate( `/ ${ action.payload.username }` ); 
                    })
                    .catch( ( error ) => {
                        if( error && error.response ){
                            setPendingApiCall( false );
                        }
                    });
            })
            .catch( ( apiError ) => {
                let tempErrors = { ...errors };
                setPendingApiCall( false );
                if( apiError.response.data && apiError.response.data.validationErrors ){
                    tempErrors = { ...apiError.response.data.validationErrors };
                }
                setErrors( tempErrors );
            });
    };


    return(
        <div className="container">
            <h1 className="text-center">Sign Up</h1>
            <div className="col-12 mb-3">
                <Input 
                    label="*Username"
                    placeholder="Your username"
                    value={ username }
                    onChange={ onChangeUsername }
                    hasError={ errors.username && true }
                    error={ errors.username }
                />
            </div>
            <div className="col-12 mb-3">
                <Input 
                    label="*Password"
                    placeholder="Your password"
                    type="password"
                    value={ password }
                    onChange={ onChangePassword }
                    hasError={ errors.password && true }
                    error={ errors.password }
                />
            </div>
            <div className="col-12 mb-3">
                <Input 
                    label="*Password Repeat"
                    placeholder="Repeat your password"
                    type="password"
                    value={ passwordRepeat }
                    onChange={ onChangePasswordRepeat }
                    hasError={ errors.passwordRepeat && true }
                    error={ errors.passwordRepeat }
                />
            </div>
            <div className="col-12 mb-3">
                <Input 
                    label="*Name"
                    placeholder="Your name"
                    value={ firstName }
                    onChange={ onChangeFirstName }
                    hasError={ errors.name && true }
                    error={ errors.name }
                />
            </div>
            <div className="col-12 mb-3">
                <Input 
                    label="*Surname"
                    placeholder="Your surname"
                    value={ lastName }
                    onChange={ onChangeLastName }
                    hasError={ errors.surname && true }
                    error={ errors.surname }
                />
            </div>
            <div className="col-12 mb-3">
                <Input 
                    label="*Email"
                    placeholder="Your email"
                    value={ email }
                    onChange={ onChangeEmail }
                    hasError={ errors.email && true }
                    error={ errors.email }
                />
            </div>
            <div className="text-center">
                <ButtonWithProgress 
                    onClick={ onClickSignUp }
                    disabled={ pendingApiCall || !passwordRepeatConfirmed }
                    pendingApiCall={ pendingApiCall }
                    text={ "Sign Up" }
                />
            </div>
        </div>
    );

};

export default ServiceProviderSignup;