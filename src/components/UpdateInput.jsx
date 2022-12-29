import React, {useState} from "react";
import Input from "./Input";
import {useTranslation} from "react-i18next";

const UpdateInput = ( { inputLabel, inputPlaceholder, inputHasError, inputError,
                          headerText, buttonValue, updateMutator } ) => {

    const [ isInputHidden, setIsInputHidden ] =useState( true );
    const [ buttonText, setButtonText ] = useState( buttonValue );
    const [ valueToUpdate, setValueToUpdate ] = useState( "" );
    const { t } = useTranslation();

    const inputOnChange = ( event ) => {
        setValueToUpdate( event.target.value );
    }

    const toggleInputField = () => {
        setIsInputHidden( !isInputHidden );
        setButtonText( buttonText === buttonValue ? "Cancel" : buttonValue );
        setValueToUpdate( "" );
    }
    const onClickUpdate = ( event ) => {
        event.preventDefault();
        toggleInputField();
        setValueToUpdate( "" );
        updateMutator( valueToUpdate );
    }

    return (
            <div className="bg-light rounded mb-2">
                <h5 className="d-inline"> { headerText }</h5>
                <button
                    className="btn btn-sm btn-warning float-end"
                    onClick={ toggleInputField }
                >{ buttonText }
                </button>
                <div className={ isInputHidden ? "col-12 mb-3 visually-hidden" : "col-12 mb-3"}>
                    <Input
                        label={ inputLabel }
                        placeholder= { inputPlaceholder }
                        value={ valueToUpdate }
                        onChange={ inputOnChange }
                        hasError={ inputHasError }
                        error={ inputError }
                    />
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={ onClickUpdate }
                    >{ t( "updateInput.update" ) }
                    </button>
                </div>
            </div>
    );

};

export default UpdateInput;