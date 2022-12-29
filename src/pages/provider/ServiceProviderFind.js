import React from "react";
import ProfileInfo from "../../components/customer/ProfileInfo";
import SecondaryMenu from "../../components/SecondaryMenu";
import ServiceProviderList from "../../components/provider/ServiceProviderList";

const ServiceProviderFind = () => {

        return (
            <main className="d-flex flex-wrap m-auto gap-2 justify-content-center w-75">

                <div className="col-sm-2">
                    <ProfileInfo />
                </div>
                <div className="col-lg d-flex flex-column gap-2">
                    <ServiceProviderList />
                </div>
                <div className="col-sm-2">
                    <SecondaryMenu />
                </div>

            </main>
        );
};

export default ServiceProviderFind;