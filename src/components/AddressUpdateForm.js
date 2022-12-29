import React, {useState} from "react";
import Input from "./Input";
import {useTranslation} from "react-i18next";

const AddressUpdateForm = ( { address, btnText, onSubmit, errors } ) => {
    const [ street, setStreet ] = useState( address.street && "" );
    const [ city, setCity ] = useState( address.city && "" );
    const [ municipality, setMunicipality ] = useState( address.municipality && "" );
    const [ country, setCountry ] = useState( address.country && "" );
    const [ postCode, setPostCode ] = useState( address.postCode && "" );
    const { t } = useTranslation();

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
    };

    const onFormSubmit = ( event ) => {
        event.preventDefault();
        onSubmit( {
            street: street,
            city: city,
            municipality: municipality,
            country: country,
            postCode: postCode
        });
    };

  return (
      <>
          <Input
              label={ t( "addressUpdateForm.street" ) }
              placeholder={ t( "addressUpdateForm.streetPlaceholder" ) }
              onChange={ streetOnChange }
              hasError={ errors.street && true }
              error={ errors.street }
          />
          <Input
              label={ t( "addressUpdateForm.city" ) }
              placeholder={ t( "addressUpdateForm.cityPlaceholder" ) }
              onChange={ cityOnChange }
              hasError={ errors.city && true }
              error={ errors.city }
          />
          <Input
              label={ t( "addressUpdateForm.municipality" ) }
              placeholder={ t( "addressUpdateForm.municipalityPlaceholder" ) }
              onChange={ municipalityOnChange }
              hasError={ errors.municipality && true }
              error={ errors.municipality }
          />
          <Input
              label={ t( "addressUpdateForm.country" ) }
              placeholder={ t(  "addressUpdateForm.countryPlaceholder" ) }
              onChange={ countryOnChange }
              hasError={ errors.country && true }
              error={ errors.country }
          />
          <Input
              label={ t( "addressUpdateForm.postCode" ) }
              placeholder={ t(  "addressUpdateForm.postCodePlaceholder" ) }
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