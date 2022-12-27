import React, { useEffect } from "react";
import ProfileInfo from "../../components/customer/ProfileInfo";
import Pets from "../../components/customer/Pets";
import Favourites from "../../components/customer/Favourites";
import SecondaryMenu from "../../components/SecondaryMenu";
import Messages from "../../components/customer/Messages";

const UserPage = () => {


    return (
         <main className="d-flex flex-wrap m-auto gap-2 justify-content-center w-75">

             <div className="col-sm-2">
                 <ProfileInfo />
             </div>
             <div className="col-lg d-flex flex-column gap-2">
                 <Pets />
                 <Favourites />
                 <Messages />
             </div>
             <div className="col-sm-2">
                 <SecondaryMenu />
             </div>



         </main>
    );
};

export default UserPage;