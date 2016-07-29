import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import { each, reject } from 'lodash';
import { firebased } from '../src/index';

class Dummy extends Component { render () { return <span />; }    }

describe('firebased', () => {
  let stub, firebase, firebaseRef, subscribers, trigger;

  beforeEach(() => {
    subscribers = [];
    firebaseRef = {
      on: (str, cb) => { subscribers = subscribers.concat(cb); },
      off: (str, cb) => { subscribers = reject(subscribers, subscriber => subscriber === cb) }
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

    it('should pass firebase as prop', () => {
      const FirebasedComponent = firebased({ items: 'items' })(Dummy);

      const wrapper = shallow(<FirebasedComponent />, { context: { firebase }});
      expect(wrapper.props().firebase).to.eql(firebase);
    });

    it('should pass named firebase ref as prop', () => {
      const FirebasedComponent = firebased({ items: 'items' })(Dummy);

      const wrapper = shallow(<FirebasedComponent />, { context: { firebase }});
      expect(wrapper.props().itemsRef).to.eql(firebaseRef);
    });

    it('should pass payload from firebase `value` callback as prop', () => {
      const FirebasedComponent = firebased({ items: 'items' })(Dummy);

      expect(subscribers).to.eql([]);
      const wrapper = shallow(<FirebasedComponent />, { context: { firebase }});
      expect(subscribers.length).to.equal(1);

      expect(wrapper.props().items).to.be.undefined;
      subscribers[0]({ val: () => [1,2,3] }); // trigger the callback
      wrapper.update();
      expect(wrapper.props().items).to.eql([1,2,3]);
    });

    it('should clean up subscribers when props change', () => {
      const FirebasedComponent = firebased((props) => ({ items: `user/${props.userId}` }))(Dummy);

      expect(subscribers).to.eql([]);
      const wrapper = shallow(<FirebasedComponent />, { context: { firebase }});
      expect(subscribers.length).to.equal(1);
      const oldSubscriber = subscribers[0];

      wrapper.setProps({ userId: 123 });
      expect(subscribers.length).to.equal(1);
      expect(subscribers[0]).not.to.eql(oldSubscriber);
    });
  });
});
