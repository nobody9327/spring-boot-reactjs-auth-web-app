import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import AuthService from '../services/AuthService';
import AdminBoard from './AdminBoard';
import Home from './Home';
import Login from './Login';
import ModBoard from './ModBoard';
import Profile from './Profile';
import SignUp from './SignUp';
import UserBoard from './UserBoard';

export class NavBarComponent extends Component {
    constructor(props) {
        super(props);
        document.title = 'Nobody\'s first react app';

        this.state = {
            isOpen: false,
            showAdmin: false,
            showMod: false,
            currentUser: undefined
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const user = AuthService.getUser();
        if (user) {
            this.setState({
                currentUser: user,
                showAdmin: user.roles.includes('ROLE_ADMIN'),
                showMod: user.roles.includes('ROLE_MOD')
            });
        }
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    signOut(){
        AuthService.logOut();
    }

    render() {
        const { currentUser, showMod, showAdmin } = this.state;

        return (
            <div>
                <Navbar color='dark' dark expand='md'>
                    <NavbarBrand href='/'>
                        Nobody
                </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='mr-auto' navbar>
                            <NavItem>
                                <NavLink href='/home'>
                                    Home
                            </NavLink>
                            </NavItem>

                            {showAdmin && (
                                <NavItem>
                                    <NavLink href='/admin'>Admin</NavLink>
                                </NavItem>
                            )}

                            {showMod && (
                                <NavItem>
                                    <NavLink href='/mod'>Moderator</NavLink>
                                </NavItem>
                            )}

                            {currentUser && (
                                <NavItem>
                                    <NavLink href='/user'>User</NavLink>
                                </NavItem>
                            )}
                        </Nav>
                        {currentUser ? (
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <NavLink href='/profile'>{currentUser.username}</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href='/signin' onClick={this.signOut}>Sign Out</NavLink>
                                </NavItem>
                            </Nav>
                        ) : (
                                <Nav className='ml-auto' navbar>
                                    <NavItem>
                                        <NavLink href='/signin'>Sign In</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href='/signup'>Sign Up</NavLink>
                                    </NavItem>
                                </Nav>
                            )}
                    </Collapse>
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
        )
    }
}

export default withRouter(NavBarComponent);
