/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const RouteGuard = ({ children, ...rest }) => {

    function hasJWT() {
        let flag = false;

        //check user has JWT token
        localStorage.getItem("token") ? flag = true : flag = false

        return flag
    }

    return ( 
        <Route 
            {...rest }
            element = {
                hasJWT()? children : <Navigate to = "/rooms" /> 
            }
        />
    )
};

export default RouteGuard;