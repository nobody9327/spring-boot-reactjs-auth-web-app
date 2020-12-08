import React, { Component } from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from "../services/AuthService";
import { withRouter } from "react-router-dom";

const required = value => {
    if (!value) {
        return (
            <div className='alert alert-danger' role='alert'>
                This is required!
            </div>
        );
    }
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            message: ''
        }

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onLogin(event) {
        event.preventDefault();

        this.setState({ loading: true, message: '' });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    console.log('User: ' + AuthService.getUser);
                    this.props.history.push('/profile');
                    window.location.reload();
                },
                error => {
                    const resMessage = (error.response
                        && error.response.data
                        && error.reponse.data.message) || error.message || error.toString();
                    this.setState({ loading: false, message: resMessage });
                }
            );
        } else {
            this.setState({loading: false});
        }
    }

    render() {
        return (
            <div className='col-md-12'>
                <div className='card card-container'>
                    <img src='../../android-chrome-512x512.png' className='profile-card' alt='profile' />
                    <Form onSubmit={this.onLogin} ref={e => { this.form = e }}>
                        <div className='form-group'>
                            <label htmlFor='username'>Username</label>
                            <Input type='text' className='form-control' value={this.state.username} onChange={this.onChangeUsername} name='username' validations={[required]} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <Input type='password' className='form-control' value={this.state.password} onChange={this.onChangePassword} name='password' validations={[required]} />
                        </div>

                        <div className='form-group'>
                            <button className='btn btn-primary btn-block' disabled={this.state.loading} >
                                {this.state.loading && (<span className='spinner-border sprinner-border-sm'></span>)}
                                {!this.state.loading && (<span>Login</span>)}
                            </button>
                        </div>

                        {this.state.message && (
                            <div className='form-group'>
                                <div className='alert alert-danger' role='alert'>
                                    {this.state.message}
                                </div>
                            </div>
                        )}

                        <CheckButton style={{ display: 'none' }} ref={e => { this.checkBtn = e }} />
                    </Form>
                </div>


            </div>
        );
    }
}

export default withRouter(Login);