import React from "react";
import {useTranslation} from "react-i18next";

const Messages = () => {
    const { t } = useTranslation();

    return (
      <section className='bg-light rounded'>
          <h2>{ t( "messages.header" ) }</h2>
          <h4>{ t( "messages.noMessages" ) }</h4>
      </section>
    );
};

export default Messages;