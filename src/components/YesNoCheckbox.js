import React from "react";
import {useTranslation} from "react-i18next";

const YesNoCheckbox = ( props ) => {
    const { t } = useTranslation();

    return (
        <div className="d-flex flex-column align-items-center m-2">
            <h6>{ props.headerText }</h6>
            <div className="d-flex gap-2">
                <input
                    className="form-check-input visually-hidden"
                    type="checkbox"
                    id={ "yes".concat( props.id ) }
                    name={ "yes".concat( props.id ) }
                    defaultChecked={ props.defaultValue }
                    onChange={ () => props.onButtonClick( true ) }
                />
                <label
                    className={ "border border-warning p-2 rounded-circle".concat( props.value ? " bg-warning" : "" ) }
                    htmlFor={ "yes".concat( props.id ) }
                >{ t( "yesNoCheckbox.yes" ) }</label>
                <input
                    className="form-check-input visually-hidden"
                    type="checkbox"
                    id={ "no".concat( props.id ) }
                    name={ "no".concat( props.id ) }
                    defaultChecked={ !props.defaultValue }
                    onChange={ () => props.onButtonClick( false ) }
                />
                <label
                    className={ "border border-warning p-2 rounded-circle".concat( !props.value ? " bg-warning" : "" ) }
                    htmlFor={ "no".concat( props.id ) }
                >{ t( "yesNoCheckbox.no" ) }</label>
            </div>
        </div>
    );
};

YesNoCheckbox.defaultPops = {
    headerText: "",
    onButtonClick: {},
    value: {},
    defaultValue: {},
    id: ""
}

export default YesNoCheckbox;