import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import AuthService from './services/AuthService';
import NavBarComponent from './components/NavBarComponent';

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
    return (
      <div>
        <NavBarComponent />
      </div>
    );
  }
}

export default App;
