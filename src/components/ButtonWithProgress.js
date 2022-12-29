import React from "react";
import {useTranslation} from "react-i18next";

const ButtonWithProgress = ( props ) => {
    const { t } = useTranslation();

    return (
        <button 
            className="btn btn-primary"
            onClick={ props.onClick }
            disabled={ props.disabled }
        >
        { props.pendingApiCall && (
            <div className="spinner-border text-light spinner-border-sm mr-1">
                <p className="visually-hidden">{ t( "buttonWithProgress.loading" ) }</p>
            </div>
        )}
        { props.text }
    </button>
    );
};

export default ButtonWithProgress;