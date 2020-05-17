import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

class EditPlace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            picture: '',
            description: '',
            age: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    propTypes = {
        name: PropTypes.string
    };

    componentDidMount() {

        axios.get('/api/places/' + this.props.match.params.id)
            .then(response => {

                this.setState({
                    _id: response.data._id,
                    name: response.data.name,
                    location: response.data.location,
                    picture: response.data.picture,
                    description: response.data.description,
                    age: response.data.age
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {

        event.preventDefault();

        axios.put('/api/places', this.state)
            .then(res => this.props.history.push('/'))
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="is-fluid">
                {/* display edit place form */}
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        {/*form*/}
                        <div className="columns">
                            <div className="column is-half">
                                <h2 className="title is-1 has-text-warning has-text-centered">Edit Place</h2>
                                <hr />
                                <div className="field">
                                    <label className="label"> Name:</label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="name" value={this.state.name} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Location:</label>
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
                                    <label className="label"> Age</label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="age" value={this.state.age} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Description</label>
                                    <div className="control">
                                        <textarea className="textarea is-small" rows="10" type="text" name="description" value={this.state.description} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                {/*SUBMIT BUTTON*/}
                                <input className="button is-warning" type="submit" value="Submit" />
                            </div>
                            {/* image */}
                            <div className="column">
                                <figure className="image is-4by5">
                                    <img src="https://cdn.pixabay.com/photo/2019/12/12/23/49/ukraine-4691840_960_720.jpg" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}

export default EditPlace;