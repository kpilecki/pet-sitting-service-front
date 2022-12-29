import React from "react";
import {useTranslation} from "react-i18next";

const Favourites = () => {
    const { t } = useTranslation();

    return (
      <section className='bg-light rounded'>
          <h2>{ t( "favourites.header" ) }</h2>
          <h4>{ t( "favourites.noFavourites" ) }</h4>
      </section>
    );
};

export default Favourites;
