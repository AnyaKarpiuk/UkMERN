import React from 'react';

const imageIcon = 'https://cdn.pixabay.com/photo/2018/07/12/14/04/surprise-3533498_1280.png';

// define one single user card component
class User extends React.Component {
  render() {
    return (
      <div className="column is-one-quarter" style={{ padding: "20px" }}>
        <div className="card" style={{ borderRadius: "20px" }}>
          <div className="card-image">
            <figure className="image is-3by2">
              <img alt="Profile" src={imageIcon} />
            </figure>
          </div>
          <hr/>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;