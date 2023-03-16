import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getImageById, getServiceProviderById} from "../../api/serviceProviderApi";
import ProfileInfo from "../../components/customer/ProfileInfo";
import SecondaryMenu from "../../components/SecondaryMenu";
import {enumToString} from "../../utils/utils";
import {useTranslation} from "react-i18next";
import OrderCreate from "../../components/OrderCreate";

const ServiceProviderView = () => {
    const params = useParams();
    const [ provider, setProvider ] = useState( {} );
    const [ error, setError ] = useState( {} );
    const [ image, setImage ] = useState( [] );
    const { t } = useTranslation();

    useEffect( () => {
        getServiceProviderById( params.id )
            .then( ( response ) => {
                setProvider( response );
            }).catch( error => setError( error.response.data ) );

        getImageById( params.id )
            .then( ( response ) => {
                console.log( response );
                setImage( response.image )
            }).catch( err => console.error( err ) );
    }, []);

    console.log( provider.services );
    return(
        <main className="d-flex flex-wrap m-auto gap-2 justify-content-center w-75">
            <div className="col-sm-2">
                <ProfileInfo />
            </div>
            <div className="col-lg d-flex flex-column gap-2">
                <div className="bg-light rounded m-2">
                    <section className="m-2">
                        <h5 className="text-center">{ provider.headline }</h5>
                    </section>
                    <hr/>
                    <section className="d-flex m-2 justify-content-center">
                        <div>
                            { image &&
                                <img className="img-fluid rounded-3" src={`data:image/jpeg;base64,${ image }`}
                                     width='300'/>
                            }
                            <h5 className="text-center">{ provider.firstName } { provider.lastName }</h5>
                            <h6 className="text-center">{ t( "serviceProviderView.yearsOfExperience" )}{ provider.yearsOfExperience }</h6>
                        </div>
                    </section>
                    <hr/>
                    <section>
                        <h5 className="text-center">{ t( "serviceProviderView.about" )}{ provider.firstName }</h5>
                        <p className="m-2">{ provider.about }</p>
                    </section>
                    <hr/>
                    <section>
                        <h5 className="text-center">{ t( "serviceProviderView.skillDescription" ) }</h5>
                        <p className="m-2">{ provider.skillDescription }</p>
                    </section>
                    <hr/>
                    <section>
                        <h5 className="text-center">{ t( "serviceProviderView.services" ) }</h5>
                        { provider.services && provider.services.map( ( service ) => {
                            return(
                                <div className="border border-dark m-2 p-2 rounded d-flex flex-column align-content-around" key={ service.id }>
                                    <h5>{ service.serviceType && enumToString( service.serviceType ) }</h5>
                                    <h6>{ t( "serviceProviderView.serviceDescription" ) }</h6>
                                    <p>{ service.description }</p>
                                    <h6>{ t( "serviceProviderView.acceptedPetTypes" ) }</h6>
                                    <ul>
                                        { service.acceptedPetTypes && service.acceptedPetTypes.map( ( type ) => {
                                            return(
                                              <li key={ type }>{ enumToString( type ) }</li>
                                            );
                                        })}
                                    </ul>
                                    <h6>{ t( "serviceProviderView.acceptedPetSizes" ) }</h6>
                                    <ul>
                                        { service.acceptedPetSizes && service.acceptedPetSizes.map( ( type ) => {
                                            return(
                                                <li key={ type }>{ enumToString( type ) }</li>
                                            );
                                        })}
                                    </ul>
                                    <h6>{ t( "serviceProviderView.minPetAge" ) }{ service.minPetAge }</h6>
                                    <h6>{ t( "serviceProviderView.maxPetAge" ) }{ service.maxPetAge }</h6>
                                    <button className="btn btn-warning" onClick={ () => { OrderCreate( service.id, provider )}}>{ t( "serviceProviderView.bookNow" ) }</button>
                                </div>
                            );
                        })}
                    </section>
                </div>
            </div>
            <div className="col-sm-2">
                <SecondaryMenu />
            </div>
        </main>
    );
};

export default ServiceProviderView;