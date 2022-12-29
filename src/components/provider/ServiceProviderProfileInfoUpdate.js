import React, {useState} from "react";
import {useTranslation} from "react-i18next";


const ServiceProviderProfileInfoUpdate = ( props ) => {

    const [ about, setAbout ] = useState( props.info.about );
    const [ headline, setHeadline ] = useState( props.info.headline );
    const [ skillDescription, setSkillDescription ] = useState( props.info.skillDescription );
    const [ yearsOfExperience, setYearsOfExperience ] = useState( props.info.yearsOfExperience );
    const [ acceptedPaymentMethods, setAcceptedPaymentMethods ] = useState( props.info.acceptedPaymentMethods );
    const { t } = useTranslation();

    const onSave = ( event ) => {
        event.preventDefault();
        props.onSave( {
            about: about,
            headline: headline,
            skillDescription: skillDescription,
            yearsOfExperience: yearsOfExperience,
            acceptedPaymentMethods: acceptedPaymentMethods
        });
    };

    const onCheck = ( event ) => {
        if( acceptedPaymentMethods.includes( event.target.value ) ){
            const temp = acceptedPaymentMethods.filter( v => v !== event.target.value );
            setAcceptedPaymentMethods( temp );
        } else {
            const temp = [ ...acceptedPaymentMethods ];
            temp.push( event.target.value );
            setAcceptedPaymentMethods( temp );
        }
    };

  return (
      <section className="m-4 d-flex flex-column">
          <h5 className="text-center">{ t( "serviceProviderProfileInfoUpdate.aboutYou" ) }</h5>
          <span>{ t( "serviceProviderProfileInfoUpdate.required" ) }</span>
          <textarea
              className="form-control"
              rows= '5'
              value={ about }
              onChange={ ( e ) => setAbout( e.target.value ) }
          />
          { props.errors.about && (
              <span className="invalid-feedback">{ props.errors.about }</span>
          )}
          <hr/>
          <h5 className="text-center">{ t( "serviceProviderProfileInfoUpdate.headline" ) }</h5>
          <h6 className="text-center">{ t( "serviceProviderProfileInfoUpdate.headlineDesc" ) }</h6>
          <span>{ t( "serviceProviderProfileInfoUpdate.required" ) }</span>
          <textarea
              className="form-control"
              rows= '2'
              value={ headline }
              onChange={ ( e ) => { setHeadline( e.target.value ) } }
          />
          { props.errors.headline && (
              <span className="invalid-feedback">{ props.errors.headline }</span>
          )}
          <hr/>
          <h5 className="text-center">{ t( "serviceProviderProfileInfoUpdate.skillDescription" ) }</h5>
          <h6 className="text-center">{ t( "serviceProviderProfileInfoUpdate.skillDescriptionMsg" ) }</h6>
          <span>{ t( "serviceProviderProfileInfoUpdate.required" ) }</span>
          <textarea
              className="form-control"
              rows= '2'
              value={ skillDescription }
              onChange={ ( e ) => { setSkillDescription( e.target.value )} }
          />
          { props.errors.skillDescription && (
              <span className="invalid-feedback">{ props.errors.skillDescription }</span>
          )}
          <hr/>
          <h5 className="text-center">{ t( "serviceProviderProfileInfoUpdate.yearsOfExperience" ) }</h5>
          <span>{ t( "serviceProviderProfileInfoUpdate.required" ) }</span>
          <input
              className="form-control"
              type="number"
              min="0"
              max="100"
              step="1"
              value={ yearsOfExperience }
              onChange={ ( e ) => setYearsOfExperience( e.target.value ) }
          />
          { props.errors.yearsOfExperience && (
              <span className="invalid-feedback">{ props.errors.yearsOfExperience }</span>
          )}
          <hr/>
          <h5 className="text-center">{ t( "serviceProviderProfileInfoUpdate.preferredPaymentMethods" ) }</h5>
          <h6 className="text-center">{ t( "serviceProviderProfileInfoUpdate.preferredPaymentMethodsMsg" ) }</h6>
          <span>{ t( "serviceProviderProfileInfoUpdate.required" ) }</span>
          <div className="d-flex flex-column">
            <div>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="BANK_ACCOUNT"
                    name="BANK_ACCOUNT"
                    value="BANK_ACCOUNT"
                    checked={ acceptedPaymentMethods.includes( "BANK_ACCOUNT" ) }
                    onChange={ onCheck }
                />
                <label className="form-label" htmlFor="BANK_ACCOUNT">{ t( "paymentMethod.BANK_ACCOUNT" ) }</label>
            </div>
            <div>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="CREDIT_CARD"
                    name="CREDIT_CARD"
                    value="CREDIT_CARD"
                    checked={ acceptedPaymentMethods.includes( "CREDIT_CARD" ) }
                    onChange={ onCheck }
                />
                <label className="form-label" htmlFor="CREDIT_CARD">{ t( "paymentMethod.CREDIT_CARD" ) }</label>
            </div>
            <div>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="CHEQUE"
                    name="CHEQUE"
                    value="CHEQUE"
                    checked={ acceptedPaymentMethods.includes( "CHEQUE" ) }
                    onChange={ onCheck }
                />
                <label className="form-label" htmlFor="CHEQUE">{ t( "paymentMethod.CHEQUE" ) }</label>
            </div>
            <div>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="PAYPAL"
                    name="PAYPAL"
                    value="PAYPAL"
                    checked={ acceptedPaymentMethods.includes( "PAYPAL" ) }
                    onChange={ onCheck }
                />
                <label className="form-label" htmlFor="PAYPAL">{ t( "paymentMethod.PAYPAL" ) }</label>
            </div>
            <div>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="CASH"
                    name="CASH"
                    value="CASH"
                    checked={ acceptedPaymentMethods.includes( "CASH" ) }
                    onChange={ onCheck }
                />
                <label className="form-label" htmlFor="CASH">{ t( "paymentMethod.CASH" ) }</label>
            </div>
              { props.errors.acceptedPaymentMethods && (
                  <span className="invalid-feedback">{ props.errors.acceptedPaymentMethods }</span>
              )}
      </div>
        <hr/>
          <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-warning" onClick={ onSave }>{ t( "serviceProviderProfileInfoUpdate.save" ) }</button>
              <button className="btn btn-danger" onClick={ props.onCancel }>{ t( "serviceProviderProfileInfoUpdate.cancel" ) }</button>
          </div>
      </section>
  )
};

ServiceProviderProfileInfoUpdate.defaultProps = {
    info: {
        about: "",
        headline: "",
        skillDescription: "",
        yearsOfExperience: "",
        acceptedPaymentMethods: []
    },
    onCancel: () => {},
    onSave: () => {},
    errors: {}
}

export default ServiceProviderProfileInfoUpdate;