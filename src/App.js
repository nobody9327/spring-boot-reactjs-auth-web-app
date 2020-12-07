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

class App extends Component {

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
    if(user){
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
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to={'/'} className='navbar-brand'>
            Nobody
          </Link>

          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/home'} className='nav-link'>
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className='nav-item'>
                <Link to={'/admin'} className='nav-link'>
                  Admin
                </Link>
              </li>
            )}

            {showModeratorBoard && (
              <li className='nav-item'>
                <Link to={'/mod'} className='nav-link'>
                  Moderator
                </Link>
              </li>
            )}

            {showUserBoard && (
              <li className='nav-item'>
                <Link to={'/user'} className='nav-link'>
                  User
                </Link>
              </li>
            )}

            {user ? (
              <div className='navbar-nav pull-right'>
                <li className='nav-item'>
                  <Link to={'/profile'} className='nav-link'>
                    {user.username}
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link to={'/logout'} className='nav-link'>
                    Sign out
                  </Link>
                </li>
              </div>
            ) : (
                <div className='navbar-nav pull-right'>
                  <li className='nav-item'>
                    <Link to={'/signin'} className='nav-link'>
                      Sign In
                  </Link>
                  </li>

                  <li className='nav-item'>
                    <Link to={'/signup'} className='nav-link'>
                      Sign Up
                  </Link>
                  </li>
                </div>
              )}
          </div>
        </nav>

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

export default App;
