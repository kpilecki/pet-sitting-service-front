import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { i18n } = useTranslation();

    function changeLanguage( event ) {
        i18n.changeLanguage( event.target.value );
    }

    return(
        <footer className="bg-gradient shadow shadow-lg d-flex justify-content-end gap-2 p-4 ">
                <button className="btn btn-dark" value="en" onClick={ changeLanguage }>EN</button>
                <button className="btn btn-dark" value="lt" onClick={ changeLanguage }>LT</button>
        </footer>
    )
};

export default Footer;