import { shallow } from 'enzyme';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

//Testing if I switched to new branch on remote repository??????

it('works', () => {
    expect(1).toBe(1);
});

it(`renders a view with a custom background`, () => {
    const component = shallow(<View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />);
    // To debug your component use this:
    console.log('Component:', component.debug({ verbose: true }));

    // When snapshot testing, you should always try and be as concise as possible
    // here we are extracting the style prop from `View` on native and `div` on web
    const prop = component.find(Platform.select({ default: 'View', web: 'div' })).prop('style');

    console.log(prop);
    console.log("Typeof prop is: ", typeof prop);

    // Flatten the style so we can read it as an object
    const style = StyleSheet.flatten(prop);

    console.log(style);
    console.log("Typeof style is: ", typeof style)

    /**
     * Android: exports[`renders a view with a custom background 1`] = `"rgba(0,0,0,0.5)"`;
     * iOS: exports[`renders a view with a custom background 1`] = `"rgba(0,0,0,0.5)"`;
     * web: exports[`renders a view with a custom background 1`] = `"rgba(0,0,0,0.50)"`;
     */
    expect(style.backgroundColor).toMatchSnapshot();
});