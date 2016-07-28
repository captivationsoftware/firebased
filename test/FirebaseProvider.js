import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import firebase from 'firebase';
import { FirebaseProvider } from '../src/index';

describe('<FirebaseProvider />', () => {
  it('should create a firebase instance from config prop', () => {
    const wrapper = mount(<FirebaseProvider config={{}}><span /></FirebaseProvider>);
    expect(wrapper.instance().getChildContext().firebase).to.eql(firebase.app())
  });
});
