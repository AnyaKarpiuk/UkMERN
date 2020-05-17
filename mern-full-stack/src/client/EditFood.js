import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditFood extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            picture: '',
            ingredients: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateIngredientsArray = this.updateIngredientsArray.bind(this);
    }

    componentDidMount() {

        axios.get('/api/food/' + this.props.match.params.id)
            .then(response => {

                this.setState({
                    _id: response.data._id,
                    name: response.data.name,
                    picture: response.data.picture,
                    ingredients: response.data.ingredients
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

    updateIngredientsArray(index, value) {
        const { ingredients } = this.state;
        ingredients.splice(index, 1, e.target.value)
        this.setState({ ingredients: [...ingredients] }, () => {

            console.log(this.state.ingredients)
        });
    }

    handleSubmit(event) {

        event.preventDefault();

        axios.put('/api/food', this.state)
            //on success go to home
            .then(res => this.props.history.push('/'))
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="is-fluid">
                {/* display edit food form */}
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        {/*form*/}
                        <div className="columns">
                            <div className="column is-half">
                                <h2 className="title is-1 has-text-warning has-text-centered">Edit Food</h2>
                                <hr />
                                <div className="field">
                                    <label className="label"> Name:</label>
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
                                    <label className="label"> Ingredients</label>
                                    <div className="control">
                                        {this.state.ingredients.map((val, i) => <p key={i}> <input className="input is-small" type="text" name="ingredients" onChange={(e) => { this.updateIngredientsArray(i, e) }} value={val} /></p>)}
                                    </div>
                                </div>
                                {/*SUBMIT BUTTON*/}
                                <input className="button is-warning" type="submit" value="Submit" />
                            </div>
                            {/* image */}
                            <div className="column">
                                <figure className="image is-4by5">
                                    <img src="https://i1.wp.com/maminapechka.ru/wp-content/uploads/2018/03/DSC_0141.jpg?fit=530%2C800&ssl=1" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}

export default EditFood;