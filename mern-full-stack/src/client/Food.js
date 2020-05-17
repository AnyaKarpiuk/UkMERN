import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class Food extends React.Component {
    render() {
        // iterate through the array of food objects
        var ingredientsList = this.props.ingredients.map(function (ingredient) {
            return <li>{ingredient}</li>;
        });

        return (
            // single Food card
            <div className="column is-one-third" style={{ padding: "20px" }}>
                <div className="card" style={{ borderRadius: "30px" }}>
                    {/* Image */}
                    <div className="card-image">
                        <figure className="image is-16by9">
                            <img alt="Profile" src={this.props.picture} />
                        </figure>
                    </div>

                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p id="name" className="title is-4 has-text-warning">{this.props.name}</p>
                                <hr />
                                <p className="subtitle is-size-6 has-text-centered has-text-weight-bold">Ingredients</p>
                                <hr />
                                <p className="subtitle is-size-6">{ingredientsList}</p>
                                {/* footer of the card */}
                                <footer class="card-footer">
                                    {/* delete the prop */}
                                    <a class="card-footer-item has-background-danger has-text-white-ter" onClick={() => { this.props.handleDelete(this.props.id); }}>Delete</a>
                                    {/* load the EditFood */}
                                    <a class="card-footer-item has-background-warning has-text-black-ter">
                                        <Link to={`/edit-food/${this.props.id}`}>
                                            Edit
                                        </Link></a>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Food;