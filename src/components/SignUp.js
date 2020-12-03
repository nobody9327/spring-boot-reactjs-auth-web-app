import React, { Component } from 'react';
import { isEmail } from 'validator';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/AuthService';


const required = value => {
    if (!value) {
        return (
            <div className='alert alert-danger' role='alert' >
                This field is required!
            </div>
        );
    }
}

const vEmail = email => {
    if (!isEmail(email)) {
        return (
            <div className='alert alert-danger' role='alert' >
                This is not a valid email!
            </div>
        );
    }
}

const vUsername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className='alert alert-danger' role='alert'>
                Username must be between 3 to 20 characters
            </div>
        );
    }
}

const vPassword = value => {
    if (value.length < 8 || value.length > 50) {
        return (
            <div className='alert alert-danger' role='alert'>
                Password must be atleast 8 characters and maximum is 50 characters
            </div>
        );
    }
}


export class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message: '',
            email: '',
            successful: false,
            loading: false,
            isInvalid: true
        };

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }


    onSignup(e) {
        e.preventDefault();
        
        this.form.validateAll();
        this.setState({isInvalid: (this.checkBtn.context._errors.length > 0)});
        if (!this.state.isInvalid) {
            this.setState({ successful: false, message: '', loading: true });
            AuthService.signup(this.state.username, this.state.email, this.state.password).then(
                response => this.setState({ message: response.data.message, successful: true, loading: false })
                , error => {
                    const resMessage = (error.response && error.response.data && error.data.message)
                        || error.message || error.toString();

                    this.setState({ loading: false, message: resMessage, successful: false });
                }
            )
        }
    }

    render() {
        return (
            <div className='col-md-12'>
                <div className='card card-container'>
                    <img alt='profile-img' src='//ssl.gstatic.com/accounts/ui/avatar_2x.png' className='profile-img-card' />
                    <Form onSubmit={this.onSignup} ref={e => { this.form = e }}>
                        {!this.state.successful && (
                            <div>
                                <div className='form-group'>
                                    <label htmlFor='username'>Username</label>
                                    <Input name='username' value={this.state.username} type='text' className='form-control'
                                        onChange={this.onChangeUsername} validations={[required, vUsername]} />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <Input name='email' type='text' value={this.state.email} className='form-control'
                                        onChange={this.onChangeEmail} validations={[required, vEmail]} />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <Input name='password' type='text' value={this.state.password} className='form-control'
                                        onChange={this.onChangePassword} validations={[required, vPassword]} />
                                </div>

                                <div className='form-group'>
                                    <button className='btn btn-primary btn-block'
                                        disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className='spinner-border spinner-border-sm'></span>
                                        )}
                                        {!this.state.loading && (
                                            <span>Sign Up</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className={this.state.successful ? 'alert alert-success' : 'alert alert-danger'} role='alert'>
                                {this.state.message}
                            </div>
                        )}

                        <CheckButton style={{ display: 'none' }} ref={e => this.checkBtn = e} />
                    </Form>
                </div>
            </div>
        )
    }
}

export default SignUp;
