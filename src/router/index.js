import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {getUserInfo} from "@/store/actions";
import Layout from "@/views/layout";
import Login from "@/views/login";

const RequireAuth = ({token, role, getUserInfo}) => {
    const [loading, setLoading] = useState(<div>loading</div>);
    useEffect(() => {
        let isMounted = true;
        if (token && !role) {
            getUserInfo(token).then(() => {
                isMounted && setLoading(<Layout/>)
            })
        }
        return () => {
            isMounted = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!token) {
        return <Navigate to="/login"/>;
    } else {
        if (role) {
            return <Layout/>;
        } else {
            return loading
        }
    }
}

const Router = ({token, role, getUserInfo}) => {

    return (<BrowserRouter>
        <Routes>
            <Route exact path="/login" element={<Login/>}/>
            <Route
                path="*"
                element={<RequireAuth token={token} role={role} getUserInfo={getUserInfo}/>}
            />
        </Routes>
    </BrowserRouter>);
}

export default connect((state) => state.user, {getUserInfo})(Router);
