import React, { Component, PropTypes } from 'react';
import { isFunction, mapValues, mapKeys, invertBy } from 'lodash';

export default paths => FirebasedComponent => class extends Component {
  static contextTypes = {
    firebase: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount() {
    this.injectProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (isFunction(paths)) this.injectProps(nextProps);
  }

  injectProps(props) {

    const refs = mapValues(
      isFunction(paths) ? paths(props) : paths,
      path => this.context.firebase.database().ref(path)
    );

    this.setState(mapKeys(refs, (path, prop) => `${prop}Ref`));



    // const refs = mapValues(this.paths(props),
    //   path => this.context.firebase.database().ref(path));

    // this.setState(mapKeys(paths, path => `${path}Ref`).mapValues);


  //   const refs = _.mapObject(this.interpolatedPaths(props), (path)=> {
  //     return firebase.database().ref(path);
  //   });
   //
  //   const subscribers = _.map(refs, (path, prop)=> {
  //     const ref = firebase.database().ref(prop);
  //     return ref.on('value', (snapshot) => {
  //       const state = {};
  //       state[prop] = snapshot.val();
  //       this.setState(state);
  //     });
  //   });
   //
   //
  //   const state = { subscribers }
  //   _.forEach(refs, (ref, prop) => {
  //     state[`${ref}Ref`] = ref
  //   });
   //
  //    refs: _.mapKeys(refs, (ref) => _.capitalize([].join('-')) )
  //  });
  //   this.setState({ subscribers });
  }

  render() {
    return <FirebasedComponent {...this.props} {...this.state} firebase={this.context.firebase} />;
  }
}
