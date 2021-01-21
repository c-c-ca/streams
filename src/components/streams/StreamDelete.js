import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    return (
      <Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
        >
          Delete
        </button>
        <Link to="/" className="ui button ">
          Cancel
        </Link>
      </Fragment>
    );
  }

  renderContent() {
    const { stream } = this.props;
    if (!stream) {
      return 'Are you sure you want to delete this stream?';
    }

    return `Are you sure you want to delete the stream with title: ${stream.title}`;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = ({ streams }, { match }) => ({
  stream: streams[match.params.id],
});

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
