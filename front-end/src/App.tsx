import Header from "./components/header/Header";
import Register from "./components/register/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import Login from "./components/login/Login";
import Flight from "./components/flight/Flight";
import Booking from "./components/booking/Booking";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoutes />}>
            <Route index element={<Booking />} />
          </Route>
          <Route path="/register" element={<PublicRoutes />}>
            <Route index element={<Register />} />
          </Route>
          <Route path="/login" element={<PublicRoutes />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/booking" element={<PublicRoutes />}>
            <Route index element={<Booking />} />
          </Route>
          <Route path="/flight" element={<PrivateRoutes />}>
            <Route index element={<Flight />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
