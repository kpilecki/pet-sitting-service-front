import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useDispatch } from "react-redux";
import serviceProviderService from '../services/serviceProviderService';
import * as apiCalls from '../api/apiCalls';
import {useTranslation} from "react-i18next";
import {parseErrors} from "../utils/utils";


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
    const { t } = useTranslation();

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
                if( apiError.response.data && apiError.response.data.errors ){
                    tempErrors = parseErrors( apiError );
                }
                setErrors( tempErrors );
            });
    };




    return(
        <div className="container">
            <h1 className="text-center">Sign Up</h1>
            <div className="col-12 mb-3">
                <Input 
                    label={ t( "serviceProviderSignup.username" ) }
                    placeholder={ t( "serviceProviderSignup.usernamePlaceholder" ) }
                    value={ username }
                    onChange={ onChangeUsername }
                    hasError={ errors.username && true }
                    error={ errors.username }
                />
            </div>
            <div className="col-12 mb-3">
                <Input 
                    label={ t( "serviceProviderSignup.password" ) }
                    placeholder={ t( "serviceProviderSignup.passwordPlaceholder" ) }
                    type="password"
                    value={ password }
                    onChange={ onChangePassword }
                    hasError={ errors.password && true }
                    error={ errors.password }
                />
            </div>
            <div className="col-12 mb-3">
                <Input 
                    label={ t(  "serviceProviderSignup.passwordRepeat" ) }
                    placeholder={ t( "serviceProviderSignup.passwordRepeatPlaceholder" ) }
                    type="password"
                    value={ passwordRepeat }
                    onChange={ onChangePasswordRepeat }
                    hasError={ errors.passwordRepeat && true }
                    error={ errors.passwordRepeat }
                />
            </div>
            <div className="col-12 mb-3">
                <Input 
                    label={ t( "serviceProviderSignup.name" ) }
                    placeholder={ t( "serviceProviderSignup.namePlaceholder" ) }
                    value={ firstName }
                    onChange={ onChangeFirstName }
                    hasError={ errors.name && true }
                    error={ errors.name }
                />
            </div>
            <div className="col-12 mb-3">
                <Input 
                    label={ t( "serviceProviderSignup.surname" ) }
                    placeholder={ t( "serviceProviderSignup.surnamePlaceholder" ) }
                    value={ lastName }
                    onChange={ onChangeLastName }
                    hasError={ errors.surname && true }
                    error={ errors.surname }
                />
            </div>
            <div className="col-12 mb-3">
                <Input 
                    label={ t( "serviceProviderSignup.email" ) }
                    placeholder={ t( "serviceProviderSignup.emailPlaceholder" ) }
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
                    text={ t( "serviceProviderSignup.signupButton" ) }
                />
            </div>
        </div>
    );

};

export default ServiceProviderSignup;