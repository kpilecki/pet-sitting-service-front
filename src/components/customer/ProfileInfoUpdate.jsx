import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getCustomer, updateCustomer} from "../../api/customerApi";
import UpdateInput from "../UpdateInput";
import {useTranslation} from "react-i18next";

const ProfileInfoUpdate = () => {
    const [ errors, setErrors ] = useState( {} );
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const { isLoading, isError, error, data : customer } = useQuery( 'customer', getCustomer
     );

    const updateCustomerMutation = useMutation( updateCustomer, {
        onSuccess: () => {
            queryClient.invalidateQueries( 'customer' );
        },
        onError: err => {
            setErrors( err.response.data.validationErrors );
        }
    })

    if( isLoading ){
        return (
            <h3>{ t( "profileInfoUpdate.loading" ) }</h3>
        );
    } else if( isError ){
        console.log( error );
        return (
            <h3>{ t( "profileInfoUpdate.error" ) }</h3>
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

        return (
            <div className="container bg-light rounded">
                <h1 className="text-center">{ t( "profileInfoUpdate.updateYourProfile" ) }</h1>
                <UpdateInput
                    inputLabel={ t( "profileInfoUpdate.usernameInputLabel" ) }
                    inputPlaceholder={ t( "profileInfoUpdate.usernameInputPlaceholder" ) }
                    inputHasError={ errors.username && true }
                    inputError={ updateCustomerMutation.error && updateCustomerMutation.error.username }
                    headerText= { t( "profileInfoUpdate.usernameInputHeaderText" ).concat( customer.username ) }
                    buttonValue={ t( "profileInfoUpdate.usernameInputButtonValue" ) }
                    updateMutator={ updateUsername }
                />
                <UpdateInput
                    inputLabel={ t( "profileInfoUpdate.firstNameInputLabel" ) }
                    inputPlaceholder={ t( "profileInfoUpdate.firstNameInputPlaceholder" ) }
                    inputHasError={ updateCustomerMutation.error && updateCustomerMutation.error.firstName && true }
                    inputError={ updateCustomerMutation.error && updateCustomerMutation.error.firstName }
                    headerText= { t( "profileInfoUpdate.firstNameInputHeaderText" ).concat( customer.firstName ) }
                    buttonValue={ t( "profileInfoUpdate.firstNameInputButtonValue" ) }
                    updateMutator={ updateFirstName }
                />
                <UpdateInput
                    inputLabel={ t( "profileInfoUpdate.surnameInputLabel" ) }
                    inputPlaceholder={ t( "profileInfoUpdate.surnameInputPlaceholder" ) }
                    inputHasError={ updateCustomerMutation.error && updateCustomerMutation.error.lastName && true }
                    inputError={ updateCustomerMutation.error && updateCustomerMutation.error.lastName }
                    headerText= { t( "profileInfoUpdate.surnameInputHeaderText" ).concat( customer.lastName ) }
                    buttonValue={ t( "profileInfoUpdate.surnameInputButtonValue" ) }
                    updateMutator={ updateLastName }
                />
                <UpdateInput
                    inputLabel={ t( "profileInfoUpdate.emailInputLabel" ) }
                    inputPlaceholder={ t( "profileInfoUpdate.emailInputPlaceholder" ) }
                    inputHasError={ errors.email && true }
                    inputError={ errors.email }
                    headerText= { t( "profileInfoUpdate.emailInputHeaderText" ).concat( customer.email ) }
                    buttonValue= { t("profileInfoUpdate.emailInputButtonValue" ) }
                    updateMutator={ updateEmail }
                />
            </div>
        );
    }
};

export default ProfileInfoUpdate;