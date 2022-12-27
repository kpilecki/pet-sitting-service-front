import React, {useState} from "react";
import ProfileInfo from "../../components/customer/ProfileInfo";
import Pets from "../../components/customer/Pets";
import SecondaryMenu from "../../components/SecondaryMenu";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getPetImage, getPets, savePet, savePetImage, updatePet} from "../../api/petApi";
import PetInput from "../../components/customer/PetInput";
import ImageUpload from "../../components/ImageUpload";

const PetEdit = () => {
    const params = useParams();
    const [ errors, setErrors ] = useState( {} );
    const queryClient = useQueryClient();
    const { isLoading, isError, error, data } = useQuery( 'pets', getPets );
    const navigate = useNavigate();

    const { isLoading: imageIsLoading, isError: imageIsError, error: imageError, data: imageData } = useQuery( 'petImage', () => getPetImage( params.id )  );

    const updateImageMutation = useMutation( savePetImage, {
        onSuccess: () => {
            queryClient.invalidateQueries( 'petImage' );
            console.log( "Image saved" );
        },
        onError: ( error ) => {
            setErrors( error.response.data.message )
        }
    });

    const onImageUpload = ( image ) => {
        updateImageMutation.mutate( { id: params.id, image: image } );
    };

    const onCancelEdit = ( ) => {
      navigate( '/customer/pets');
    };

    const updatePetMutator = useMutation( updatePet, {
        onSuccess: () => {
            queryClient.invalidateQueries( 'pets' );
            setErrors( {} );
        },
        onError: ( error ) => {
            setErrors( error.response.data.validationErrors );
        }
    } );

    if( isLoading ) {
        return (
            <h4 className="text-center text-warning">Loading...</h4>
        );

    } else if( isError ) {
        return (
            <h4 className="text-center text-danger">Sorry, unexpected error has occurred</h4>
        );
    } else {
        const pet = data.pets.find(  ({ id })  => id.toString() === params.id );

        return(
            <main className="d-flex flex-wrap m-auto gap-2 justify-content-center w-75">

                <div className="col-sm-2">
                    <ProfileInfo />
                </div>
                <div className="col-lg d-flex flex-column gap-2">
                    <ImageUpload
                        currentImage={ !imageIsLoading && imageData.image }
                        onUpload ={ onImageUpload }
                    />
                    <PetInput
                        headerText="Edit your pet"
                        pet={ pet }
                        errors={ errors }
                        onSaveCallback={ updatePetMutator }
                        onCancelCallback={ onCancelEdit }
                    />
                </div>
                <div className="col-sm-2">
                    <SecondaryMenu />
                </div>
            </main>
        )
    }


};

export default PetEdit;