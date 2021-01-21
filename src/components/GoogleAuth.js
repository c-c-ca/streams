import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const GOOGLE_CLIENT_ID =
  '84297741617-1esk5i4294iue8t2d8a9oohabj1nskf3.apps.googleusercontent.com';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.auth2
        .init({
          clientId: GOOGLE_CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        })
        .catch(console.log);
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const { isSignedIn } = this.props;

    if (isSignedIn === null) {
      return null;
    }

    let text, onClickHandler;
    if (isSignedIn) {
      text = 'Sign Out';
      onClickHandler = this.onSignOutClick;
    } else {
      text = 'Sign In with Google';
      onClickHandler = this.onSignInClick;
    }

    return (
      <button className="ui red google button" onClick={onClickHandler}>
        <i className="google icon" />
        {text}
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth: { isSignedIn } }) => ({ isSignedIn });

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
