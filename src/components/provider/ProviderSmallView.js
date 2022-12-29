import React, {useEffect, useState} from "react";
import {getImageById} from "../../api/serviceProviderApi";
import {useTranslation} from "react-i18next";


const ProviderSmallView = ( { provider } ) => {
    const [ image, setImage ] = useState( [] );
    const { t } = useTranslation();

    useEffect( () => {
        getImageById( provider.id )
            .then( ( response ) => {
                setImage( response.image )
            }).catch( err => console.error( err ) );
    }, []);

    return (
      <>
          <h5>{ provider.headline }</h5>
          <hr/>
          <div className="d-flex gap-2 justify-content-between">
              <div>
                  { image &&
                      <img className="img-fluid rounded-3" src={`data:image/jpeg;base64,${ image }`}
                           width='80'/>
                  }
                  <h5>{ provider.firstName } {provider.lastName }</h5>
              </div>
              <div>
                  <h6>{ t( "providerSmallView.about" ) }{ provider.firstName }</h6>
                  <p className="text-wrap">{ provider.about && provider.about.slice(0,50).concat("...") }</p>
              </div>
              <div>
                  <p>{ t( "providerSmallView.yearsOfExperience" ) }{ provider.yearsOfExperience }</p>
                  <p>{ provider.skillDescription && provider.skillDescription.slice(0,50).concat("...") }</p>
              </div>
          </div>
      </>
    );
};

ProviderSmallView.defaultProps = {
    provider: {
        id: "",
        firstName: "",
        lastName: "",
        profileImageId: "",
        about: "",
        headline: "",
        yearsOfExperience: "",
        skillDescription: ""
    }
}

export default ProviderSmallView;