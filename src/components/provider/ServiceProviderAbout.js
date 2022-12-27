import React, {useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import { getServiceProviderAbout } from "../../api/serviceProviderApi";
import InputTextArea from "../InputTextArea";

const ServiceProviderAbout = () => {
    const { isLoading, isError, error, data } = useQuery( 'serviceProviderAbout', getServiceProviderAbout );
    const [ isEditable, setIsEditable ] = useState( false );
    const queryClient = useQueryClient();

    let result;

    const toggleIsEditable = ( event ) => {
      event.preventDefault();
      setIsEditable( !isEditable );
    };

    const callbackOnUpdate = () => {
      setIsEditable( false );
        queryClient.invalidateQueries( 'serviceProviderAbout' );
    };

    if( isLoading ) {
        result = (
            <h4 className="text-center text-warning">Loading...</h4>
        );

    } else if( isError ){
        result = (
          <h4 className="text-center text-danger">Sorry, unexpected error has occurred</h4>
        );

    } else {
        if( data === undefined || data === '' ){
            result = (
              <>
                  <h5>Tell us more about yourself</h5>
                  <InputTextArea
                      callback={ callbackOnUpdate }
                      onCancel={ toggleIsEditable }
                  />
              </>
            );
        } else {
            result = (
                isEditable ?
                    (
                        <>
                            <h5>Update About</h5>
                            <InputTextArea
                                value={ data }
                                inputHeight= '15'
                                callback={ callbackOnUpdate }
                                onCancel ={ toggleIsEditable }
                            />

                        </>
                    )
                    :
                    (
                        <>
                            <h5>About you</h5>
                            <p>{ data }</p>
                            <button className="btn btn-warning" onClick={ toggleIsEditable }>Edit</button>
                        </>
                    )
            )
        }
    }

    return (
        <section className="container bg-light rounded">
            { result }
        </section>
    );
};

export default ServiceProviderAbout;