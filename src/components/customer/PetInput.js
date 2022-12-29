import React, { useState } from "react";
import Input from "../Input";
import YesNoCheckbox from "../YesNoCheckbox";
import { useTranslation } from "react-i18next";

const PetInput = ( props ) => {
    const [ name, setName ] = useState( props.pet.name || "" );
    const [ species, setSpecies ] = useState( props.pet.species || "" );
    const [ breed, setBreed ] = useState( props.pet.breed || "" );
    const [ size, setSize ] = useState( props.pet.size || "" );
    const [ gender, setGender ] = useState( props.pet.gender || "" );
    const [ birthYear, setBirthYear ] = useState( props.pet.birthYear || undefined );
    const [ neutered, setNeutered ] = useState( props.pet.neutered || false );
    const [ chipped, setChipped ] = useState( props.pet.chipped || false );
    const [ vaccinated, setVaccinated ] = useState( props.pet.vaccinated || false );
    const [ houseTrained, setHouseTrained ] = useState( props.pet.houseTrained || false );
    const [ friendlyWithDogs, setFriendlyWithDogs ] = useState( props.pet.friendlyWithDogs || false );
    const [ friendlyWithCats, setFriendlyWithCats ] = useState( props.pet.friendlyWithCats || false );
    const [ friendlyWithKids, setFriendlyWithKids ] = useState( props.pet.friendlyWithKids || false );
    const [ friendlyWithAdults, setFriendlyWithAdults ] = useState( props.pet.friendlyWithAdults || false );
    const [ description, setDescription ] = useState( props.pet.description || "" );
    const { t } = useTranslation();

    const petTypes = [ "DOG", "CAT", "RABBIT", "GUINEA_PIG", "FERRET", "BIRD", "REPTILE", "FARM_ANIMAL", "HORSE" ];
    const petSizes = [ "EXTRA_SMALL", "SMALL", "MEDIUM", "LARGE", "GIANT" ];

    const onNameChange = ( event ) => {
        setName( event.target.value );
    };

    const onBreedChange = ( event ) => {
        setBreed( event.target.value );
    };

    const onBirthYearChange = ( event ) => {
        setBirthYear( event.target.value );
    };

    const onDescriptionChange = ( event ) => {
      setDescription( event.target.value );
    };

    const onSave = ( event ) => {
        event.preventDefault();
        const pet = {
                name: name,
                species: species,
                breed: breed,
                size: size,
                gender: gender,
                birthYear: birthYear,
                neutered: neutered,
                chipped: chipped,
                vaccinated: vaccinated,
                houseTrained: houseTrained,
                friendlyWithDogs: friendlyWithDogs,
                friendlyWithCats: friendlyWithCats,
                friendlyWithKids: friendlyWithKids,
                friendlyWithAdults: friendlyWithAdults,
                description: description,
                profileImageId: undefined
        };
        props.onSaveCallback( pet );
    };

    const onCancel = ( event ) => {
      event.preventDefault();
      props.onCancelCallback();
    };

    return(
        <section className="m-2">
            <header>
                <h5 className="text-center">{ props.headerText }</h5>
            </header>
            <main className="d-flex flex-column gap-2">
                <hr/>
                <Input
                    label={ t( "petInput.petNameInputLabel" ) }
                    placeholder={ t( "petInput.petNameInputPlaceholder" ) }
                    value={ name }
                    onChange={ onNameChange }
                    hasError={ props.errors.name && true }
                    error={ props.errors.name }
                />
                <div>
                    <span>{ t( "petInput.species" ) }</span>
                    <select
                        className={ "form-select".concat( props.errors.species ? " is-invalid" : " is-valid" )}
                        defaultValue={ props.pet.species || t( "petInput.selectSpecies" ) }
                        onChange={ ( event ) => setSpecies( event.target.value )}
                    >
                        <option value="">{ t( "petInput.selectSpecies" ) }</option>
                        { petTypes.map( ( type ) => {
                            return (
                                <option
                                    key={ type }
                                    value={ type }
                                >{ t( "petType.".concat( type ) ) }
                                </option>
                            );
                        })}
                    </select>
                    { props.errors.species && (
                        <span className="invalid-feedback">{ props.errors.species }</span>
                    )}
                </div>
                <Input
                    label={ t( "petInput.breedInputLabel" ) }
                    placeholder={ t( "petInput.breedInputPlaceholder" ) }
                    value={ breed }
                    onChange={ onBreedChange }
                    hasError={ props.errors.breed && true }
                    error={ props.errors.breed }
                />
                <div>
                    <span>{ t( "petInput.petSize" ) }</span>
                    <select
                        className={ "form-select".concat( props.errors.size ? " is-invalid" : " is-valid" )}
                        defaultValue={ props.pet.size || t( "petInput.selectPetSize" ) }
                        onChange={ ( event ) => setSize( event.target.value ) }
                    >
                        <option value="">{ t( "petInput.selectPetSize" ) }</option>
                        { petSizes.map( ( size ) => {
                            return (
                                <option
                                    key={ size }
                                    value={ size }
                                >{ t( "petSize.".concat( size ) ) }
                                </option>
                            );
                        })}
                    </select>
                    { props.errors.size && (
                        <span className="invalid-feedback">{ props.errors.size }</span>
                    )}
                </div>
                <div>
                    <span>{ t( "petInput.petGender" ) }</span>
                    <select
                        className={ "form-select".concat( props.errors.gender ? " is-invalid" : " is-valid" )}
                        defaultValue={ props.pet.gender || t( "petInput.selectPetGender" ) }
                        onChange={ ( event ) => setGender( event.target.value ) }
                    >
                        <option value="">{ t( "petInput.selectPetGender" ) }</option>
                        <option value="MALE">{ t( "petGender.MALE" ) }</option>
                        <option value="FEMALE">{ t( "petGender.FEMALE" ) }</option>
                    </select>
                    { props.errors.gender && (
                        <span className="invalid-feedback">{ props.errors.gender }</span>
                    )}
                </div>
                <Input
                    type="number"
                    label={ t( "petInput.petBirthYearInputLabel" ) }
                    placeholder={ t( "petInput.petBirthYearInputPlaceholder" ) }
                    value={ birthYear }
                    onChange={ onBirthYearChange }
                    hasError={ props.errors.birthYear && true }
                    error={ props.errors.birthYear }
                />
                <div className="d-flex flex-wrap gap-2 justify-content-around">
                    <YesNoCheckbox
                        headerText={ t( "petInput.isNeutered" ) }
                        onButtonClick={ setNeutered }
                        value={ neutered }
                        defaultValue={ props.pet.neutered }
                        id="neutered"
                    />
                    <YesNoCheckbox
                        headerText={ t( "petInput.isChipped" ) }
                        onButtonClick={ setChipped }
                        value={ chipped }
                        defaultValue={ props.pet.chipped }
                        id="chipped"
                    />
                    <YesNoCheckbox
                        headerText={ t( "petInput.isVaccinated" ) }
                        onButtonClick={ setVaccinated }
                        value={ vaccinated }
                        defaultValue={ props.pet.vaccinated }
                        id="vaccinated"
                    />
                    <YesNoCheckbox
                        headerText={ t( "petInput.isHouseTrained" ) }
                        onButtonClick={ setHouseTrained }
                        value={ houseTrained }
                        defaultValue={ props.pet.houseTrained }
                        id="houseTrained"
                    />
                    <YesNoCheckbox
                        headerText={ t( "petInput.isFriendlyWithDogs" ) }
                        onButtonClick={ setFriendlyWithDogs }
                        value={ friendlyWithDogs }
                        defaultValue={ props.pet.friendlyWithDogs }
                        id="friendlyWithDogs"
                    />
                    <YesNoCheckbox
                        headerText={ t( "petInput.isFriendlyWithCats" ) }
                        onButtonClick={ setFriendlyWithCats }
                        value={ friendlyWithCats }
                        defaultValue={ props.pet.friendlyWithCats }
                        id="friendlyWithCats"
                    />
                    <YesNoCheckbox
                        headerText={ t( "petInput.isFriendlyWithKids" ) }
                        onButtonClick={ setFriendlyWithKids }
                        value={ friendlyWithKids }
                        defaultValue={ props.pet.friendlyWithKids }
                        id="friendlyWithKids"
                    />
                    <YesNoCheckbox
                        headerText={ t( "petInput.isFriendlyWithAdults" ) }
                        onButtonClick={ setFriendlyWithAdults }
                        value={ friendlyWithAdults }
                        defaultValue={ props.pet.friendlyWithAdults }
                        id="friendlyWithAdults"
                    />
                </div>
                <label htmlFor="description">{ t( "petInput.descriptionLabel" ) }</label>
                <textarea
                    className={ "form-control".concat( props.errors.description ? " is-invalid" : " is-valid" )}
                    id="description"
                    rows='5'
                    defaultValue={ props.pet.description }
                    onChange={ onDescriptionChange }
                >
                </textarea>
                { props.errors.description && (
                    <span className="invalid-feedback">{ props.errors.description }</span>
                )}
                <hr/>
            </main>
            <footer className="d-flex justify-content-center gap-2">
                <button className="btn btn-warning" onClick={ onSave }>{ t( "petInput.saveButton" ) }</button>
                <button className="btn btn-danger" onClick={ onCancel }>{ t( "petInput.cancelButton" ) }</button>
            </footer>
        </section>
    )
};

PetInput.defaultProps = {
    headerText: "",
    pet: {
        name: undefined,
        species: undefined,
        breed: undefined,
        size: undefined,
        gender: undefined,
        birthYear: undefined,
        neutered: undefined,
        chipped: undefined,
        vaccinated: undefined,
        houseTrained: undefined,
        friendlyWithDogs: undefined,
        friendlyWithCats: undefined,
        friendlyWithKids: undefined,
        friendlyWithAdults: undefined,
        description: undefined,
        profileImageId: undefined

    },
    errors: {},
    onSaveCallback: () => {},
    onCancelCallback: () => {}
};

export default PetInput;