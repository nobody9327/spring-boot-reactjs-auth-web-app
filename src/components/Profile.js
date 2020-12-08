import React, { Component } from 'react';
import AuthService from '../services/AuthService';

export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: AuthService.getUser()
        }
    }


    render() {
        const { currentUser } = this.state;

        return (
            <div>
                <div className='container'>
                    <header className='jumbotron'>
                        <h3><strong>{currentUser.username}</strong> Profile</h3>
                    </header>
                    <p>
                        <strong>ID: </strong> {currentUser.id}
                    </p>
                    <p>
                        <strong>Token: </strong> {currentUser.access_token.substring(0, 20)}...{' '}{currentUser.access_token.substring(currentUser.access_token.length - 20)}
                    </p>
                    <p>
                        <strong>Email: </strong> {currentUser.email}
                    </p>
                    <ul>
                        {currentUser.roles && currentUser.roles.map((role, index) => {
                            return <li key={index}>{role}</li>;
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Profile;
