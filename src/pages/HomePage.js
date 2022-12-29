import React from "react";
import {useTranslation} from "react-i18next";
const image = require('.././images/homepage1.jpg');
const image2 = require('.././images/homepage2.jpg');

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <main className="bg-light w-75 p-2 m-auto d-flex justify-content-center flex-column">
            <section className="d-flex align-items-center">
                <img src={ image } className="img-fluid rounded" width="50%"/>
                <div className="">
                    <h1 className="text-center text-warning " >{ t( "homePage.section1.header" ) }</h1>
                    <h5 className="text-center m-4 text-success">{ t( "homePage.section1.text" ) }</h5>
                </div>
            </section>
            <section className="d-flex align-items-center">
                <div className="">
                    <h1 className="text-center text-warning " >{ t( "homePage.section2.header" ) }</h1>
                    <h5 className="text-center m-4 text-success">{ t( "homePage.section2.text" ) }</h5>
                </div>
                <img src={ image2 } className="img-fluid rounded" width="50%"/>
            </section>
        </main>
    );
};

export default HomePage;