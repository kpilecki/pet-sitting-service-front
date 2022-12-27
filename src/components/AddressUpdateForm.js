import React, {useState} from "react";
import Input from "./Input";

const AddressUpdateForm = ( { address, btnText, onSubmit, errors } ) => {
    const [ street, setStreet ] = useState( address.street && "" );
    const [ city, setCity ] = useState( address.city && "" );
    const [ municipality, setMunicipality ] = useState( address.municipality && "" );
    const [ country, setCountry ] = useState( address.country && "" );
    const [ postCode, setPostCode ] = useState( address.postCode && "" );

    const streetOnChange = ( event ) => {
      setStreet( event.target.value );
    };

    const cityOnChange = ( event ) => {
      setCity( event.target.value );

    };

    const municipalityOnChange = ( event ) => {
      setMunicipality( event.target.value );
    };

    const countryOnChange = ( event ) => {
      setCountry( event.target.value );
    };

    const postCodeOnChange = ( event ) => {
      setPostCode( event.target.value );
    }

    const onFormSubmit = ( event ) => {
        event.preventDefault();
        onSubmit( {
            street: street,
            city: city,
            municipality: municipality,
            country: country,
            postCode: postCode
        } );
    }


  return (
      <>
          <Input
              label="Street"
              placeholder="Your Street"
              onChange={ streetOnChange }
              hasError={ errors.street && true }
              error={ errors.street }
          />
          <Input
              label="City"
              placeholder="Your City"
              onChange={ cityOnChange }
              hasError={ errors.city && true }
              error={ errors.city }
          />
          <Input
              label="Municipality"
              placeholder="Your Municipality"
              onChange={ municipalityOnChange }
              hasError={ errors.municipality && true }
              error={ errors.municipality }
          />
          <Input
              label="Country"
              placeholder="Your Country"
              onChange={ countryOnChange }
              hasError={ errors.country && true }
              error={ errors.country }
          />
          <Input
              label="Post Code"
              placeholder="Your Post Code"
              onChange={ postCodeOnChange }
              hasError={ errors.postCode && true }
              error={ errors.postCode }
          />
          <button className="btn btn-warning mt-2" onClick={ onFormSubmit }>{ btnText }</button>
      </>
  )
};

AddressUpdateForm.defaultProps = {
    address: {
        street: "",
        city: "",
        municipality: "",
        country: "",
        postCode: ""
    },
    btnText: "Submit",
    onSubmit: () => {},
    errors: {}
}

export default AddressUpdateForm;