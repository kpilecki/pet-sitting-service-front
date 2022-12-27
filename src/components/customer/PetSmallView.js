import React, {useEffect, useState} from "react";
import {getPetImage} from "../../api/petApi";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const PetSmallView = ( props ) => {
    const [ image, setImage ] = useState( {} );
    const [ bgColor, setBGColor ] = useState( "");
    const navigate = useNavigate();

    useEffect( () => {
      getPetImage( props.pet.id ).then( ( result ) => {
          setImage( result.image );
      });
    }, []);

    return (
      <div
          className={ "p-2 border border-warning rounded m-2 ".concat( bgColor) }
          onClick={ () => navigate( `/customer/pets/${ props.pet.id }`) }
          onMouseOver={ () => setBGColor( "bg-warning" )}
          onMouseLeave={ () => setBGColor( "" )}
          key={ props.pet.id }
      >
          { image && (
              <img className="rounded mx-auto img-fluid " src={ `data:image/jpeg;base64,${ image }` } width='150' alt="pet profile picture"/>
          )}
          <h5> { props.pet.name }</h5>
          <p> { props.pet.description.slice(0, 50 ) }</p>
      </div>
    );
};

PetSmallView.defaultProps = {
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
        description: "",
        profileImageId: undefined,
    }
};

export default PetSmallView;