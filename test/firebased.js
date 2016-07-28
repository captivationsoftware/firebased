import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { firebased } from '../src/index';

class Dummy extends Component { render () { return <span />; }    }

describe('firebased', () => {
  let stub, subscribeSpy, unsubscribeSpy, firebase, firebaseRef;

  beforeEach(() => {
    firebaseRef = {
      on: subscribeSpy,
      off: unsubscribeSpy
    }
    stub = sinon.stub().returns(firebaseRef);
    firebase = {
      database: () => ({ ref: stub })
    }
  });

  describe('paths', () => {

    it('should create firebase refs from object values', () => {
      const FirebasedComponent = firebased({
        items: 'items',
        user: 'user/123'
      })(Dummy);

      shallow(<FirebasedComponent />, { context: { firebase }});
      assert(stub.calledWith('items'));
      assert(stub.calledWith('user/123'));
    });

    it('should create firebase refs from object values returned by function of props', () => {
      const FirebasedComponent = firebased(props => {
        return {
          items: 'items',
          user: `user/${props.userId}`
        };
      })(Dummy);

      shallow(<FirebasedComponent userId={456}/>, { context: { firebase }});
      assert(stub.calledWith('items'));
      assert(stub.calledWith('user/456'));
    });
  });

  describe('generated props', () => {

    it('should include firebase', () => {
      const FirebasedComponent = firebased({ items: 'items' })(Dummy);

      const wrapper = shallow(<FirebasedComponent />, { context: { firebase }});
      expect(wrapper.props().firebase).to.eql(firebase);
    });

    it('should be delegated to wrapped component', () => {
      const FirebasedComponent = firebased({ items: 'items' })(Dummy);

      const wrapper = shallow(<FirebasedComponent />, { context: { firebase }});
      expect(wrapper.props().itemsRef).to.eql(firebaseRef);
    });
  });
});
