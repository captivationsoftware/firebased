import React, { Component, PropTypes } from 'react';
import { assign, isFunction, mapValues, mapKeys, omit, set } from 'lodash';

export default paths => FirebasedComponent => class extends Component {
  static contextTypes = {
    firebase: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount() {
    this.decorate(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (isFunction(paths)) {
      this.cleanup();
      this.decorate(nextProps);
    }
  }

  definitionsFor(props) {
    return this.context.firebase ?
      mapValues(isFunction(paths) ? paths(props) : paths,
        path => this.context.firebase.database().ref(path)) : {}
  }

  cleanup() {
    mapValues(this.definitionsFor(this.props),
      (ref, prop) => ref.off('value', this.state.subscribers[prop]));
  }

  decorate(props) {
    const definitions = this.definitionsFor(props);

    const refs = mapKeys(definitions, (path, prop) => `${prop}Ref`);

    const subscribers = mapValues(definitions,
      (ref, prop) => snapshot => this.setState(set({}, prop, snapshot.val())));

    mapValues(definitions, (ref, prop) => ref.on('value', subscribers[prop]));

    this.setState(assign({}, refs, { subscribers }));
  }

  render() {
    const decorations = omit(this.state, 'subscribers');
    return <FirebasedComponent {...this.props} {...decorations} firebase={this.context.firebase} />;
  }
}
