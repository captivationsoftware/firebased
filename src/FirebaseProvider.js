import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';

export default class FirebaseProvider extends Component {
  static childContextTypes = {
    firebase: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  }

  getChildContext() {
    return {
      firebase: firebase.apps.length === 0 ?
        firebase.initializeApp(this.props.config) : firebase.apps[0]
    };
  }

  render() {
    return <div>{ this.props.children }</div>;
  }
}
