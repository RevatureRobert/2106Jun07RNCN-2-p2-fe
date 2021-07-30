import React from 'react';
import { mount } from 'enzyme';
import { TouchableOpacity } from 'react-native';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import LoadingComponent from '../../../src/components/semantic/LoadingComponent';

import SignupComponent from '../../../src/components/user/SignupComponent';

let wrapper;

const component = (isLoading = false) => {
  return () => {
    return <SignupComponent loading={isLoading} />;
  };
};

describe('is loading', () => {
  beforeEach(() => {
    wrapper = mount(nestedHell(testState, component(true)));
  });

  it('renders LoadingComponent', () => {
    expect(wrapper.find(LoadingComponent).length).toBeGreaterThan(0);
  });

  it('does not display text boxes to register username and password', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onChangeText') !== undefined)
        .findWhere(
          (node) =>
            node.prop('placeholder').toLowerCase().includes('username') ||
            node.prop('placeholder').toLowerCase().includes('password')
        ).length
    ).toBe(0);
  });

  it('does not display text box to register email that listens for changeText', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onChangeText') !== undefined)
        .findWhere((node) =>
          node.prop('placeholder').toLowerCase().includes('email')
        ).length
    ).toBe(0);
  });

  it('does not display text that links to login page that listens for press', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onPress') !== undefined)
        .findWhere(
          (node) =>
            node.text().toLowerCase().includes('log in') ||
            node.text().toLowerCase().includes('login')
        ).length
    ).toBe(0);
  });

  it('does not display sign up button that listens for press', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onPress') !== undefined)
        .findWhere(
          (node) =>
            node.text().toLowerCase().includes('sign up') ||
            node.text().toLowerCase().includes('signup')
        ).length
    ).toBe(0);
  });
});

describe('finished loading', () => {
  beforeEach(() => {
    wrapper = mount(nestedHell(testState, component(false), 'login'));
  });

  it('does not display LoadingComponent', () => {
    expect(wrapper.find(LoadingComponent).length).toBe(0);
  });

  it('renders text boxes to register username and password', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onChangeText') !== undefined)
        .findWhere(
          (node) =>
            node.prop('placeholder').toLowerCase().includes('username') ||
            node.prop('placeholder').toLowerCase().includes('password')
        ).length
    ).toBeGreaterThan(1);
  });

  it('renders text box to register email that listens for changeText', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onChangeText') !== undefined)
        .findWhere((node) =>
          node.prop('placeholder').toLowerCase().includes('email')
        ).length
    ).toBeGreaterThan(0);
  });

  it('renders text that links to login page that listens for press', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onPress') !== undefined)
        .findWhere(
          (node) =>
            node.text().toLowerCase().includes('log in') ||
            node.text().toLowerCase().includes('login')
        ).length
    ).toBeGreaterThan(0);
  });

  it('renders sign up button that listens for press', () => {
    expect(
      wrapper
        .findWhere((node) => node.prop('onPress') !== undefined)
        .findWhere(
          (node) =>
            node.text().toLowerCase().includes('sign up') ||
            node.text().toLowerCase().includes('signup')
        ).length
    ).toBeGreaterThan(0);
  });

  it('first pressable component has functional press event handler', async () => {
    let wrap = wrapper.find(TouchableOpacity).first();
    const event = 'onPress';
    const mockPreventDefault = jest.fn();
    const mockGestureResponderEvent = {
      preventDefault: mockPreventDefault
    };
    await wrap.props()[event](mockGestureResponderEvent);
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  it('second pressable component has functional press event handler', async () => {
    let wrap = wrapper.find(TouchableOpacity).last();
    const event = 'onPress';
    const mockEventHandler = jest.spyOn(wrap.props(), event);
    await wrap.props()[event]();
    expect(mockEventHandler).toHaveBeenCalled();
  });
});
