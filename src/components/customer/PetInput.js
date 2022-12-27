import React, {useState} from "react";
import Input from "../Input";
import YesNoCheckbox from "../YesNoCheckbox";
import {useMutation} from "react-query";
import * as events from "events";

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
                    label="*Pet name"
                    placeholder="Pet name"
                    value={ name }
                    onChange={ onNameChange }
                    hasError={ props.errors.name && true }
                    error={ props.errors.name }
                />
                <div>
                    <span>*Species</span>
                    <select
                        className={ "form-select".concat( props.errors.species ? " is-invalid" : " is-valid" )}
                        defaultValue={ props.pet.species || "Select species" }
                        onChange={ ( event ) => setSpecies( event.target.value )}
                    >
                        <option value="">Select species</option>
                        <option value="DOG">Dog</option>
                        <option value="CAT">Cat</option>
                        <option value="RABBIT">Rabbit</option>
                        <option value="GUINEA_PIG">Guinea Pig</option>
                        <option value="FERRET">Ferret</option>
                        <option value="BIRD">Bird</option>
                        <option value="REPTILE">Reptile</option>
                        <option value="FARM_ANIMAL">Farm Animal</option>
                        <option value="HORSE">Horse</option>
                    </select>
                    { props.errors.species && (
                        <span className="invalid-feedback">{ props.errors.species }</span>
                    )}
                </div>
                <Input
                    label="Breed"
                    placeholder="Pet breed"
                    value={ breed }
                    onChange={ onBreedChange }
                    hasError={ props.errors.breed && true }
                    error={ props.errors.breed }
                />
                <div>
                    <span>*Pet size</span>
                    <select
                        className={ "form-select".concat( props.errors.size ? " is-invalid" : " is-valid" )}
                        defaultValue={ props.pet.size || "Select size" }
                        onChange={ ( event ) => setSize( event.target.value ) }
                    >
                        <option value="">Select Size</option>
                        <option value="EXTRA_SMALL">Extra Small</option>
                        <option value="SMALL">Small</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LARGE">Large</option>
                        <option value="GIANT">Giant</option>
                    </select>
                    { props.errors.size && (
                        <span className="invalid-feedback">{ props.errors.size }</span>
                    )}
                </div>
                <div>
                    <span>*Pet Gender</span>
                    <select
                        className={ "form-select".concat( props.errors.gender ? " is-invalid" : " is-valid" )}
                        defaultValue={ props.pet.gender || "Select gender" }
                        onChange={ ( event ) => setGender( event.target.value ) }
                    >
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                    { props.errors.gender && (
                        <span className="invalid-feedback">{ props.errors.gender }</span>
                    )}
                </div>
                <Input
                    type="number"
                    label="*Birth Year"
                    placeholder="Pet birth year"
                    value={ birthYear }
                    onChange={ onBirthYearChange }
                    hasError={ props.errors.birthYear && true }
                    error={ props.errors.birthYear }
                />
                <div className="d-flex flex-wrap gap-2 justify-content-around">
                    <YesNoCheckbox
                        headerText="Is neutered?"
                        onButtonClick={ setNeutered }
                        value={ neutered }
                        defaultValue={ props.pet.neutered }
                        id="neutered"
                    />
                    <YesNoCheckbox
                        headerText="Is chipped?"
                        onButtonClick={ setChipped }
                        value={ chipped }
                        defaultValue={ props.pet.chipped }
                        id="chipped"
                    />
                    <YesNoCheckbox
                        headerText="Is vaccinated?"
                        onButtonClick={ setVaccinated }
                        value={ vaccinated }
                        defaultValue={ props.pet.vaccinated }
                        id="vaccinated"
                    />
                    <YesNoCheckbox
                        headerText="Is house trained?"
                        onButtonClick={ setHouseTrained }
                        value={ houseTrained }
                        defaultValue={ props.pet.houseTrained }
                        id="houseTrained"
                    />
                    <YesNoCheckbox
                        headerText="Is friendly with dogs?"
                        onButtonClick={ setFriendlyWithDogs }
                        value={ friendlyWithDogs }
                        defaultValue={ props.pet.friendlyWithDogs }
                        id="friendlyWithDogs"
                    />
                    <YesNoCheckbox
                        headerText="Is friendly with cats?"
                        onButtonClick={ setFriendlyWithCats }
                        value={ friendlyWithCats }
                        defaultValue={ props.pet.friendlyWithCats }
                        id="friendlyWithCats"
                    />
                    <YesNoCheckbox
                        headerText="Is friendly with kids?"
                        onButtonClick={ setFriendlyWithKids }
                        value={ friendlyWithKids }
                        defaultValue={ props.pet.friendlyWithKids }
                        id="friendlyWithKids"
                    />
                    <YesNoCheckbox
                        headerText="Is friendly with adults?"
                        onButtonClick={ setFriendlyWithAdults }
                        value={ friendlyWithAdults }
                        defaultValue={ props.pet.friendlyWithAdults }
                        id="friendlyWithAdults"
                    />
                </div>
                <label htmlFor="description">Tell us more about your pet</label>
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
                <button className="btn btn-warning" onClick={ onSave }>Save</button>
                <button className="btn btn-danger" onClick={ onCancel }>Cancel</button>
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