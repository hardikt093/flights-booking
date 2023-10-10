import { useEffect } from "react";
import { axiosClient } from "../config/api.config";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";


const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    useEffect(() => {
        axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }, [token]);
    
    return (
        <>
            {token &&
                <div>
                    <Header />
                    <Outlet />
                </div>
            }
        </>
    )
};

export default PrivateRoutes;