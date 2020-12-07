import React, { Component } from 'react';
import UserService from '../services/UserService';

export class ModBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        UserService.getModContent(
            response => {
                this.setState({ content: response.data });
            },
            error => {
                this.setState({ content: (error.data && error.data.message) || error.message || error.toString() });
            }
        )
    }

    render() {
        return (
            <div className='container'>
                <div className='jumbotron'>
                    <h3>{this.state.content}</h3>
                </div>
            </div>
        );
    }
}

export default ModBoard;
