import React from "react";

const OrderCreate = ( { serviceId, provider } ) => {
    return (
        <h1>{serviceId}</h1>
    )

};
OrderCreate.defaultProps = {
    serviceId: "",
    provider: {},

};

export default OrderCreate;