import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { routeNames } from '../../routes/routeNames';

function NewBottomMenu() {
  return (
    <Navbar bg="light" expand fixed='bottom' >
      <Container className="justify-content-center">
          <Nav>
            <NavLink to={`${routeNames.dashboard}${routeNames.home}`} className='mx-3' >Home</NavLink>
            <NavLink to={`${routeNames.dashboard}${routeNames.automation}`} className='mx-3'>Automation</NavLink>
            <NavLink to={`${routeNames.dashboard}${routeNames.settings}`} className='mx-3'>Settings</NavLink>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NewBottomMenu;