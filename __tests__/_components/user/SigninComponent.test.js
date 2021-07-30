import React from 'react';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import SigninComponent from '../../../src/components/user/SigninComponent';

let wrapper;

const component = () => {
  return <SigninComponent />;
};

/*
TO-DO: does not render LoadingComponent if state.loading is true
TO-DO: renders LoadingComponent if state.loading is true
To-DO: does not render {any node tested below} if state.loading is false
*/

describe('Testing SigninComponent', () => {
  beforeEach(() => {
    wrapper = mount(nestedHell(testState, component));
  });

  it('displays text box to input username that listens for changeText', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onChangeText') !== undefined)
        .findWhere((node) =>
          node.prop('placeholder').toLowerCase().includes('username')
        ).length
    ).toBeGreaterThan(0);
  });

  it('displays text box to input password that listens for changeText', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onChangeText') !== undefined)
        .findWhere((node) =>
          node.prop('placeholder').toLowerCase().includes('password')
        ).length
    ).toBeGreaterThan(0);
  });

  it('displays text that links to signup page that listens for press', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onPress') !== undefined)
        .findWhere((node) => node.text().toLowerCase().includes('sign up'))
        .length
    ).toBeGreaterThan(0);
  });

  it('displays log in button that listens for press', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onPress') !== undefined)
        .findWhere((node) => node.text().toLowerCase().includes('log in'))
        .length
    ).toBeGreaterThan(0);
  });
});
