import { useQuery } from "react-query";
import {getCustomer, getProfileImage} from "../../api/customerApi";
import React from "react";
import {Link} from "react-router-dom";

const ProfileInfo = () => {
    const { isLoading, isError, error, data : customer } = useQuery( 'customer', getCustomer );
    const { isLoading : isImageLoading, isError: isImageError, error: imageError, data: imageData } = useQuery( 'customerProfileImage', getProfileImage );
    let profileInfo;

    if( isLoading ){
        profileInfo = (
            <>
                <h1>Loading...</h1>
            </>
        );
    } else if( isError ){
        console.log( error );
        profileInfo = (
            <>
                <h1> Error </h1>
            </>
        );
    } else {
        profileInfo = (
            <> { imageData &&
                <img className="img-fluid rounded-circle" src={`data:image/jpeg;base64,${imageData.image}`}
                     width='100'/>
                }
                <h4>{ customer.username }</h4>
                <h5>{ customer.firstName } { customer.lastName }</h5>
                <Link to='/customer/profile'>Edit Profile</Link>
            </>
        );
    }

    return (
        <section className='bg-light d-flex flex-column align-items-center rounded'>
            { profileInfo }
        </section>

    );

};

export default ProfileInfo;