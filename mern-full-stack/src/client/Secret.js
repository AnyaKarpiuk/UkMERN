import React, { Component } from 'react';
import axios from 'axios';

export default class Secret extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    };
  }

  componentDidMount() {
    axios.get('/api/secret')
      .then(response => this.setState({message: response.data}));
  }

  render() {
    return (
      <div className="container is-fluid">
        <h1 className="title is-1 has-text-weight-bold has-text-primary">Secret</h1>
        <p className="subtitle">{this.state.message}</p>
      </div>
    );
  }
}