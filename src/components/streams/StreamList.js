import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(userId, id) {
    if (userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/streams/delete/${id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map(({ id, title, description, userId }) => (
      <div className="item" key={id}>
        {this.renderAdmin(userId, id)}
        <i className="large middle aligned icon camera" />
        <div className="content">
          <Link className="header" to={`/streams/${id}`}>
            {title}
          </Link>
          <div className="description">{description}</div>
        </div>
      </div>
    ));
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = ({ streams, auth: { userId, isSignedIn } }) => ({
  streams: Object.values(streams),
  currentUserId: userId,
  isSignedIn,
});

export default connect(mapStateToProps, { fetchStreams })(StreamList);
