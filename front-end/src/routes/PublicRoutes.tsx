import Header from "../components/header/Header";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PublicRoutes;
