import { useQuery } from "react-query";
import { getCustomer, getProfileImage } from "../../api/customerApi";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileInfo = () => {
    const { isLoading, isError, error, data : customer } = useQuery( 'customer', getCustomer );
    const { isLoading : isImageLoading, isError: isImageError, error: imageError, data: imageData } = useQuery( 'customerProfileImage', getProfileImage );
    const { t } = useTranslation();

    if( isLoading ){
        return (
            <section>
                <h1>{ t( "profileInfo.loading" ) }</h1>
            </section>
        );
    } else if( isError ){
        console.log( error );
        return (
            <section>
                <h1>{ t( "profileInfo.error" ) }</h1>
            </section>
        );
    } else {
        return (
            <section className='bg-light d-flex flex-column align-items-center rounded'>
                { imageData &&
                    <img className="img-fluid rounded-circle" src={`data:image/jpeg;base64,${imageData.image}`}
                         width='100'/>
                }
                <h4>{customer.username}</h4>
                <h5>{customer.firstName} {customer.lastName}</h5>
                <Link to='/customer/profile'>{ t( "profileInfo.editProfile" ) }</Link>
            </section>
        );
    }
};

export default ProfileInfo;