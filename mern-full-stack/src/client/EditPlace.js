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

    //once the input boxes are changed, update the state to match the value
    handleChange(event) {
        //name of the input boxes must match the property names in the state
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        //preventDefault() is called on the event when it occurs to prevent a browser reload/refresh
        event.preventDefault();

        // use axios to send a PUT request to the server which includes the updated state information
        axios.put('/api/places', this.state)
            //on success go to home
            .then(res => this.props.history.push('/'))
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // remember that the name of the input fields should match the state
        return (
            <div className="is-fluid">

               {/* Side Menu */}
                <aside id="menu" class="menu">
                    <h1 id="title"> Menu </h1>
                    <ul id="menu-list" class="menu-list is-size-4 has-text-centered ">
                        {/* Menu's options */}
                        <Link to={'/'} className="navbar-item">
                            <li><a>Travel</a></li>
                        </Link>
                        <Link to={'/food-list'} className="navbar-item">
                            <li><a>Eat</a></li>
                        </Link>
                        <div id="buttons">
                            <Link to={'/create-place'} className="navbar-item">
                                <button className="button is-warning" type="button">Add Place</button>
                            </Link>
                            <Link to={'/create-food'} className="navbar-item">
                                <button className="button is-warning" type="button">Add Food</button>
                            </Link>
                        </div>
                    </ul>
                </aside>

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
                                        <input className="input is-small" type="text" name="description" value={this.state.description} onChange={this.handleChange} id="form" />
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
