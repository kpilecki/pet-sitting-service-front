import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {createUpdateCustomerAddress, getCustomerAddress} from "../../api/customerApi";
import AddressUpdateForm from "../AddressUpdateForm";
import Input from "../Input";
import {useTranslation} from "react-i18next";

const AddressView = () => {
    const [ errors, setErrors ] = useState( {} );
    const [ updateBtnText, setUpdateBtnText ] =useState( "Update" );
    const [ isUpdateFormHidden, setIsUpdateFormHidden ] = useState( true );
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const { isLoading, isError, error, data : address } = useQuery( 'customerAddress', getCustomerAddress
    );

    const updateAddressMutation = useMutation( createUpdateCustomerAddress, {
        onSuccess: () => {
            queryClient.invalidateQueries( 'customerAddress' );
            setIsUpdateFormHidden( true );
            setUpdateBtnText( "Update");
            setErrors( {} );
        },
        onError: err => {
            setErrors( err.response.data.validationErrors );
        }
    });

    const addUpdateAddress = ( address ) => {
        updateAddressMutation.mutate( address );
    }

    const toggleUpdateForm = ( event ) => {
        event.preventDefault();
        setIsUpdateFormHidden( !isUpdateFormHidden );
        setUpdateBtnText( !isUpdateFormHidden ? "Update" : "Cancel" );
    }

    if( isLoading ) {
        return (
            <h3 className="text-center bg-light text-danger">{ t( "addressView.loading" ) }</h3>
        );
    } else if ( isError ){
        return (
            <h3 className="text-center bg-light text-danger">{ t( "addressView.error" ) }</h3>
        );
    } else {
        if( address ){
            return (
                <section className="container bg-light rounded">
                    <h5>{ t( "addressView.addressHeader" ) }</h5>
                    <ul>
                        <li>{ address.street }</li>
                        <li>{ address.city }</li>
                        <li>{ address.municipality }</li>
                        <li>{ address.country }</li>
                        <li>{ address.postCode }</li>
                    </ul>
                    <button className="btn btn-warning" onClick={ toggleUpdateForm }> { updateBtnText }</button>
                    { !isUpdateFormHidden && (
                        <AddressUpdateForm
                            address={ address }
                            btnText="Update address"
                            onSubmit={ addUpdateAddress }
                            errors={ errors }
                        />
                        )
                    }
                </section>
            );
        } else {
            return (
              <section className="container bg-light rounded">
                  <h5 className="text-center text-warning">{ t( "addressView.addAddressHeader" ) }</h5>
                  <AddressUpdateForm
                      btnText="Add address"
                      onSubmit={ addUpdateAddress }
                      errors={ errors }
                  />
              </section>
            );
        }
    }
};

export default AddressView;