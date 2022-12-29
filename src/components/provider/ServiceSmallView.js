import React, {useState} from "react";
import {enumToString} from "../../utils/utils";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const ServiceSmallView = ( { service } ) => {
    const [ bgColor, setBGColor ] = useState( "" );
    const navigate = useNavigate();
    const { t } = useTranslation();

    return(
        <div
            className={ "border border-warning rounded p-2 ".concat( bgColor ) }
            key={ service.id }
            onClick={ () => navigate( `/provider/services/${ service.id }`) }
            onMouseOver={ () => setBGColor( "bg-warning" ) }
            onMouseLeave={ () => setBGColor( "" ) }
        >
            <h5>{ enumToString( service.serviceType ) }</h5>
            <p> { service.description }</p>
            <h6>{ t( "serviceSmallView.price" ).concat( service.price )}</h6>
        </div>
    );

};

ServiceSmallView.defaultProps = {
  service: {
      id: "",
      serviceType: "",
      description: "",
      price: "",
      acceptedPetTypes: [],
      acceptedPetSizes: [],
      minPetAge: "",
      maxPetAge: "",
  }
};

export default ServiceSmallView;