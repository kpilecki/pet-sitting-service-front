import React from "react";

const YesNoCheckbox = ( props ) => {

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
                >Yes</label>
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
                >No</label>
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