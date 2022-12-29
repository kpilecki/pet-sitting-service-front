import React, { useState } from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getServiceProviderProfileInfo, updateServiceProviderProfileInfo} from "../../api/serviceProviderApi";
import ServiceProviderProfileInfoUpdate from "./ServiceProviderProfileInfoUpdate";
import {useTranslation} from "react-i18next";

const ServiceProviderProfileInfo = () => {
    const [ errors, setErrors ] = useState( {} );
    const { isLoading, isError, error, data } = useQuery('serviceProviderProfileInfo', getServiceProviderProfileInfo);
    const [ isEditable, setIsEditable ] = useState(false);
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const updateInfoMutation = useMutation( updateServiceProviderProfileInfo , {
        onSuccess: () => {
            queryClient.invalidateQueries( 'serviceProviderProfileInfo' );
            setIsEditable(false);
            setErrors( {} );
        },
        onError: ( error ) => {
            setErrors( error.response.data.validationErrors );
        }
    });

    const toggleIsEditable = (event) => {
        event.preventDefault();
        setIsEditable(!isEditable);
    };

    const onUpdateCallback = ( info ) => {
        updateInfoMutation.mutate( info );

    };

    if ( isLoading ) {
        return (
            <h4 className="text-center text-warning">{ t( "serviceProviderProfileInfo.loading" ) }</h4>
        );

    } else if ( isError ) {
        return (
            <h4 className="text-center text-danger">{ t( "serviceProviderProfileInfo.error" ) }</h4>
        );

    } else {
        if (data.about === null ) {
            return (
                <main className="bg-light">
                    <h5 className="text-center">{ t( "serviceProviderProfileInfo.headerIfEmpty" ) }</h5>
                    <ServiceProviderProfileInfoUpdate
                        errors={ errors }
                        onSave={ onUpdateCallback }
                        onCancel={ toggleIsEditable }
                    />
                </main>
            );
        } else {
            return (
                isEditable ?
                    (
                        <main>
                            <h5 className="text-center">{ t( "serviceProviderProfileInfo.headerIfUpdate" ) }</h5>
                            <ServiceProviderProfileInfoUpdate
                                info= { data }
                                errors={ errors }
                                onSave={ onUpdateCallback }
                                onCancel={ toggleIsEditable }
                            />
                        </main>
                    )
                    :
                    (
                        <main className="bg-light rounded p-2">
                            <h5>{ t( "serviceProviderProfileInfo.aboutYou" ) }</h5>
                            <p className=" ">{ data.about }</p>
                            <hr/>
                            <h5>{ t( "serviceProviderProfileInfo.headline" ) }</h5>
                            <p> { data.headline }</p>
                            <hr/>
                            <h5>{ t( "serviceProviderProfileInfo.skillDescription" ) }</h5>
                            <p>{ data.skillDescription }</p>
                            <hr/>
                            <h5>{ t( "serviceProviderProfileInfo.yearsOfExperience" ) }{ data.yearsOfExperience }</h5>
                            <hr/>
                            <h5>{ t( "serviceProviderProfileInfo.acceptedPaymentMethods" ) }</h5>
                            <ul>
                                { data.acceptedPaymentMethods.map( ( v ) => {
                                    return (
                                      <li key={ v }>{ t( "paymentMethod.".concat( v ) ) }</li>
                                    );
                                })}
                            </ul>
                            <button
                                className="btn btn-warning"
                                onClick={ toggleIsEditable }
                                >{ t( "serviceProviderProfileInfo.edit" ) }
                            </button>
                        </main>
                    )
            )
        }
    }
};

export default ServiceProviderProfileInfo;