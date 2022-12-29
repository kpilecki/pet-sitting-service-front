import React from "react";
import ProviderSideMenu from "../../components/provider/ProviderSideMenu";
import ServiceProviderProfileInfo from "../../components/provider/ServiceProviderProfileInfo";

const ServiceProviderProfile = () => {

    return(
    <main className="d-flex flex-wrap m-auto gap-2 justify-content-center w-75">
        <div className="col-lg d-flex flex-column gap-2">
            <ServiceProviderProfileInfo />
        </div>
        <div className="col-sm-2">
            <ProviderSideMenu />
        </div>

    </main>
    );
};

export default ServiceProviderProfile;