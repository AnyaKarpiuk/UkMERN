import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Place from './Place';
import EditPlace from './EditPlace';
import axios from 'axios';  
import './app.css';
import 'bulma/css/bulma.css';

class PlaceList extends Component {
    constructor(props) {
        super(props);

        this.state = { places: [] };

        this.updatePlaces = this.updatePlaces.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.updatePlaces();
    }

    updatePlaces() {
        
        axios.get('api/places')
            .then(response => {
                //store the response in the state
                this.setState({ places: response.data });
            })

            .catch(error => {
                console.log(error);
            });
    }

    handleDelete(placeId) {
       
        axios
            .delete('api/places', {
                data: {
                    id: placeId
                }
            })
            .then(response => {
                
                this.updatePlaces();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const placesList = this.state.places.map(p => (
            
            <Place
                key={p._id}
                id={p._id}
                name={p.name}
                location={p.location}
                picture={p.picture}
                description={p.description}
                age={p.age}

                handleDelete={this.handleDelete}
            />
        ));

        //display the list of users
        return (

            <div class="container">

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

                {/* display main page */}
                <figure id="main" class="image is-3by2">
                    <img src="https://cdn.pixabay.com/photo/2016/03/26/22/49/ukraine-1281686_1280.jpg"></img>
                    <div class="hero-body is-overlay">
                        <div class="container has-text-centered">
                            <h1 class="pictureTitle">Ukraine</h1>
                            <h2 class="pictureSubtitle"> Scroll down </h2>
                        </div>
                    </div>
                </figure>

                {/* display the list of places */}
                <div>
                    <h1 id="title2" class="title has-text-centered is-size-1">Travel</h1>   
                    <div className="columns is-multiline">
                        {placesList}
                    </div>
                    <div>
                        {EditPlace}
                    </div>
                </div>

                <Link to={'/create-place'} className="navbar-item navbar-end">
                    <button className="button is-warning" type="button">Create new place</button>
                </Link>

            </div>



        );
    }
}

export default PlaceList;
