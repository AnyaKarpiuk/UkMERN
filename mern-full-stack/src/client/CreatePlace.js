import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

class CreatePlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location: '',
            picture: '',
            description: '',
            age: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('/api/places', this.state)
            .then(res => this.props.history.push('/'))
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // display create place input form
        return (
            <div class="container" className="is-fluid">

                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        {/* form */}
                        <div className="columns">
                            <div className="column is-half">
                                <h2 className="title is-1 has-text-warning has-text-centered">Add Place</h2>
                                <hr />
                                <div className="field">
                                    <label className="label"> Name of an attraction: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="name" value={this.state.name} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Location: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="location" value={this.state.location} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Picture: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="picture" value={this.state.picture} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Age: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="age" value={this.state.age} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Description: </label>
                                    <div className="control">
                                        <textarea className="textarea is-small" rows="10" type="text" name="description" value={this.state.description} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                {/*submit button*/}
                                <input className="button is-warning" type="submit" value="Submit" />
                            </div>
                            {/* image */}
                            <div className="column">
                                <figure className="image is-4by5">
                                    <img src="https://cdn.pixabay.com/photo/2020/04/26/08/44/nature-5094252_960_720.jpg" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

CreatePlace.propTypes = {
    name: PropTypes.string,
    location: PropTypes.string
};

export default CreatePlace;