import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';
import MainNavComponent from '../../../src/components/navigation/MainNavComponent';

import RootNavComponent from '../../../src/components/navigation/RootNavComponent';

it('renders MainNavComponent as a child of the necessary components', () => {
    const wrapper = mount(<RootNavComponent/>);
    const wrappedInProvider = (wrapper.find(Provider).find(MainNavComponent).length > 0);
    const wrappedInNavigationContainer = (wrapper.find(NavigationContainer).find(MainNavComponent).length > 0);
    const wrappedInToastProvider= (wrapper.find(ToastProvider).find(MainNavComponent).length > 0);
    const bool = wrappedInProvider && wrappedInNavigationContainer && wrappedInToastProvider;
    expect(bool).toBe(true);
});
