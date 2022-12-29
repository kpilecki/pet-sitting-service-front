import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getServices, saveService } from "../../api/serviceProviderApi";
import ProviderServiceUpdate from "./ProviderServiceUpdate";
import ServiceSmallView from "./ServiceSmallView";
import { useTranslation } from "react-i18next";

const ProviderServicesList = () => {
    const [ errors, setErrors ] = useState( {} );
    const [ isAddNewVisible, setIsAddNewVisible ] = useState( false );
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const { isLoading, isError, error, data } = useQuery('serviceProviderServices', getServices );

    const saveServiceMutation = useMutation( saveService , {
        onSuccess: () => {
            queryClient.invalidateQueries( 'serviceProviderServices' );
            setErrors( {} );
        },
        onError: ( error ) => {
            setErrors( error.response.data.validationErrors );
        }
    });

    const onServiceSave = ( service ) => {
        saveServiceMutation.mutate( service );
        setIsAddNewVisible( false );
    };

    const toggleForm = ( event ) => {
      event.preventDefault();
      setIsAddNewVisible( !isAddNewVisible );
    };

    if ( isLoading ) {
        return (
            <h4 className="text-center text-warning">{ t( "providerServicesList.loading" ) }</h4>
        );

    } else if ( isError ) {
        return (
            <h4 className="text-center text-danger">{ t( "providerServicesList.error" ) }</h4>
        );

    } else {
        if( data.services.length === 0 ){
            return (
              <main className="bg-light rounded p-2">
                  <ProviderServiceUpdate
                    heading={ t( "providerServicesList.addNewService" ) }
                    onSave={ onServiceSave }
                    errors={ errors }
                  />
              </main>
            );
        } else {
            return (
                <main className="bg-light rounded p-2">
                    { !isAddNewVisible && (
                       <>
                           <section className="d-flex gap-2 flex-column">
                               { data.services.map( ( service ) => {
                                   return(
                                       <ServiceSmallView
                                           service={ service }
                                       />
                                   );
                               } )}
                           </section>
                           <hr/>
                           <button
                               className="btn btn-warning"
                               onClick={ toggleForm }
                           >{ t( "providerServicesList.addNew" ) }
                           </button>
                       </>
                    )}
                    { isAddNewVisible && (
                        <ProviderServiceUpdate
                            heading={ t( "providerServicesList.addNewService" ) }
                            onSave={ onServiceSave }
                            onCancel={ toggleForm }
                            errors={ errors }
                        />
                    )}
                </main>
            );
        }
    }
};

export default ProviderServicesList;