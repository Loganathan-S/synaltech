import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { routeNames } from "../../constants/routePath";
import "./navbarMenu.scss";

function Bottommenu() {
  return (
    <Navbar bg="light" expand fixed="bottom">
      <Container className="justify-content-center">
        <Nav>
          <NavLink
            to={`${routeNames.dashboard}${routeNames.home}`}
            activeclassname="active"
            className={`mx-3 fs-6`}
          >
            Home
          </NavLink>
          <NavLink
            to={`${routeNames.dashboard}${routeNames.automation}`}
            activeclassname="active"
            className={`mx-3 fs-6`}
          >
            Automation
          </NavLink>
          <NavLink
            to={`${routeNames.dashboard}${routeNames.settings}`}
            activeclassname="active"
            className={`mx-3 fs-6`}
          >
            Settings
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Bottommenu;
