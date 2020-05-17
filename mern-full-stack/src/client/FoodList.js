import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Food from './Food';
import axios from 'axios';
import './app.css';
import 'bulma/css/bulma.css';

class FoodList extends Component {
    constructor(props) {
        super(props);

        this.state = { food: [] };

        this.updateFood = this.updateFood.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.updateFood();
    }

    updateFood() {

        axios.get('api/food')
            .then(response => {
                this.setState({ food: response.data });
            })

            .catch(error => {
                console.log(error);
            });
    }

    handleDelete(foodId) {

        axios
            .delete('api/food', {
                data: {
                    id: foodId
                }
            })
            .then(response => {

                this.updateFood();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const foodList = this.state.food.map(f => (

            <Food
                key={f._id}
                id={f._id}
                name={f.name}
                picture={f.picture}
                ingredients={f.ingredients}

                handleDelete={this.handleDelete}
            />
        ));

        //display the list of food
        return (

            <div class="container">

                {/* display main page */}
                <figure id="main" class="image is-3by2">
                    <img src="https://kuhnya6metrov.files.wordpress.com/2019/04/20190424163528_img_3274-01.jpeg?w=730"></img>
                    <div class="hero-body is-overlay">
                        <div class="container has-text-centered">
                            <h1 class="pictureTitle">Ukraine</h1>
                            <h2 class="pictureSubtitle"> Scroll down </h2>
                        </div>
                    </div>
                </figure>

                {/* display the list of food */}
                <div>
                    <h1 id="title2" class="title has-text-centered is-size-1">Eat</h1>
                    <div className="columns is-multiline">
                        {foodList}
                    </div>
                </div>

                {/* Create Food */}
                <Link to={'/create-food'} className="navbar-item navbar-end">
                    <button className="button is-warning" type="button">Add Food</button>
                </Link>
            </div>
        );
    }
}


export default FoodList;