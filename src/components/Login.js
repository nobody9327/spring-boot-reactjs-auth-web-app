const React, { Component } = require("react");



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
    }

    onChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    onChangePassword(event) {
        this.setState({password: event.target.value});
    }

    onLogin() {

    }

    render() {

    }
}