import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class Place extends React.Component {
    render() {
        return (
            <div className="column is-half" style={{ padding: "20px" }}>
                <div className="card" style={{ borderRadius: "30px" }}>

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
                                <p className="subtitle is-size-6">Location: {this.props.location}</p>
                                <p className="subtitle is-size-6">Date: {this.props.age}</p>
                                <p className="subtitle is-size-6 has-text-centered has-text-weight-bold">Description</p>
                                <hr />
                                <p className="subtitle is-size-6">{this.props.description}</p>
                                {/* footer of the card */}
                                <footer class="card-footer">
                                    {/* delete the prop */}
                                    <a class="card-footer-item has-background-danger has-text-white-ter" onClick={() => { this.props.handleDelete(this.props.id);}}>Delete</a>
                                    {/* load the EditUser */}
                                    <a class="card-footer-item has-background-warning has-text-black-ter">
                                        <Link to={`/edit-place/${this.props.id}`}>
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

export default Place;
