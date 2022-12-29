import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteService, getServices, updateService} from "../../api/serviceProviderApi";
import SecondaryMenu from "../../components/SecondaryMenu";
import ProviderServiceUpdate from "../../components/provider/ProviderServiceUpdate";
import {useTranslation} from "react-i18next";

const ServiceEdit = () => {
    const params = useParams();
    const [ errors, setErrors ] = useState( {} );
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { isLoading, isError, error, data } = useQuery('serviceProviderServices', getServices );

    const updateServiceMutation = useMutation( updateService , {
        onSuccess: () => {
            queryClient.invalidateQueries( 'serviceProviderServices' );
            navigate( '/provider/services' );
        },
        onError: ( error ) => {
            setErrors( error.response.data.validationErrors );
        }
    });

    const deleteServiceMutation = useMutation( deleteService , {
        onSuccess: () => {
            queryClient.invalidateQueries( 'serviceProviderServices' );
            navigate( '/provider/services' );
        },
        onError: ( error ) => {

        }
    });

    const onServiceDelete = ( id ) => {
      deleteServiceMutation.mutate( id );
    };

    const onServiceSave = ( service ) => {
      updateServiceMutation.mutate( service );
    };

    const onCancelEdit = () => {
      navigate( '/provider/services' );
    };

    if ( isLoading ) {
        return (
            <h4 className="text-center text-warning">Loading...</h4>
        );

    } else if ( isError ) {
        return (
            <h4 className="text-center text-danger">Sorry, unexpected error has occurred</h4>
        );

    } else {
        const service = data.services.find(({id}) => id.toString() === params.id);

        return (
            <main className="d-flex flex-wrap m-auto gap-2 justify-content-center w-75">

                <div className="col-lg d-flex flex-column gap-2 bg-light rounded p-2">
                    <ProviderServiceUpdate
                        heading={ t( "serviceEdit.heading" ) }
                        service={ service }
                        onSave={ onServiceSave }
                        onCancel={ onCancelEdit }
                        onDelete={ onServiceDelete }
                        errors={errors}
                    />
                </div>
                <div className="col-sm-2">
                    <SecondaryMenu/>
                </div>
            </main>
        );
    }
};

export default ServiceEdit;