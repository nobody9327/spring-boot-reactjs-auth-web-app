import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Component } from 'react';
import AuthService from './services/AuthService';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import UserBoard from './components/UserBoard';
import AdminBoard from './components/AdminBoard';
import ModBoard from './components/ModBoard';
import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';

class Nobody extends Component {

  constructor(props) {
    super(props)
    document.title = "nobody reactJs first app";
    this.state = {
      currentUser: undefined,
      showUserBoard: false,
      showModeratorBoard: false,
      showAdminBoard: false
    }
  }

  componentDidMount() {
    const user = AuthService.getUser();
    if (user) {
      this.setState({
        currentUser: user, showUserBoard: user.roles.includes('USER_ROLE'),
        showModeratorBoard: user.roles.includes('MODERATOR_BOARD'), showAdminBoard: user.roles.includes('ADMIN_ROLE')
      });
    }
  }

  logOut() {
    AuthService.logOut();
  }

  render() {
    const { showAdminBoard, showModeratorBoard, showUserBoard, user } = this.state;



    return (
      <div>
        <Navbar color='dark' dark expand='md'>
          <NavbarBrand >
            <Link to='/' color='white'>Nobody</Link>
          </NavbarBrand>
          <Nav className='mr-auto'>
            <NavItem>
              <Link to={'/home'}>Home</Link>
            </NavItem>

            {showAdminBoard && (
              <NavItem>
                <Link to={'/admin'}>Admin</Link>
              </NavItem>
            )}

            {showModeratorBoard && (
              <NavItem>
                <Link to={'/mod'}>Moderator</Link>
              </NavItem>
            )}

            {showUserBoard && (
              <NavItem>
                <Link to={'/user'}>User</Link>
              </NavItem>
            )}
          </Nav>

          {user ? (
            <Nav className='ml-auto'>
              <NavItem>
                <Link to={'/profile'}>{user.username}</Link>
              </NavItem>
              <NavItem>
                <Link to={'/signout'}>Sign out</Link>
              </NavItem>
            </Nav>
          ) : (
              <Nav className='ml-auto'>
                <NavItem>
                  <Link to={'/signin'}>Sign in</Link>
                </NavItem>
                <NavItem>
                  <Link to={'/signup'}>Sign up</Link>
                </NavItem>
              </Nav>
            )}
        </Navbar>

        <div className='container mt-3'>
          <Switch>
            <Route exact path={['/', '/home']}>
              <Home />
            </Route>
            <Route exact path={'/signin'}>
              <Login />
            </Route>
            <Route exact path={'/signup'}>
              <SignUp />
            </Route>
            <Route path={'/profile'}>
              <Profile />
            </Route>
            <Route path={'/user'}>
              <UserBoard />
            </Route>
            <Route path={'/admin'}>
              <AdminBoard />
            </Route>
            <Route path={'/mod'}>
              <ModBoard />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Nobody;
