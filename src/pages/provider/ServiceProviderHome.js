import React from "react";
import ProviderSideMenu from "../../components/provider/ProviderSideMenu";
import Messages from "../../components/customer/Messages";
import ProviderOrders from "../../components/provider/ProviderOrders";

const ServiceProviderHome = () => {

    return (
        <main className="d-flex flex-wrap m-auto gap-2 justify-content-center w-75">

            <div className="col-lg d-flex flex-column gap-2">
                <Messages />
                <ProviderOrders />
            </div>
            <div className="col-sm-2">
                <ProviderSideMenu />
            </div>

        </main>
    );
};

export default ServiceProviderHome;