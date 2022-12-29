import React from "react";
import {useTranslation} from "react-i18next";

const ProviderOrders = () => {
    const { t } = useTranslation();

    return(
      <section className="bg-light rounded">
          <h2>{ t( "providerOrders.pendingOrders" ) }</h2>
          <h4>{ t( "providerOrders.noOrders" ) }</h4>
      </section>
    );
};

export default ProviderOrders;