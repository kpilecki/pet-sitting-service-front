import React, {useState} from "react";
import { useMutation } from "react-query";
import { updateServiceProviderAbout } from "../api/serviceProviderApi";

const InputTextArea = ({ value = "", callback = () => {} , onCancel = () => {}, inputHeight = 5 }) => {
    const [ text, setText ] = useState( value );
    const [ errors, setErrors ] = useState( {} );


    const updateAboutMutation = useMutation( updateServiceProviderAbout, {
        onSuccess: () => {
            callback();
        },
        onError: ( error ) => {
            setErrors( error.response.data.validationErrors )
        }
    });

    const onTextChange = ( event ) => {
        setText( event.target.value );
    };

    const onSave = ( event ) => {
        event.preventDefault();
        updateAboutMutation.mutate({ about: text } );
    };


  return (
      <div className="d-flex flex-column">
          <textarea className="form-control form-" rows={ inputHeight } value={ text } onChange={ onTextChange }></textarea>
          <span className="text-danger text-center">{ errors.about }</span>
          <button className="btn btn-success m-2" onClick={ onSave }>Save</button>
          <button className="btn btn-danger m-2" onClick={ onCancel }>Cancel</button>

      </div>
  )
};

export default InputTextArea;