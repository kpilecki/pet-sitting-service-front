import React, {useState} from "react";
import {useTranslation} from "react-i18next";

const ProviderServiceUpdate = ( props ) => {
    const [ serviceType, setServiceType ] = useState( props.service.serviceType );
    const [ description, setDescription ] = useState( props.service.description );
    const [ price, setPrice ] = useState( props.service.price );
    const [ acceptedPetTypes, setAcceptedPetTypes ] = useState( props.service.acceptedPetTypes );
    const [ acceptedPetSizes, setAcceptedPetSizes ] = useState( props.service.acceptedPetSizes );
    const [ minPetAge, setMinPetAge ] = useState( props.service.minPetAge );
    const [ maxPetAge, setMaxPetAge ] = useState( props.service.maxPetAge );
    const { t } = useTranslation();

    const petTypes = [ "DOG", "CAT", "RABBIT", "GUINEA_PIG", "FERRET", "BIRD", "REPTILE", "FARM_ANIMAL", "HORSE" ];
    const petSizes = [ "EXTRA_SMALL", "SMALL", "MEDIUM", "LARGE", "GIANT" ];
    const serviceTypes = [ "BOARDING", "DAY_CARE", "WALKING", "HOME_VISIT", "HOUSE_SITTING", "PICK_UP_DROP_OFF", "TRAINING", "GROOMING" ];

    const typeOnCheck = ( event ) => {
        if( acceptedPetTypes.includes( event.target.value ) ){
            const temp = acceptedPetTypes.filter( v => v !== event.target.value );
            setAcceptedPetTypes( temp );
        } else {
            const temp = [ ...acceptedPetTypes ];
            temp.push( event.target.value );
            setAcceptedPetTypes( temp );
        }
    };

    const sizeOnCheck = ( event ) => {
        if( acceptedPetSizes.includes( event.target.value ) ){
            const temp = acceptedPetSizes.filter( v => v !== event.target.value );
            setAcceptedPetSizes( temp );
        } else {
            const temp = [ ...acceptedPetSizes ];
            temp.push( event.target.value );
            setAcceptedPetSizes( temp );
        }
    };

    const onSave = ( event ) => {
      event.preventDefault();
      props.onSave( {
          id: props.service.id,
          serviceType: serviceType,
          description: description,
          price: price,
          acceptedPetTypes: acceptedPetTypes,
          acceptedPetSizes: acceptedPetSizes,
          minPetAge: minPetAge,
          maxPetAge: maxPetAge
      } );
    };

    const onDelete = ( event ) => {
      event.preventDefault();
      props.onDelete( props.service.id );
    };

  return (
      <section>
          <h5>{ props.heading }</h5>
          <hr/>
          <div>
              <h5>{ t( "providerServiceUpdate.serviceType" ) }</h5>
              <span>{ t( "providerServiceUpdate.required" ) }</span>
              <select
                  className={ "form-select".concat( props.errors.serviceType ? " is-invalid" : " is-valid" )}
                  defaultValue={ serviceType || t( "providerServiceUpdate.selectServiceType" ) }
                  onChange={ ( event ) => setServiceType( event.target.value ) }
              >
                  <option value="">{ t( "providerServiceUpdate.selectServiceType" ) }</option>
                  { serviceTypes.map( ( type ) => {
                      return (
                          <option
                              key={ type }
                              value={ type }
                          >{ t( "serviceType.".concat( type ) ) }
                          </option>
                      );
                  })}
              </select>
              { props.errors.serviceType && (
                  <span className="invalid-feedback">{ props.errors.serviceType }</span>
              )}
          </div>
          <hr/>
          <div>
              <h5>{ t( "providerServiceUpdate.serviceDescription" ) }</h5>
              <span>{ t( "providerServiceUpdate.required" ) }</span>
              <textarea
                  className="form-control"
                  rows= '5'
                  value={ description }
                  onChange={ ( e ) => { setDescription( e.target.value )} }
              />
              { props.errors.description && (
                  <span className="invalid-feedback">{ props.errors.description }</span>
              )}
          </div>
          <hr/>
          <div>
              <h5>{ t( "providerServiceUpdate.price" ) }</h5>
              <span>{ t( "providerServiceUpdate.required" ) }</span>
              <input
                  className="form-control"
                  type="number"
                  min="0"
                  max="1000000"
                  step="0.1"
                  value={ price }
                  onChange={ ( e ) => setPrice( e.target.value ) }
              />
              { props.errors.price && (
                  <span className="invalid-feedback">{ props.errors.price }</span>
              )}
          </div>
          <hr/>
          <div>
              <h5>{ t( "providerServiceUpdate.acceptedPetTypes" ) }</h5>
              <span>{ t( "providerServiceUpdate.required" ) }</span>
              <div className="d-flex flex-column">
                  { petTypes.map( ( type ) => {
                      return (
                          <div key={ type }>
                              <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={ type }
                                  name={ type }
                                  value={ type }
                                  checked={ acceptedPetTypes.includes( type ) }
                                  onChange={ typeOnCheck }
                              />
                              <label
                                  className="form-label"
                                  htmlFor={ type }
                              >
                                  { t( "petType.".concat( type ) ) }
                              </label>
                          </div>
                      );
                  })}
              </div>
          </div>
          <hr/>
          <div>
              <h5>{ t( "providerServiceUpdate.acceptedPetSizes" ) }</h5>
              <span>{ t( "providerServiceUpdate.required" ) }</span>
              <div className="d-flex flex-column">
                  { petSizes.map( ( size ) => {
                      return (
                          <div key={ size }>
                              <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={ size }
                                  name={ size }
                                  value={ size }
                                  checked={ acceptedPetSizes.includes( size ) }
                                  onChange={ sizeOnCheck }
                              />
                              <label
                                  className="form-label"
                                  htmlFor={ size }
                              >
                                  { t( "petSize.".concat( size ) ) }
                              </label>
                          </div>
                      );
                  })}
              </div>
          </div>
          <hr/>
          <div>
              <h5>{ t( "providerServiceUpdate.minPetAge" ) }</h5>
              <span>{ t( "providerServiceUpdate.required" ) }</span>
              <input
                  className="form-control"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={ minPetAge }
                  onChange={ ( e ) => setMinPetAge( e.target.value ) }
              />
              { props.errors.minPetAge && (
                  <span className="invalid-feedback">{ props.errors.minPetAge }</span>
              )}
          </div>
          <hr/>
          <div>
              <h5>{ t( "providerServiceUpdate.maxPetAge" ) }</h5>
              <span>{ t( "providerServiceUpdate.required" ) }</span>
              <input
                  className="form-control"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={ maxPetAge }
                  onChange={ ( e ) => setMaxPetAge( e.target.value ) }
              />
              { props.errors.maxPetAge && (
                  <span className="invalid-feedback">{ props.errors.maxPetAge }</span>
              )}
          </div>
          <hr/>
          <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-warning" onClick={ onSave }>{ t( "providerServiceUpdate.save" ) }</button>
              <button className="btn btn-danger" onClick={ props.onCancel }>{ t( "providerServiceUpdate.cancel" ) }</button>
              { props.service.id && (
                  <button className="btn btn-danger" onClick={ onDelete }>{ t( "providerServiceUpdate.delete" ) }</button>
              )}
          </div>
      </section>
  );
};

ProviderServiceUpdate.defaultProps = {
    heading: "",
    onCancel: () => {},
    onSave: () => {},
    onDelete: () => {},
    service: {
      id: "",
      serviceType: "",
      description: "",
      price: "",
      acceptedPetTypes: [],
      acceptedPetSizes: [],
      minPetAge: "",
      maxPetAge: ""
    },
    errors: {}
};

export default ProviderServiceUpdate;