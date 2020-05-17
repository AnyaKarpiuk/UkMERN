import CreatePlace from './CreatePlace';
import EditPlace from './EditPlace';
import FoodList from './FoodList';
import CreateFood from './CreateFood';
import EditFood from './EditFood';
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Secret from './Secret';
import Login from './Login';
import Register from './Register';
import UserList from './UserList';
import PlaceList from './PlaceList';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        this.state = { loggedIn: false };
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
    }

    logout(props) {
        axios.get('api/logout')
            .then(res => {
                this.setState({ loggedIn: false });
                props.history.push('/');
            })
            .catch(err => console.log(err));
        return null;
    }

    login() {
        this.setState({ loggedIn: true });
    }

    render() {
        return (
            <div>
                {/* Side Menu */}
                <aside id="menu" class="menu">
                    <h1 id="title"> Menu </h1>
                    <hr />
                    <ul id="menu-list" class="menu-list is-size-5 has-text-centered ">
                        {/* Menu's options */}
                        <Link to={'/'} className="navbar-item">
                            <li><a>Travel</a></li>
                        </Link>
                        <Link to={'/food-list'} className="navbar-item">
                            <li><a>Eat</a></li>
                        </Link>
                        <figure id="menuImage" class="image is-96x96">
                            <img src="https://cdn.pixabay.com/photo/2017/01/04/19/28/circle-1952919_1280.png"></img>
                        </figure>
                        <div id="bottomMenu" class="is-size-6">
                            <Link to={'/secret'} className="navbar-item">
                                <li><a>Secret</a></li>
                            </Link>
                            {this.state.loggedIn && <Link to="/userlist" className="navbar-item"><li><a>UserList</a></li></Link>}
                            {!this.state.loggedIn && <Link to="/login" className="navbar-item"><li><a>Login</a></li></Link>}
                            {!this.state.loggedIn && <Link to="/register" className="navbar-item"><li><a>Register</a></li></Link>}
                            {this.state.loggedIn && <Link to="/logout" className="navbar-item"><li><a>Logout</a></li></Link>}

                        </div>

                    </ul>
                </aside>

                <Switch>
                    <Route path="/" exact component={PlaceList} />
                    <Route path="/userlist" exact component={UserList} />
                    <Route path="/secret" component={withAuth(Secret)} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" render={(props) => <Login {...props} handleLogin={this.login} />} />
                    <Route path="/logout" render={this.logout} />
                    <Route path="/edit-place/:id" component={EditPlace} />
                    <Route path="/create-place" component={CreatePlace} />
                    <Route path="/food-list" component={FoodList} />
                    <Route path='/create-food' component={CreateFood} />
                    <Route path='/edit-food/:id' component={EditFood} />
                </Switch>
            </div>
        );
    }
}

export default App;
