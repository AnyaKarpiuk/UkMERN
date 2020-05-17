import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

class CreateFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            picture: "",
            ingredients: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateIngredientsArray = this.updateIngredientsArray.bind(this);
    }

    handleChange(event) {
      
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    // update array of ingredients
    updateIngredientsArray(index, value) {
        const { ingredients } = this.state;
        ingredients.splice(index, 1, e.target.value)
        this.setState({ ingredients: [...ingredients] }, () => {
            console.log(this.state.ingredients)
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('/api/food', this.state)
            .then(res => this.props.history.push('/'))
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        // display create food input form
        return (
            <div class="container" className="is-fluid">

                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        {/* form */}
                        <div className="columns">
                            <div className="column is-half">
                                <h2 className="title is-1 has-text-warning has-text-centered">Add Food</h2>
                                <hr />
                                <div className="field">
                                    <label className="label"> Name of food: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="name" value={this.state.name} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Picture: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="picture" value={this.state.picture} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Ingredients: </label>
                                    <div className="control">
                                       {this.state.ingredients.map((val, i) => <p key={i}> <input className="input is-small" type="text" name="ingredients" onChange={(e) => { this.updateIngredientsArray(i, e) }} value={val} /></p>)}
                                    </div>
                                </div>
                                {/*submit button*/}
                                <input className="button is-warning" type="submit" value="Submit" />
                            </div>
                            {/* image */}
                            <div className="column">
                                <figure className="image is-4by5">
                                    <img src="https://i.pinimg.com/originals/b3/e7/78/b3e77866a0861e8294dddf139ea93f67.jpg" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateFood;