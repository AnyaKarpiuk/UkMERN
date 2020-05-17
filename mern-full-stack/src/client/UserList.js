import React, { Component } from 'react';
import User from './User';
import axios from 'axios';
import 'bulma/css/bulma.css';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        axios.get('api/users')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        
        const userList = this.state.users.map(u => (
            <User
                key={u._id}
                id={u._id}
                email={u.email}
            />
        ));

        //return the list of users
        return (
            <div className="is-fluid">
                <h1 className="title is-1 has-text-warning has-text-centered has-text-weight-bold">List of Users</h1>
                <hr />
                {/*User list*/}
                <div>
                    <div className="columns is-multiline">
                        {userList}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserList;