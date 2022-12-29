import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getProfileImage, updateProfileImage} from "../api/customerApi";
import ImageUpload from "./ImageUpload";

const ProfileImageUpdate = () => {
    const [ errors, setErrors ] = useState( {} );
    const queryClient = useQueryClient();

    const { isLoading, isError, error, data } = useQuery( 'customerProfileImage', getProfileImage );

    const updateImageMutation = useMutation( updateProfileImage, {
        onSuccess: () => {
            queryClient.invalidateQueries( 'customerProfileImage' );
        },
        onError: ( error ) => {
            setErrors( error.response.data.message )
        }
    });

    const updateImage = ( image ) => {
      updateImageMutation.mutate( image );
    };

    return(
        <ImageUpload
            currentImage={ data.image }
            onUpload={ updateImage }
        />
    );
};

export default ProfileImageUpdate;