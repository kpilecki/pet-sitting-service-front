import React from "react";
import { useStore } from "react-redux";


const Home = () => {
    const store = useStore();

    return (
        <>
            <h1>Home Page</h1>
            <div>{ store.getState().token }</div>
            <div>{ store.getState().username }</div>
            <div>{ store.getState().id }</div>
            <div>{ store.getState().roles }</div>
        </>
    );
};

export default Home;