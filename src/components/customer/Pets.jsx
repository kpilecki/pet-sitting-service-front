import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import { getPets, savePet } from "../../api/petApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import PetInput from "./PetInput";
import PetSmallView from "./PetSmallView";
import {useTranslation} from "react-i18next";

const Pets = () => {
    const { isLoading, isError, error, data } = useQuery( 'pets', getPets );
    const [ errors, setErrors ] = useState( {} );
    const [ isAddNewPetHidden, setisAddNewPetHidden ] = useState( true );
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const saveNewPetMutator = useMutation( savePet, {
        onSuccess: () => {
            queryClient.invalidateQueries( 'pets' );
            setisAddNewPetHidden( true );
            setErrors( {} );
        },
        onError: ( error ) => {
            setErrors( error.response.data.validationErrors );
        }
    } );

    const onClickShow = ( event ) => {
      event.preventDefault();
      setisAddNewPetHidden( false );
    };

    const savePetOnSave = ( pet ) => {
        saveNewPetMutator.mutate( pet );
    };

    const savePetOnCancel = () => {
        setisAddNewPetHidden( true );
        setErrors( {} );
    };

    if( isLoading ) {
        return (
            <h4 className="text-center text-warning">{ t( "pets.loading" ) }</h4>
        );

    } else if( isError ) {
        return (
            <h4 className="text-center text-danger">{ t( "pets.error" ) }</h4>
        );
    } else if( data.pets.length === 0 ){
        return (
            <section className='bg-light rounded'>
                <h3 className="text-center">{ t( "pets.noPets" ) }</h3>
                < PetInput
                    headerText ={ t( "pets.petInputHeaderText" ) }
                    errors= { errors }
                    onSaveCallback = { savePetOnSave }
                    onCancelCallback = { savePetOnCancel }
                />
            </section>
        )
    } else {
        if( !isAddNewPetHidden ){
            return (
                <section>
                    < PetInput
                        headerText = { t( "pets.petInputHeaderText" ) }
                        errors= { errors }
                        onSaveCallback = { savePetOnSave }
                        onCancelCallback = { savePetOnCancel }
                        />
                </section>
            )
        } else {
            return (
                <section className='bg-light rounded'>
                    <ul className="container d-flex ">
                        { data.pets.map( ( pet ) => {
                            return(
                                <PetSmallView
                                    pet={ pet }
                                />
                            )
                        })}
                    </ul>
                    <button
                        className="btn btn-warning float-end m-2"
                        onClick={ onClickShow }
                    >Add new Pet
                    </button>
                </section>
            )
        }
    }
};

export default Pets;