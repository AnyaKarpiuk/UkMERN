import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange(event) {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        axios.post('/api/authenticate', this.state)
            .then(res => {
                if (res.status === 200) {
                    // run the login function in the parent component
                    this.props.handleLogin();
                    // redirect to /
                    this.props.history.push('/');
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });
    }

    render() {
        return (
            // display login input form
            <form onSubmit={this.onSubmit} className="container is-fluid">
                {/* First column */}
                <div className="columns">
                    <div className="column is-half">
                    <h1 className="title is-1 has-text-warning has-text-centered has-text-weight-bold">Login</h1>
                    <hr/>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input
                                className="input column is-half"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                                className="input column is-half"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    {/* Submit button */}
                    <input className="button is-primary" type="submit" value="Submit" />
                </div>
                 {/* Second column - image */}
                    <div className="column">
                        <figure className="image is-4by5">
                            <img src="https://cdn.pixabay.com/photo/2018/05/14/16/30/flowers-3400679_960_720.jpg" />
                        </figure>
                    </div>
                </div>
            </form>
        );
    }
}