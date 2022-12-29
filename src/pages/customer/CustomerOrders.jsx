import React from "react";
import {useTranslation} from "react-i18next";

const CustomerOrders = () => {
    const { t } = useTranslation();

    return (
        <section>
            <h3>{ t( "customersOrders.header" ) }</h3>
        </section>
    );
};

export default CustomerOrders;