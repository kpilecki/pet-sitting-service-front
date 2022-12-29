import React from "react";
import {useTranslation} from "react-i18next";

const MessagePage = () => {
    const { t } = useTranslation();

    return(
        <section>
            <h3>{ t( "messagePage.header" ) }</h3>
        </section>
    )
};

export default MessagePage;