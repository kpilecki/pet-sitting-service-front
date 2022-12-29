import React from "react";
import {useQuery} from "react-query";
import {findServiceProviders} from "../../api/serviceProviderApi";
import ProviderSmallView from "./ProviderSmallView";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const ServiceProviderList = () => {
    const { isLoading, isError, error, data } = useQuery('serviceProviders', findServiceProviders );
    const navigate = useNavigate();
    const { t } = useTranslation();

    if ( isLoading ) {
        return (
            <h4 className="text-center text-warning">{ t( "serviceProviderList.loading" ) }</h4>
        );

    } else if ( isError ) {
        return (
            <h4 className="text-center text-danger">{ t( "serviceProviderList.error" ) }</h4>
        );

    } else {
        return(
            <section className="bg-light rounded">
                <ul className="list-group">
                    { data.providers.map( ( provider ) => {
                        return(
                            <li
                                key={ provider.id }
                                className="list-group-item btn btn-outline-warning m-2"
                                onClick={ () =>  navigate( "/provider/view/".concat( provider.id ) )}
                            >
                                <ProviderSmallView  provider={ provider }/>
                            </li>
                        );
                    })
                    }
                </ul>
            </section>
        );
    }
};

export default ServiceProviderList;