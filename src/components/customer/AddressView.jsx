import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {createUpdateCustomerAddress, getCustomerAddress} from "../../api/customerApi";
import AddressUpdateForm from "../AddressUpdateForm";
import Input from "../Input";

const AddressView = () => {
    const [ errors, setErrors ] = useState( {} );
    const [ updateBtnText, setUpdateBtnText ] =useState( "Update" );
    const [ isUpdateFormHidden, setIsUpdateFormHidden ] = useState( true );
    const queryClient = useQueryClient();
    let result;

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
            console.log( err );
            setErrors( err.response.data.validationErrors );
            console.log( errors );
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
        result = (
            <h3 className="text-center bg-light text-danger">Loading...</h3>
        );
    } else if ( isError ){
        result = (
            <h3 className="text-center bg-light text-danger">Error has occurred</h3>
        );
    } else {

        if( address ){
            result = (
                <section className="container bg-light rounded">
                    <h5>Main Address</h5>
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
            result = (
              <section className="container bg-light rounded">
                  <h5 className="text-center text-warning">Please Add you address</h5>
                  <AddressUpdateForm
                      btnText="Add address"
                      onSubmit={ addUpdateAddress }
                      errors={ errors }
                  />
              </section>
            );
        }



    }

    return ( result );
};

export default AddressView;