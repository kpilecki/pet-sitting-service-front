import React, {useEffect, useState} from "react";
import SecondaryMenu from "../../components/SecondaryMenu";
import ProfileInfo from "../../components/customer/ProfileInfo";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getCustomer, updateCustomer} from "../../api/customerApi";
import Input from "../../components/Input";
import ButtonWithProgress from "../../components/ButtonWithProgress";
import UpdateInput from "../../components/UpdateInput";
import ProfileInfoUpdate from "../../components/customer/ProfileInfoUpdate";
import AddressView from "../../components/customer/AddressView";
import ProfileImageUpdate from "../../components/ProfileImageUpdate";

const Profile = () => {

  return (
      <main className="d-flex flex-wrap m-auto gap-2 justify-content-center w-75">

          <div className="col-sm-2">
              <ProfileInfo />
          </div>
          <div className="col-lg d-flex flex-column gap-2">
              <ProfileInfoUpdate />
              <AddressView />
              <ProfileImageUpdate />
          </div>
          <div className="col-sm-2">
              <SecondaryMenu />
          </div>



      </main>

  );
};

export default Profile;