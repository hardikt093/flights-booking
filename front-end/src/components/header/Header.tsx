import { Link, useLocation, useNavigate } from "react-router-dom";
import AllImages from "../../constant/images";
import { Button, Container, Stack } from "@mui/material";
import "./Header.scss";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location?.pathname === "/";
  const isHidden = location.pathname.includes("login");
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <>
      <header className={isDashboard ? "header-container" : ""}>
        <Container maxWidth="lg">
          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            sx={{ padding: "28px 0" }}
            alignItems={"center"}
          >
            <div className="logo-container">
              <a className="logo" onClick={handleBackHome}>
                <img src={isDashboard ? AllImages.whiteLogo : AllImages.logo} />
              </a>
              {isDashboard && (
                <Link to="/flight">
                  <Button className="btn" variant="text">
                    Orders
                  </Button>
                </Link>
              )}
            </div>

            <div>
              {isLoggedIn ? (
                <>
                  <Button
                    onClick={handleLogout}
                    className={`login-btn ${isDashboard && "font-white"}`}
                    variant="outlined"
                    startIcon={
                      <img
                        src={
                          isDashboard ? AllImages.whitePerson : AllImages.person
                        }
                      />
                    }
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  {(isDashboard || isHidden) && (
                    <Link to="/register">
                      <Button
                        variant="text"
                        className={`register-btn ${
                          isDashboard && "font-white"
                        }`}
                      >
                        Register
                      </Button>
                    </Link>
                  )}
                  {(isDashboard || !isHidden) && (
                    <Link to="/login">
                      <Button
                        className={`login-btn ${isDashboard && "font-white"}`}
                        variant="outlined"
                        startIcon={
                          <img
                            src={
                              isDashboard
                                ? AllImages.whitePerson
                                : AllImages.person
                            }
                          />
                        }
                      >
                        Login
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </Stack>
        </Container>
      </header>
    </>
  );
};

export default Header;
