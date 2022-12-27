import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getCustomer, updateCustomer} from "../../api/customerApi";
import UpdateInput from "../UpdateInput";

const ProfileInfoUpdate = () => {
    const [ errors, setErrors ] = useState( {} );
    const queryClient = useQueryClient();
    let customerProfileForm;

    const { isLoading, isError, error, data : customer } = useQuery( 'customer', getCustomer
     );

    const updateCustomerMutation = useMutation( updateCustomer, {
        onSuccess: () => {
            queryClient.invalidateQueries( 'customer' );
        },
        onError: err => {
            console.log( err );
            setErrors( err.response.data.validationErrors );
            console.log( errors );
        }
    })

    if( isLoading ){
        customerProfileForm = (
            <h3>Loading...</h3>
        );
    } else if( isError ){
        console.log( error );
        customerProfileForm = (
            <h3>Sorry, unexpected error has occurred</h3>
        );
    } else {

        const updateUsername = ( newUsername ) => {
            updateCustomerMutation.mutate( {
                username: newUsername
            });
        };

        const updateFirstName = ( newName ) => {
            updateCustomerMutation.mutate( {
                firstName: newName
            });
        };

        const updateLastName = ( newLastName ) => {
            updateCustomerMutation.mutate( {
                lastName: newLastName
            });
        };

        const updateEmail = ( newEmail ) => {
            updateCustomerMutation.mutate( {
                email: newEmail
            });
        };

        customerProfileForm = (
            <div className="container bg-light rounded">
                <h1 className="text-center">Update Your Profile</h1>
                <UpdateInput
                    inputLabel="Enter new username"
                    inputPlaceholder="Username"
                    inputHasError={ errors.username && true }
                    inputError={ updateCustomerMutation.error && updateCustomerMutation.error.username }
                    headerText= { `Username: ${ customer.username }` }
                    buttonValue= "Update Username"
                    updateMutator={ updateUsername }
                />
                <UpdateInput
                    inputLabel="Enter new name"
                    inputPlaceholder="Name"
                    inputHasError={ updateCustomerMutation.error && updateCustomerMutation.error.firstName && true }
                    inputError={ updateCustomerMutation.error && updateCustomerMutation.error.firstName }
                    headerText= { `First Name: ${ customer.firstName }` }
                    buttonValue= "Update Name"
                    updateMutator={ updateFirstName }
                />
                <UpdateInput
                    inputLabel="Enter new surname"
                    inputPlaceholder="Surname"
                    inputHasError={ updateCustomerMutation.error && updateCustomerMutation.error.lastName && true }
                    inputError={ updateCustomerMutation.error && updateCustomerMutation.error.lastName }
                    headerText= { `Surname: ${ customer.lastName }` }
                    buttonValue= "Update Surname"
                    updateMutator={ updateLastName }
                />
                <UpdateInput
                    inputLabel="Enter new email"
                    inputPlaceholder="Email"
                    inputHasError={ errors.email && true }
                    inputError={ errors.email }
                    headerText= { `Email: ${ customer.email }` }
                    buttonValue= "Update Email"
                    updateMutator={ updateEmail }
                />
            </div>
        );
    }

    return (  customerProfileForm  );
};

export default ProfileInfoUpdate;